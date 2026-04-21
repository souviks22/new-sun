import { v2 as cloudinary } from "cloudinary"
import { Member } from "../models/Member.js"
import { uploadStreamToCloudinary } from "../utility/cloudinary.js"

import catchAsync from "../errors/async.js"

export const fetchMemberHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const member = await Member.findById(id)
    if (!member) throw new Error('Member not found.')
    res.status(200).json({
        success: true,
        message: 'Member details are retrieved.',
        data: { member: member.toObject({ virtuals: true }) }
    })
})

export const updateMemberHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const { update } = req.body
    const member = await Member.findById(id);
    if (!member) throw new Error('Member not found.')
    const updated = await Member.findByIdAndUpdate(id, update, { runValidators: true })
    res.status(201).json({
        success: true,
        message: 'Member details are updated.',
        data: { member: updated }
    })
})
export const updateMemberImageHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) throw new Error('Member not found.');

    if (req.file) {
        const image = await uploadStreamToCloudinary(req.file.buffer, 'member-profiles', member.email);
        if (member.image?.id) {
            await cloudinary.uploader.destroy(member.image.id);
        }
        const updated = await Member.findByIdAndUpdate(id, { "image": image }, { runValidators: true, new: true }); // Added new: true
        res.status(200).json({
            success: true,
            message: 'Profile picture updated.',
            data: { member: updated }
        });
    } else {
        if (member.image?.id) {
            await cloudinary.uploader.destroy(member.image.id);
        }
        const updated = await Member.findByIdAndUpdate(id, { "image": null }, { runValidators: true, new: true }); // Added new: true
        res.status(200).json({
            success: true,
            message: 'Profile picture deleted.',
            data: { member: updated }
        });
    }
});

export const deleteMemberHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const member = await Member.findByIdAndDelete(id)
    if (!member) throw new Error('Member not found.')
    res.status(201).json({
        success: true,
        message: 'Member is deleted successfully.'
    })
})

export const getallMemberHandler = catchAsync(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const [members, total] = await Promise.all([
        Member.find({ 'status': 'active' })
            .select('-password')
            .sort({ joinedOn: -1 })
            .skip(skip)
            .limit(limit),

        Member.countDocuments({ 'status': "active" })
    ]);

    res.status(200).json({
        success: true,
        message: 'Member list retrieved',
        data: {
            members,
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