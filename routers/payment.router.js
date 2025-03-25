import { Router } from "express"
import { paymentOrderHandler } from "../controllers/payment.controller"

export const paymentRouter = Router()

paymentRouter.post('/order',
    body('amount').exists(),
    paymentOrderHandler
)

paymentRouter.post('/verify',
    
)