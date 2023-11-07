import User from "../models/User.js"
import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const isAuthorized = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await User.findById(_id)
    if (!user) throw new Error('You are not authorized')
    next()
})