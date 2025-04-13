import { Donation } from "../models/Donation.js"

import catchAsync from "../errors/async.js"

export const saveDonation = async req => {
    const { name, email, phone, subjectedTo, amount, payment } = req.body
    const donation = new Donation({ name, email, phone, subjectedTo, amount, payment })
    await donation.save()
    return donation
}

export const newDonationHandler = catchAsync(async (req, res) => {
    const donation = await saveDonation(req)
    res.status(201).json({
        success: true,
        message: 'Your donation is accepted successfully.',
        data: { donation }
    })
})