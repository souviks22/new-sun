import jwt from "jsonwebtoken";
import catchAsync from "../errors/async.js";
import { Contribution } from "../models/Contribution.js";
import { Member } from "../models/Member.js";
import { Payment } from '../models/Payment.js';

export const newContributionHandler = async (req, res) => {
    const { contributor } = req;
    const contributions = await Contribution.find({ contributor: contributor, status: "completed" }).sort({ endDate: -1 })
    const member = await Member.findById(contributor);
    const latest = contributions.length
        ? new Date(Date.UTC(
            new Date(contributions[0].endDate).getUTCFullYear(),
            new Date(contributions[0].endDate).getUTCMonth() + 1,
            1
        ))
        : new Date(Date.UTC(
            new Date(member.joinedOn).getUTCFullYear(),
            new Date(member.joinedOn).getUTCMonth(),
            new Date(member.joinedOn).getUTCDate()
        ));
    const contribution = new Contribution({ contributor: contributor, startDate: latest, ...req })
    await contribution.save()
    return { data: { _id: contribution._id } }
}

const getDueContributions = (latest) => {
    const due = [];
    const today = new Date();
    while (today.getMonth() >= latest.getMonth() || today.getFullYear() > latest.getFullYear()) {
        due.push(`${today.getMonth() + 1}/${today.getFullYear()}`);
        today.setMonth(today.getMonth() - 1);
    }
    return due;
}


export const fetchContributionsHandler = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
    const contributions = await Contribution.find({ contributor: _id, status: "completed" }).sort({ endDate: -1 })
    const totalAmount = contributions.reduce((current, contribution) => current + contribution.amount, 0)
    const member = await Member.findById(_id)
    const latest = contributions.length ?
        new Date(contributions[0].endDate.getFullYear(), contributions[0].endDate.getMonth() + 1, 1) :
        member.joinedOn;
    const due = getDueContributions(latest)
    res.status(200).json({
        success: true,
        message: 'Your contribution history is retrieved.',
        data: { contributions, totalAmount, due }
    })
})



export const contributionStatushandler = catchAsync(async (req, res) => {
    const { referenceId } = req.params
    if (!referenceId) {
        return res.status(400).json({ success: false, message: 'Missing contribution referenceId.' });
    }
    const contribution = await Contribution.findById(referenceId);
    if (!contribution) {
        return res.status(404).json({ success: false, message: 'Contribution not found.' });
    }
    const paymentId = contribution.paymentId;
    if (!paymentId) {
        return res.status(400).json({ success: false, message: 'Payment ID not found for this contribution.' });
    }
    const payment = await Payment.findById(paymentId);
    if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment record not found.' });
    }
    return res.status(200).json({
        success: true,
        data: {
            contribution: contribution,
            paymentStatus: payment.status,
        },
        message: 'Contribution status retrieved.',
    });
});
