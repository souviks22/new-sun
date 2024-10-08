import { Router } from "express"
import { body, header } from "express-validator"
import { authPersistenceHandler, signinHandler, signupInitiationHandler, signupVerificationHandler } from "../controllers/auth.controller.js"
import { isAuthorized } from "../middlewares/authorization.js"

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