import { Router } from "express"
import { header } from "express-validator"
import { getallMemberHandler } from "../controllers/member.controller.js"

import { getContributions } from "../controllers/contribution.controller.js"
import { fetchDonationHandler } from "../controllers/donation.controller.js"
import { isAdmin, isAuthorized } from "../middlewares/authorization.js"


export const adminRouter = Router()

adminRouter.get('/allDonation',
    header('authorization').exists(),
    isAuthorized,
    isAdmin,
    fetchDonationHandler
)

adminRouter.get('/allMember',
    header('authorization').exists(),
    isAuthorized,
    isAdmin,
    getallMemberHandler
)

adminRouter.get('/allContribution',
    header('authorization').exists(),
    isAuthorized,
    isAdmin,
    getContributions
)
