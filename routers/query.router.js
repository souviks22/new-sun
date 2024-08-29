import { Router } from "express"
import { body, header } from "express-validator"
import { getQueriesHandler, newQueryHandler, changeQueryHandler } from "../controllers/query.controller.js"
import { isAuthorized, isAdmin } from "../middlewares/authorization.js"

export const queryRouter = Router()

queryRouter.get('/',
    header('authorization').exists(),
    isAuthorized,
    isAdmin,
    getQueriesHandler
)

queryRouter.post('/',
    body('email').exists(),
    body('firstname').exists(),
    body('lastname').exists(),
    body('phone').exists(),
    body('eventdate').exists(),
    body('cause').exists(),
    body('budget').exists(),
    newQueryHandler
)

queryRouter.put('/:queryId',
    header('authorization').exists(),
    body('update').exists(),
    isAuthorized,
    isAdmin,
    changeQueryHandler
)