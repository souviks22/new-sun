import crypto from "crypto";
import Razorpay from "razorpay";
import { newContributionHandler } from "../controllers/contribution.controller.js";
import { newDonationHandler } from "../controllers/donation.controller.js";
import catchAsync from "../errors/async.js";
import { Contribution } from "../models/Contribution.js";
import { Donation } from "../models/Donation.js";
import { Member } from "../models/Member.js";
import { Payment } from "../models/Payment.js";
import { contributionReceivedEmail, donationReceivedEmail } from "../utility/emails.js";
import { sendEmailFromServer } from "../utility/mailer.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const paymentOrderHandler = catchAsync(async (req, res) => {
  const { amount, currency = "INR", receipt, type, data } = req.body;
  const notes = {
    receipt: receipt || `order_rcpt_${Date.now()}`,
    type: type,
    ...data,
  };
  const options = {
    amount: amount * 100,
    currency,
    receipt: notes.receipt,
    notes: notes,
  };
  const order = await razorpay.orders.create(options);
  const payment = await Payment.create({
    orderId: order.id,
    amount: amount * 100,
    currency: currency,
    notes: { type, ...data }
  });
  let recordId;
  if (type === "donation") {
    const donationData = {
      ...data,
      amount: amount,
      paymentId: payment._id
    };
    const donationResult = await newDonationHandler(donationData, res);
    recordId = donationResult?.data?._id;
    console.log('Donation initiated via handler on order creation');
  } else if (type === "contribution") {
    const contributionData = {
      ...data,
      amount: amount,
      paymentId: payment._id
    };
    const result = await newContributionHandler(contributionData, res);
    recordId = result?.data?._id;
  }

  if (!res.headersSent) {
    res.status(201).json({
      success: true,
      message: 'Payment order initiated and corresponding record initiated',
      data: { order, paymentId: payment._id, recordId: recordId }
    });
  }
});

export const paymentVerificationHandler = catchAsync(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (generatedSignature === razorpay_signature) {
    const payment = await savePaymentDetails(razorpay_order_id, razorpay_payment_id, undefined, 'completed');
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: { payment }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid signature'
    });
  }
});

export const razorpayWebhookHandler = catchAsync(async (req, res) => {
  const payload = JSON.stringify(req.body);
  const digest = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(payload).digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('Razorpay Webhook Signature Verified!');
    await handleRazorpayWebhookEvents(req.body);
    res.status(200).send('OK');
  } else {
    console.error('Razorpay Webhook Signature Verification Failed!');
    res.status(400).send('Bad Request');
  }
});

async function handleRazorpayWebhookEvents(payload) {
  const event = payload.event;
  const data = payload.payload;
  switch (event) {
    case 'payment.captured':
      const { order_id: webhook_order_id, id: webhook_payment_id, amount: paymentAmount, currency: paymentCurrency } = data.payment.entity;
      try {
        const payment = await savePaymentDetails(webhook_order_id, webhook_payment_id, 'completed');
        if (payment) {
          const paymentNotes = data.payment.entity.notes || {};
          const paymentType = paymentNotes.type;
          if (paymentType === "donation") {
            const donation = await Donation.findOneAndUpdate(
              { paymentId: payment._id },
              { status: 'completed' }
            );
            if (donation) {
              sendEmailFromServer(paymentNotes.email, 'Donation Successful-Team New Sun Foundation', donationReceivedEmail(paymentNotes.name, paymentAmount / 100, payment._id));
              console.log('Donation payment successful, status updated and email sent.');
            }
          } else if (paymentType === "contribution") {
            const contribution = await Contribution.findOneAndUpdate(
              { paymentId: payment._id },
              { status: 'completed' }
            );
            if (contribution) {
              const member = await Member.findById(contribution.contributor);
              if (member) {
                sendEmailFromServer(
                  member.email, 'Contribution Received-Team New Sun Foundation', contributionReceivedEmail(member.fullname, paymentAmount / 100, contribution.startDate, contribution.endDate, contribution.paymentId));
                console.log('Contribution payment successful, status updated and email sent.');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error handling payment.captured webhook:', error);
      }
      break;
    case 'payment.failed':
      console.log('Webhook - Payment Failed:', data.payment.entity);
      const { order_id: failed_order_id, id: failed_payment_id } = data.payment.entity;
      try {
        await savePaymentDetails(failed_order_id, failed_payment_id, 'failed');
        await Contribution.findOneAndUpdate({ paymentId: failed_payment_id }, { status: 'failed' });
        await Donation.findOneAndUpdate({ paymentId: failed_payment_id }, { status: 'failed' });
      } catch (error) {
        console.error('Error handling payment.failed webhook:', error);
      }
      break;
    default:
      console.log('Webhook - Unhandled Event:', event);
  }
}

export const savePaymentDetails = async (orderId, paymentId, status) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, status },
      { new: true, upsert: true }
    );
    return payment;
  } catch (error) {
    return null;
  }
};