import { Router } from "express"
import { body, header } from "express-validator"
import { isAuthorized } from "../middlewares/authorization.js"
import { newContributionHandler } from "../controllers/contribution.controller.js"

const contributionRouter = Router()

contributionRouter.post('/',
    header('authorization').exists(),
    body('amount').exists(),
    body('date').exists(),
    isAuthorized,
    newContributionHandler
)

export default contributionRouter