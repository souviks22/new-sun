import { Router } from "express"
import { paymentOrderHandler, paymentVerificationHandler } from "../controllers/payment.controller"
import { body } from "express-validator"

export const paymentRouter = Router()

paymentRouter.post('/order',
    body('amount').exists(),
    paymentOrderHandler
)

paymentRouter.post('/verify',
    body('razorpay_order_id').exists(),
    body('razorpay_payment_id').exists(),
    body('razorpay_signature').exists(),
    paymentVerificationHandler
)