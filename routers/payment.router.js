import { Router } from "express"
import { body } from "express-validator"
import { paymentOrderHandler, paymentVerificationHandler } from "../controllers/payment.controller.js"
export const paymentRouter = Router()

paymentRouter.post('/order',
    body('amount').exists(),
    paymentOrderHandler
)

paymentRouter.post('/verify',
    paymentVerificationHandler,

)