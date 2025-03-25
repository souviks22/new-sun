import { Router } from "express"
import { paymentOrderHandler, paymentVerificationHandler } from "../controllers/payment.controller.js"

export const paymentRouter = Router()

paymentRouter.post('/order',
    paymentOrderHandler
)

paymentRouter.post('/verify',
    paymentVerificationHandler
)