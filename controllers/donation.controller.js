import { Donation } from "../models/Donation.js"

import catchAsync from "../errors/async.js"

export const saveDonation = async req => {
    const { name, email, phone, subjectedTo, amount, payment } = req.body
    return await Donation.findOneAndUpdate(
        { payment },
        { name, email, phone, subjectedTo, amount, payment },
        { new: true, upsert: true }
    )
}

export const newDonationHandler = catchAsync(async (req, res) => {
    const donation = await saveDonation(req)
    res.status(201).json({
        success: true,
        message: 'Your donation is accepted successfully.',
        data: { donation }
    })
})