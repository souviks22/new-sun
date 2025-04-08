import jwt from "jsonwebtoken"
import catchAsync from "../errors/async.js"
import { Contribution } from "../models/Contribution.js"
import { Member } from "../models/Member.js"
import { contributionReceivedEmail } from "../utility/emails.js"
import { sendEmailFromServer } from "../utility/mailer.js"

export const newContributionHandler = catchAsync(async (req, res) => {
    const { amount, endDate, paymentId, contributor } = req.body;
    const contributions = await Contribution.find({ contributor: contributor }).sort({ endDate: -1 })
    const member = await Member.findById(contributor);
    if (!member) {
        return res.status(404).json({ success: false, message: 'Member not found.' });
    }
    const latest = contributions.length ?
        new Date(contributions[0].endDate.getFullYear(), contributions[0].endDate.getMonth() + 1, 1) :
        member.joinedOn;
    const contribution = new Contribution({ contributor: contributor, startDate: latest, ...req.body })
    await contribution.save()
    sendEmailFromServer(member.email, 'Contribution Recieved-Team New Sun Foundation', contributionReceivedEmail(member.fullname, amount, latest, endDate, paymentId))
    res.status(201).json({
        success: true,
        message: 'Your contribution is accepted successfully.',
        data: { contribution }
    })
})

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
    const contributions = await Contribution.find({ contributor: _id }).sort({ endDate: -1 })
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