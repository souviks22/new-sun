import { Member } from "../models/Member.js"
import { Payment, PaymentStatus } from "../models/Payment.js"
import { saveContribution, getFormattedDate } from "./contribution.controller.js"
import { saveDonation } from "./donation.controller.js"
import { sendEmailFromServer } from "../utility/mailer.js"
import { contributionReceivedEmail, donationReceivedEmail } from "../utility/emails.js"

import crypto from "crypto"
import Razorpay from "razorpay"
import catchAsync from "../errors/async.js"
import { Contribution } from "../models/Contribution.js"
import { Donation } from "../models/Donation.js"

process.env.NODE_ENV !== 'production' && process.loadEnvFile()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const getPaymentSignature = body => crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex')

export const PaymentIntent = { CONTRIBUTION: 'contribution', DONATION: 'donation' }


export const paymentOrderHandler = catchAsync(async (req, res) => {
    const { amount, intent } = req.body
    const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: 'INR',
        receipt: `order_rcpt_${Date.now()}`,
        notes: { intent }
    })
    req.body.intent = intent
    req.body.orderId = order.id
    req.body.status = PaymentStatus.PENDING
    await savePaymentDetails(req)
    res.status(201).json({
        success: true,
        message: 'Payment order initiated.',
        data: { order }
    })
})

export const paymentVerificationHandler = catchAsync(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const body = razorpay_order_id + '|' + razorpay_payment_id
    req.body.orderId = razorpay_order_id
    req.body.paymentId = razorpay_payment_id
    req.body.status = PaymentStatus.COMPLETED
    if (getPaymentSignature(body) !== razorpay_signature) {
        throw new Error('We could not verify your payment.')
    }
    const payment = await savePaymentDetails(req)
    res.status(200).json({
        success: true,
        message: 'Payment verified successfully.',
        data: { payment }
    })
})

export const razorpayWebhookHandler = catchAsync(async (req, res) => {
    const body = JSON.stringify(req.body)
    const { event, payload } = req.body
    const { order_id, id, notes } = payload.payment.entity
    req.body.orderId = order_id
    req.body.paymentId = id
    req.body.intent = notes.intent
    if (getPaymentSignature(body) !== req.headers['x-razorpay-signature']) {
        throw new Error('We could not verify your payment.')
    }
    switch (event) {
        case 'payment.captured':
            req.body.status = PaymentStatus.COMPLETED
            break
        case 'payment.failed':
            req.body.status = PaymentStatus.FAILED
            break
        default:
            throw new Error('Invalid payment event detected.')
    }
    await savePaymentDetails(req)
    res.status(200).json({
        success: true,
        message: 'Payment verified successfully.'
    })
})

export const savePaymentDetails = async req => {
    const { intent, orderId, paymentId, status } = req.body
    const payment = await Payment.findOneAndUpdate(
        { orderId },
        { orderId, paymentId, status },
        { new: true, upsert: true }
    )
    if (status === PaymentStatus.FAILED) return
    req.body.payment = payment._id
    switch (intent) {
        case PaymentIntent.CONTRIBUTION:
            if (status === PaymentStatus.COMPLETED) {
                const { contributor, amount: contribution, startDate, endDate } = await Contribution.findOne({ payment: payment._id })
                await Member.findByIdAndUpdate(contributor._id, { lastContributionOn: endDate })
                sendEmailFromServer(contributor.email, 'Contribution Received', contributionReceivedEmail(contributor.firstname, contribution, getFormattedDate(startDate), getFormattedDate(endDate)))
            } else await saveContribution(req)
            break
        case PaymentIntent.DONATION:
            if (status === PaymentStatus.COMPLETED) {
                const { name, email, amount: donation, subjectedTo, } = await Donation.findOne({ payment: payment._id })
                sendEmailFromServer(email, `Donation Received for ${subjectedTo}`, donationReceivedEmail(name, donation, paymentId))
            } else await saveDonation(req)
            break
        default:
            throw new Error('Not a recognized intent.')
    }
    return payment
}