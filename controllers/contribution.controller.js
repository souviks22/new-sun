import Contribution from "../models/Contribution.js"
import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const newContributionHandler = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
    const { amount, date } = req.body
    const contribution = new Contribution({ contributor: _id, amount, date, status: 'successful' })
    await contribution.save()
    res.status(201).json({
        success: true,
        message: 'Your contribution is accepted successfully',
        data: { contribution }
    })
})