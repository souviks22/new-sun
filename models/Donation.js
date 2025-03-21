import { Schema, model } from "mongoose"

const donationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    subjectedTo: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        immutable: true,
        min: [30, 'Your donation is lower than the minimum acceptable amount.']
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
})

export const Donation = model('Donation', donationSchema)