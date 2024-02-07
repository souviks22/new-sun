import { Schema, model } from "mongoose"

const contributionSchema = new Schema({
    contributor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: true,
        immutable: true,
        min: [0, 'Your amount cannot be negative']
    },
    date: {
        type: Date,
        required: true,
        immutable: true
    },
    status: {
        type: String,
        enum: ['successful', 'pending', 'failed'],
        default: 'pending'
    }
})

const Contribution = model('Contribution', contributionSchema)
export default Contribution