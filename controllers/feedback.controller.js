import { Feedback } from "../models/Feedback.js"

import catchAsync from "../errors/async.js"

export const fetchFeedbacksHandler = catchAsync(async (_req, res) => {
    const feedbacks = await Feedback.find()
    feedbacks.sort((a, b) => b.rating - a.rating || b.content.length - a.content.length)
    res.status(200).json({
        success: true,
        message: 'Top 5 feedbacks are retrieved.',
        data: { feedbacks: feedbacks.slice(0, 5) }
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