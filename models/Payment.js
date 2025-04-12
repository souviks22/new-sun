import { Schema, model } from "mongoose"

export const PaymentStatus = { PENDING: 'pending', COMPLETED: 'completed', FAILED: 'failed' }

const paymentSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    paymentId: String,
    status: {
        type: String,
        enum: [PaymentStatus.PENDING, PaymentStatus.COMPLETED, PaymentStatus.FAILED],
        default: PaymentStatus.PENDING
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Payment = model('Payment', paymentSchema)