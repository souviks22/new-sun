import { Router } from "express"
import { body } from "express-validator"
import { signupHandler, signinHandler } from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post('/signup',
    body('email').exists(),
    body('password').exists(),
    body('firstname').exists(),
    body('lastname').exists(),
    body('dob').exists(),
    body('phone').exists(),
    body('sex').exists(),
    body('bloodGroup').exists(),
    signupHandler
)

authRouter.post('/signin',
    body('email').exists(),
    body('password').exists(),
    signinHandler
)

export default authRouter