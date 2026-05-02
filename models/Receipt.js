import { model, Schema } from "mongoose";

const receiptSchema = new Schema(
    {
        billNo: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        issueDate: {
            type: Date,
            required: true,
            default: Date.now
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        intent: {
            type: String,
            enum: ["contribution", "donation"],
            required: true
        },

        cause: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        payment: {
            type: Schema.Types.ObjectId,
            ref: "Payment",
            required: true
        }
    }
);

export const Receipt = model("Receipt", receiptSchema);