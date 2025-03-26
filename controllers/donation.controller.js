import catchAsync from "../errors/async.js";
import { Donation } from "../models/Donation.js";

export const newDonationHandler = catchAsync(async (req, res) => {
    const { email } = req.body
    const donation = new Donation({ ...req.body, email: email.toLowerCase() })
    await donation.save()
    res.status(201).json({
        success: true,
        message: 'Your donation is recieved successfully.'
    })
})