import { Payment } from "../models/Payment.js"

import Razorpay from "razorpay"
import crypto from "crypto"
import catchAsync from "../errors/async.js"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const paymentOrderHandler = catchAsync(async (req, res) => {
    const { amount, currency = "INR", receipt } = req.body
    const options = {
      amount: amount * 100,
      currency,
      receipt: receipt || `order_rcpt_${Date.now()}`
    }
    const order = await razorpay.orders.create(options);
    res.status(201).json({ success: true, order });
})

export const paymentVerificationHandler = catchAsync(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (generatedSignature === razorpay_signature) {
      await savePaymentDetails(razorpay_order_id, razorpay_payment_id);
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
})


export const savePaymentDetails = async (orderId, paymentId) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, status: "completed" },
      { new: true, upsert: true }
    );
    console.log("Payment saved:", payment);
  } catch (error) {
    console.error("Error saving payment:", error);
  }
}
