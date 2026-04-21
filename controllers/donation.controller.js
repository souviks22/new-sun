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

export const fetchDonationHandler = catchAsync(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const pipeline = [
        {
            $lookup: {
                from: 'payments',
                localField: 'payment',
                foreignField: '_id',
                as: 'payment'
            }
        },
        {
            $unwind: {
                path: '$payment',
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $match: {
                'payment.status': 'completed'
            }
        },
        {
            $sort: {
                'payment.createdAt': -1
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                phone: 1,
                subjectedTo: 1,
                amount: 1,
                paymentDate: '$payment.createdAt',
                paymentId: '$payment._id',
                paymentStatus: '$payment.status'
            }
        }
    ];

    const [donations, totalResult] = await Promise.all([
        Donation.aggregate([
            ...pipeline,
            { $skip: skip },
            { $limit: limit }
        ]).allowDiskUse(true),

        Donation.aggregate([
            ...pipeline,
            { $count: 'total' }
        ])
    ]);

    const total = totalResult[0]?.total || 0;

    res.status(200).json({
        success: true,
        message: 'All successful donations are retrieved',
        data: {
            donations,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            }
        }
    });
});