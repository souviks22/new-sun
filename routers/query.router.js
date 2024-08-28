import { Router } from "express";
import { body } from "express-validator";
import { newQueryHandler } from "../controllers/query.controller.js";

export const queryRouter = Router()

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