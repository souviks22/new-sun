import { Schema, model } from "mongoose"
import { regex } from "../validation/regex.js"

const donationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [regex.phone, 'Your mobile number is invalid.']
    },
    subjectedTo: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        immutable: true,
        min: [50, 'Your donation is lower than the minimum acceptable amount.']
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
})

export const Donation = model('Donation', donationSchema)