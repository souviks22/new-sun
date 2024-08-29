import catchAsync from "../errors/async.js"
import { Query } from "../models/Query.js"

export const getQueriesHandler = catchAsync(async (req, res) => {
    const { status } = req.query
    const options = status ? { status } : {}
    const queries = await Query.find(options)
    queries.sort((a, b) => a.eventdate.getTime() - b.eventdate.getTime())
    res.status(201).json({
        success: true,
        message: 'Here are the quries you asked for.',
        data: { queries }
    })
})

export const newQueryHandler = catchAsync(async (req, res) => {
    const { email: noisyEmail } = req.body
    const email = noisyEmail.toLowerCase()
    const count = await Query.countDocuments({ email, status: { $in: ['Active', 'Processed'] } })
    if (count >= 3) throw new Error('You have already 3 queries in progress')
    const query = new Query({ ...req.body, email })
    await query.save()
    res.status(201).json({
        success: true,
        message: 'We have received your query. We will get back to you.'
    })
})

export const changeQueryHandler = catchAsync(async (req, res) => {
    const { queryId } = req.params
    const { update } = req.body
    await Query.findByIdAndUpdate(queryId, update, { runValidators: true })
    res.status(201).json({
        success: true,
        message: 'Query has been updated.'
    })
})