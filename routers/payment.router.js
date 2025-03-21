import { Router } from "express"
import { paymentOrderHandler } from "../controllers/payment.controller"

export const paymentRouter = Router()

paymentRouter.post('/order',
    paymentOrderHandler
)

paymentRouter.post('/verify',
    
)