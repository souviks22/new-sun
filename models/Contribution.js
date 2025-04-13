import { Schema, model } from "mongoose"

const CONTRIBUTION_THRESHOLD = 50

const contributionSchema = new Schema({
    contributor: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        immutable: true,
        validate: {
            validator: function (amount) {
                const months = (this.endDate.getMonth() - this.startDate.getMonth() + 1) + 12 * (this.endDate.getFullYear() - this.startDate.getFullYear())
                return amount / months >= CONTRIBUTION_THRESHOLD
            },
            message: `Your contribution is lower than the minimum amount of Rs. ${CONTRIBUTION_THRESHOLD} per month.`
        }
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (endDate) {
                return endDate >= this.startDate
            },
            message: 'Your contribution timeline cannot be accpeted.'
        }
    },
    contributedOn: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

export const Contribution = model('Contribution', contributionSchema)