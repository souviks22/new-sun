
import catchAsync from "../errors/async.js";
import { Donation } from "../models/Donation.js";
import { Payment } from "../models/Payment.js";
export const newDonationHandler = async (req, res) => {
    const { name, email, amount, paymentId } = req
    const donation = new Donation({ ...req, email: email.toLowerCase() })
    await donation.save()
    return { data: { _id: donation._id } };
}

export const donationStatushandler = catchAsync(async (req, res) => {
    const { referenceId } = req.params;
    if (!referenceId) {
        return res.status(400).json({ success: false, message: 'Missing donation referenceId.' });
    }
    const donation = await Donation.findById(referenceId);
    if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation not found.' });
    }
    const paymentId = donation.paymentId;
    if (!paymentId) {
        return res.status(400).json({ success: false, message: 'Payment ID not found for this contribution.' });
    }
    const payment = await Payment.findById(paymentId);
    if (!payment) {
        return res.status(404).json({ success: false, message: 'Payment record not found.' });
    }
    return res.status(200).json({
        success: true,
        data: {
            donation: donation,
            paymentStatus: payment.status,
        },
        message: 'Donation status retrieved.',
    });
});