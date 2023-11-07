import User from "../models/User.js"
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