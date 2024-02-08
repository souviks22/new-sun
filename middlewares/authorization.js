import { Member } from "../models/Member.js"

import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const isAuthorized = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers
    const bearer = authorization.split(' ')
    if (bearer.length != 2) throw new Error('Authorization failed.')
    const { _id } = jwt.verify(bearer[1], process.env.TOKEN_SECRET)
    const member = await Member.findById(_id)
    if (!member) throw new Error('You are not authorized.')
    next()
})