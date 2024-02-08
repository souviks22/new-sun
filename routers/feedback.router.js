import { Router } from "express"
import { body } from "express-validator"
import { fetchFeedbacksHandler, newFeedbackHandler } from "../controllers/feedback.controller.js"

export const feedbackRouter = Router()

feedbackRouter.get('/',
    fetchFeedbacksHandler
)

feedbackRouter.post('/',
    body('email').exists(),
    body('content').exists(),
    body('rating').exists(),
    newFeedbackHandler
)