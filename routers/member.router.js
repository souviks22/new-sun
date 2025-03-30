import { Router } from "express"
import { header, body } from "express-validator"
import { isAuthorized } from "../middlewares/authorization.js"
import { fetchMemberHandler, updateMemberHandler, deleteMemberHandler } from "../controllers/member.controller.js"
import { formMediaUploader } from "../utility/cloudinary.js"

export const memberRouter = Router()

memberRouter.get('/:id',
    fetchMemberHandler
)

memberRouter.put('/:id',
    header('authorization').exists(),
    body('update').exists(),
    formMediaUploader.single('image'),
    isAuthorized,
    updateMemberHandler
)

memberRouter.delete('/:id',
    header('authorization').exists(),
    isAuthorized,
    deleteMemberHandler
)