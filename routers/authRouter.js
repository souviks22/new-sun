import { Router } from "express"
import { body } from "express-validator"

const authRouter = Router()

authRouter.post('/signup',
    body('email').notEmpty(),
    body('password').notEmpty()
)

export default authRouter