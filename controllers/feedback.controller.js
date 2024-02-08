import { Feedback } from "../models/Feedback.js"

import catchAsync from "../errors/async.js"

export const fetchFeedbacksHandler = catchAsync(async (req, res) => {
    const feedbacks = await Feedback.find()
    res.status(200).json({
        success: true,
        message: 'All feedbacks are retrieved.',
        data: { feedbacks }
    })
})

export const newFeedbackHandler = catchAsync(async (req, res) => {
    const { email } = req.body
    const feedback = new Feedback({ ...req.body, email: email.toLowerCase() })
    await feedback.save()
    res.status(201).json({
        success: true,
        message: 'Your feedback is added successfully.'
    })
})