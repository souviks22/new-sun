import User from "../models/User.js"
import Contribution from "../models/Contribution.js"
import catchAsync from "../errors/async.js"

export const fetchUserHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new Error('User not found')
    res.status(200).json({
        success: true,
        message: 'User details retrieved',
        data: { user }
    })
})

export const updateUserHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const { update } = req.body
    const user = await User.findByIdAndUpdate(id, update, { runValidators: true })
    if (!user) throw new Error('User not found')
    res.status(201).json({
        success: true,
        message: 'User details updated'
    })
})

const getDueContributions = latest => {
    const due = []
    const today = new Date()
    while (today.getMonth() !== latest.getMonth() || today.getFullYear() !== latest.getFullYear()) {
        due.push(today)
        today.setDate(0)
    }
    return due
}

export const fetchContributionsHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const contributions = await Contribution.find({ contributor: id })
    const totalAmount = contributions.reduce((prev, cur) => prev + cur, 0)
    const user = await User.findById(id)
    const initialDate = user.joinedOn().setDate(0)
    const latest = contributions.reduce((prev, cur) => prev < cur ? cur : prev, initialDate).date
    const due = getDueContributions(latest)
    res.status(200).json({
        success: true,
        message: 'Your contribution history retrieved',
        data: { contributions, totalAmount, due }
    })
})