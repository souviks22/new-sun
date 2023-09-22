import { Router } from "express"
import { body } from "express-validator"
import { signupHandler, signinHandler } from "../controllers/auth.js"

const authRouter = Router()

authRouter.post('/signup',
    body('email').notEmpty(),
    body('password').notEmpty(),
    signupHandler
)

authRouter.post('/signin',
    body('email').notEmpty(),
    body('password').notEmpty(),
    signinHandler
)

export default authRouter