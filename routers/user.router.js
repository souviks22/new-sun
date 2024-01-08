import { Router } from "express"
import { header, body } from "express-validator"
import { isAuthorized } from "../middlewares/authorization.js"
import { fetchUserHandler, updateUserHandler } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.get('/:id',
    header('authorization').exists(),
    isAuthorized,
    fetchUserHandler
)

userRouter.put('/:id',
    header('authorization').exists(),
    body('update').exists(),
    isAuthorized,
    updateUserHandler
)

export default userRouter