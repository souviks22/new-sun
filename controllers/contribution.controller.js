import { Contribution } from "../models/Contribution.js"
import { Member } from "../models/Member.js"

import jwt from "jsonwebtoken"
import catchAsync from "../errors/async.js"

export const saveContribution = async req => {
    const { contributor, payment, amount, endDate } = req.body
    const member = await Member.findById(contributor)
    if (!member) throw new Error('You are not a member yet.')
    const startDate = new Date(member.lastContributionOn.getFullYear(), member.lastContributionOn.getMonth() + 1, 1)
    const contribution = new Contribution({ contributor, payment, amount, startDate, endDate })
    await contribution.save()
    return contribution
}

export const newContributionHandler = catchAsync(async (req, res) => {
    const contribution = await saveContribution(req)
    res.status(201).json({
        success: true,
        message: 'Your contribution is accepted successfully.',
        data: { contribution }
    })
})

export const getFormattedDate = date => date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

export const getDueContributions = async memberId => {
    const member = await Member.findById(memberId)
    const latest = member.lastContributionOn
    const due = []
    const today = new Date()
    while (today.getMonth() > latest.getMonth() || today.getFullYear() > latest.getFullYear()) {
        due.push(getFormattedDate(today))
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
    const totalAmount = contributions
        .filter(c => c.payment.status === 'completed')
        .reduce((current, contribution) => current + contribution.amount, 0)
    const due = await getDueContributions(_id)
    res.status(200).json({
        success: true,
        message: 'Your contribution history is retrieved.',
        data: { contributions, totalAmount, due }
    })
})


export const getContributions = catchAsync(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const result = await Contribution.aggregate([
        {
            $lookup: {
                from: "payments",
                localField: "payment",
                foreignField: "_id",
                as: "payment"
            }
        },
        { $unwind: "$payment" },
        {
            $match: {
                "payment.status": 'completed'
            }
        },
        {
            $lookup: {
                from: "members",
                localField: "contributor",
                foreignField: "_id",
                as: "contributor"
            }
        },
        { $unwind: "$contributor" },

        {
            $facet: {
                contribution: [
                    {
                        $project: {
                            memberName: {
                                $concat: [
                                    "$contributor.firstname",
                                    " ",
                                    "$contributor.lastname"
                                ]
                            },
                            startDate: 1,
                            endDate: 1,
                            amount: 1,
                            contributedOn: 1
                        }
                    },
                    { $sort: { contributedOn: -1 } },
                    { $skip: skip },
                    { $limit: limit }
                ],
                totalCount: [
                    { $count: "total" }
                ]
            }
        }
    ]);

    const contribution = result[0].contribution;
    const total = result[0].totalCount[0]?.total || 0;

    res.status(200).json({
        success: true,
        message: "All contribution history retrieved",
        data: {
            contribution,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
                limit
            }
        }
    });
});