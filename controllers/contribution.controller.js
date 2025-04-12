import { Contribution } from "../models/Contribution.js"
import { Member } from "../models/Member.js"

import jwt from "jsonwebtoken"
import catchAsync from "../errors/async.js"

export const saveContribution = async req => {
    const { contributor, payment, amount, endDate } = req.body
    const member = await Member.findById(contributor)
    if (!member) throw new Error('You are not a member yet.')
    const startDate = member.lastContributionOn
    return await Contribution.findOneAndUpdate(
        { payment },
        { contributor, payment, amount, startDate, endDate },
        { new: true, upsert: true }
    ).populate('contributor')
}

export const newContributionHandler = catchAsync(async (req, res) => {
    const contribution = await saveContribution(req)
    res.status(201).json({
        success: true,
        message: 'Your contribution is accepted successfully.',
        data: { contribution }
    })
})

export const getDueContributions = async (memberId, contributions) => {
    const member = await Member.findById(memberId)
    const latest = contributions.length ?
        new Date(contributions[0].endDate.getFullYear(), contributions[0].endDate.getMonth() + 1, 1) :
        member.joinedOn
    const due = []
    const today = new Date()
    while (today.getMonth() >= latest.getMonth() || today.getFullYear() > latest.getFullYear()) {
        due.push(`${today.getMonth() + 1}/${today.getFullYear()}`)
        today.setMonth(today.getMonth() - 1)
    }
    return due
}


export const fetchContributionsHandler = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
    const contributions = await Contribution
        .find({ contributor: _id })
        .sort({ endDate: -1 })
        .populate('payment')
    const completed = contributions.filter(c => c.payment.status === 'completed')
    const totalAmount = completed.reduce((current, contribution) => current + contribution.amount, 0)
    const due = await getDueContributions(_id, completed)
    res.status(200).json({
        success: true,
        message: 'Your contribution history is retrieved.',
        data: { contributions, totalAmount, due }
    })
})