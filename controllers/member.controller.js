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
    if (req.file) {
        update.image = await uploadStreamToCloudinary(req.file.buffer, 'member-profiles', member.email)
        await cloudinary.uploader.destroy(member.image?.id)
    }
    const updated = await Member.findByIdAndUpdate(id, update, { runValidators: true })
    res.status(201).json({
        success: true,
        message: 'Member details are updated.',
        data: { member: updated }
    })
})

export const deleteMemberHandler = catchAsync(async (req, res) => {
    const { id } = req.params
    const member = await Member.findByIdAndDelete(id)
    if (!member) throw new Error('Member not found.')
    res.status(201).json({
        success: true,
        message: 'Member is deleted successfully.'
    })
})