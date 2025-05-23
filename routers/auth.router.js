import { Router } from "express"
import { body, header } from "express-validator"
import {
    authPersistenceHandler, forgotPasswordInitiationHandler, forgotPasswordVerificationHandler,
    resetPasswordHandler, signinHandler, signupInitiationHandler, signupVerificationHandler
} from "../controllers/auth.controller.js"
import { isAuthorized } from "../middlewares/authorization.js"
import { formMediaUploader } from "../utility/cloudinary.js"

export const authRouter = Router()

authRouter.post('/signup',
    formMediaUploader.single('image'),
    body('email').exists(),
    body('password').exists(),
    body('firstname').exists(),
    body('lastname').exists(),
    body('dob').exists(),
    body('phone').exists(),
    body('sex').exists(),
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

authRouter.post('/forgot-password',
    body('email').exists(),
    forgotPasswordInitiationHandler
)

authRouter.post('/forgot-password-verify',
    body('email').exists(),
    body('otp').exists(),
    forgotPasswordVerificationHandler
)

authRouter.post('/reset-password',
    body('password').exists(),
    isAuthorized,
    resetPasswordHandler
)