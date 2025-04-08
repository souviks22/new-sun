import crypto from "crypto"
import Razorpay from "razorpay"
import catchAsync from "../errors/async.js"
import { Payment } from "../models/Payment.js"
import { newContributionHandler } from "./contribution.controller.js"
import { newDonationHandler } from "./donation.controller.js"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

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
  console.log(options)
  const order = await razorpay.orders.create(options);
  res.status(201).json({
    success: true,
    message: 'Payment order initiated',
    data: { order }
  });
});

export const paymentVerificationHandler = catchAsync(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (generatedSignature === razorpay_signature) {
    const payment = await savePaymentDetails(razorpay_order_id, razorpay_payment_id)
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
})

export const razorpayWebhookHandler = catchAsync(async (req, res) => {
  const payload = JSON.stringify(req.body);
  const digest = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(payload).digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('Razorpay Webhook Signature Verified!');
    await handleRazorpayWebhookEvents(req.body, res);
    res.status(200).send('OK');
  } else {
    console.error('Razorpay Webhook Signature Verification Failed!');
    res.status(400).send('Bad Request');
  }
});

async function handleRazorpayWebhookEvents(payload, res) {
  const event = payload.event;
  const data = payload.payload;
  switch (event) {
    case 'payment.captured':
      console.log('Webhook - Payment Captured:', data.payment.entity);
      const { order_id: webhook_order_id, id: webhook_payment_id, amount: paymentAmount } = data.payment.entity;
      const paymentNotes = data.payment.entity.notes || {};
      const paymentType = paymentNotes.type || 'unknown';

      const payment = await savePaymentDetails(webhook_order_id, webhook_payment_id, paymentType, 'completed', paymentAmount, data.payment.entity.currency);

      if (payment && paymentType === 'donation') {
        const { name, email, phone } = paymentNotes;
        const donationDataForHandler = {
          body: {
            name: name,
            email: email ? email.toLowerCase() : '',
            phone: phone,
            amount: paymentAmount / 100,
            paymentId: payment._id,
          },
        };
        await newDonationHandler(donationDataForHandler, res);
        console.log('Donation processed via webhook using newDonationHandler');
      } else if (payment && paymentType === 'contribution') {
        const { endDate, _id } = paymentNotes;
        const contributionDataForHandler = {
          body: {
            amount: paymentAmount / 100,
            endDate: endDate,
            paymentId: payment._id,
            contributor: _id
          },
        };
        await newContributionHandler(contributionDataForHandler, res);
        console.log('Donation processed via webhook using newDonationHandler');
      }
      break;
    case 'payment.failed':
      console.log('Webhook - Payment Failed:', data.payment.entity);
      const { order_id: failed_order_id, id: failed_payment_id } = data.payment.entity;
      await savePaymentDetails(failed_order_id, failed_payment_id, 'failed', 'failed', 0, '');
      break;
    default:
      console.log('Webhook - Unhandled Event:', event);
  }
}


export const savePaymentDetails = async (orderId, paymentId, type, status, amount, currency) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, status, type, amount, currency },
      { new: true, upsert: true }
    );
    return payment;
  } catch (error) {

    return null;
  }
};
