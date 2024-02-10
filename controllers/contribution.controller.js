import { Contribution } from "../models/Contribution.js"
import { Member } from "../models/Member.js"

import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"

export const newContributionHandler = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
    const contribution = new Contribution({ contributor: _id, ...req.body })
    await contribution.save()
    res.status(201).json({
        success: true,
        message: 'Your contribution is accepted successfully.',
        data: { contribution }
    })
})

const getDueContributions = latest => {
    const due = []
    const today = new Date()
    while (today.getMonth() !== latest.getMonth() || today.getFullYear() !== latest.getFullYear()) {
        due.push(new Date(today))
        today.setDate(0)
    }
    return due
}

export const fetchContributionsHandler = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
    const contributions = await Contribution.find({ contributor: _id }).sort({ endDate: -1 })
    const totalAmount = contributions.reduce((current, contribution) => current + contribution.amount, 0)
    const member = await Member.findById(_id)
    member.joinedOn.setDate(0)
    const latest = contributions.length ? contributions[0].endDate : member.joinedOn
    const due = getDueContributions(latest)
    res.status(200).json({
        success: true,
        message: 'Your contribution history is retrieved.',
        data: { contributions, totalAmount, due }
    })
})