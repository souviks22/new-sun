import { Schema, model } from "mongoose"

const contributionSchema = new Schema({
    contributor: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        immutable: true,
        min: [1, 'Your contribution should be a positive value.']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        default: function () {
            return this.startDate
        }
    },
    status: {
        type: String,
        enum: {
            values: ['successful', 'pending', 'failed'],
            message: 'The given contribution status cannot be accepted.'
        },
        default: 'successful'
    }
})

export const Contribution = model('Contribution', contributionSchema)