import catchAsync from "../errors/async.js";
import { Donation } from "../models/Donation.js";
import { donationReceivedEmail } from "../utility/emails.js";
import { sendEmailFromServer } from "../utility/mailer.js";
export const newDonationHandler = catchAsync(async (req, res) => {
    const { name, email, amount, paymentId } = req.body
    const donation = new Donation({ ...req.body, email: email.toLowerCase() })
    await donation.save()
    sendEmailFromServer(email, 'Donation Recieved-Team New Sun Foundation', donationReceivedEmail(name, amount, paymentId))
})