import { Router } from "express"
import { body, header } from "express-validator"
import { deleteMemberHandler, fetchMemberHandler, updateMemberHandler, updateMemberImageHandler } from "../controllers/member.controller.js"
import { isAuthorized } from "../middlewares/authorization.js"
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

memberRouter.put('/:id/image',
    header('authorization').exists(),
    formMediaUploader.single('image'),
    isAuthorized,
    updateMemberImageHandler
)

memberRouter.delete('/:id',
    header('authorization').exists(),
    isAuthorized,
    deleteMemberHandler
)