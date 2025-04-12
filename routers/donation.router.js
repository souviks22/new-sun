import { Router } from "express"
import { body } from "express-validator"
import { newDonationHandler } from "../controllers/donation.controller.js"
export const donationRouter = Router()

donationRouter.post('/',
    body('name').exists(),
    body('email').exists(),
    body('phone').exists(),
    body('subjectedTo').exists(),
    body('amount').exists(),
    body('payment').exists(),
    newDonationHandler
)