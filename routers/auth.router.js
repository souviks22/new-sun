import { Router } from "express"
import { header, body, query } from "express-validator"
import { isAuthorized } from "../middlewares/authorization.js"
import { signupInitiationHandler, signupVerificationHandler, signinHandler, authPersistenceHandler } from "../controllers/auth.controller.js"

export const authRouter = Router()

authRouter.post('/signup',
    body('email').exists(),
    body('password').exists(),
    body('firstname').exists(),
    body('lastname').exists(),
    body('dob').exists(),
    body('phone').exists(),
    body('sex').exists(),
    body('bloodGroup').exists(),
    signupInitiationHandler
)

authRouter.post('/signup-verify',
    body('email').exists(),
    body('otp').exists(),
    signupVerificationHandler
)

authRouter.post('/signin',
    body('email').exists(),
    body('password').exists(),
    signinHandler
)

authRouter.get('/authenticate',
    header('authorization').exists(),
    isAuthorized,
    authPersistenceHandler
)