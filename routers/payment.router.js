import { Router } from "express"
import { body } from "express-validator"
import { paymentOrderHandler, paymentVerificationHandler, razorpayWebhookHandler, PaymentIntent } from "../controllers/payment.controller.js"
export const paymentRouter = Router()

const { CONTRIBUTION, DONATION } = PaymentIntent

paymentRouter.post('/order',
    body('amount').exists(),
    body('intent').isIn([CONTRIBUTION, DONATION]),
    body('contributor').if(body('intent').equals(CONTRIBUTION)).exists(),
    body('endDate').if(body('intent').equals(CONTRIBUTION)).exists(),
    body('name').if(body('intent').equals(DONATION)).exists(),
    body('email').if(body('intent').equals(DONATION)).exists(),
    body('phone').if(body('intent').equals(DONATION)).exists(),
    body('subjectedTo').if(body('intent').equals(DONATION)).exists(),
    paymentOrderHandler
)

paymentRouter.post('/verify',
    body('intent').isIn([CONTRIBUTION, DONATION]),
    body('razorpay_order_id').exists(),
    body('razorpay_payment_id').exists(),
    body('razorpay_signature').exists(),
    paymentVerificationHandler,
)

paymentRouter.post('/razorpay/webhook',
    razorpayWebhookHandler
)