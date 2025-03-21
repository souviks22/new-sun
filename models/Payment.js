import { Schema, model } from "mongoose"

const paymentSchema = new Schema({
    orderId: { 
        type: String, 
        required: true 
    },
    paymentId: { 
        type: String,
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "completed", "failed"], 
        default: "pending" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

export const Payment = model('Payment', paymentSchema)