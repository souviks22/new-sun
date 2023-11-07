import { Router } from "express"
import { header, body } from "express-validator"
import { isAuthorized } from "../middlewares/auth.js"
import { fetchUserHandler, updateUserHandler } from "../controllers/user.js"

const userRouter = Router()

userRouter.get('/:id',
    header('authorization').notEmpty(),
    isAuthorized,
    fetchUserHandler
)

userRouter.put('/:id',
    header('authorization').notEmpty(),
    body('update').notEmpty(),
    isAuthorized,
    updateUserHandler
)

export default userRouter