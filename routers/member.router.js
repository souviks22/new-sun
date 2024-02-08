import { Router } from "express"
import { header, body } from "express-validator"
import { isAuthorized } from "../middlewares/authorization.js"
import { fetchMemberHandler, updateMemberHandler, deleteMemberHandler } from "../controllers/member.controller.js"

export const memberRouter = Router()

memberRouter.get('/:id',
    header('authorization').exists(),
    isAuthorized,
    fetchMemberHandler
)

memberRouter.put('/:id',
    header('authorization').exists(),
    body('update').exists(),
    isAuthorized,
    updateMemberHandler
)

memberRouter.delete('/:id',
    header('authorization').exists(),
    isAuthorized,
    deleteMemberHandler
)