import catchAsync from "../errors/async.js";
import { Query } from "../models/Query.js";

export const newQueryHandler = catchAsync(async (req, res) => {
    const { email } = req.body
    const query = new Query({ ...req.body, email: email.toLowerCase() })
    await query.save()
    res.status(201).json({
        success: true,
        message: 'We have received your query. We will get back to you.'
    })
})