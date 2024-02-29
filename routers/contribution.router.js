import { Router } from "express"
import { body, header } from "express-validator"
import { fetchContributionsHandler, newContributionHandler } from "../controllers/contribution.controller.js"
import { isAuthorized } from "../middlewares/authorization.js"

export const contributionRouter = Router()

contributionRouter.get('/',
    header('authorization').exists(),
    isAuthorized,
    fetchContributionsHandler
)

contributionRouter.post('/',
    header('authorization').exists(),
    body('amount').exists(),
    body('endDate').exists(),
    isAuthorized,
    newContributionHandler
)