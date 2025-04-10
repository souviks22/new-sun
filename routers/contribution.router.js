import { Router } from "express"
import { body, header } from "express-validator"
import { contributionStatushandler, fetchContributionsHandler, newContributionHandler } from "../controllers/contribution.controller.js"
import { isAuthorized } from "../middlewares/authorization.js"

export const contributionRouter = Router()

contributionRouter.get('/',
    header('authorization').exists(),
    isAuthorized,
    fetchContributionsHandler
)

contributionRouter.post('/',
    body('amount').exists(),
    body('endDate').exists(),
    body('paymentId').exists(),
    body('contributor').exists(),
    newContributionHandler
)

contributionRouter.get('/status/:referenceId',
    contributionStatushandler
)