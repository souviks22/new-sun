import { Schema, model } from "mongoose"
import { regex } from "../validation/regex.js"
const donationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [regex.phone, 'Your mobile number is invalid.']
    },
    email: {
        type: String,
        required: true
    },
    subjectedTo: {
        type: String
    },
    amount: {
        type: Number,
        required: true,
        immutable: true,
        min: [50, 'Your donation is lower than the minimum acceptable amount.']
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    }
})

export const Donation = model('Donation', donationSchema)