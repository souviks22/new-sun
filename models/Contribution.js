import { Schema, model } from "mongoose"

const contributionSchema = new Schema({
    contributor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    clearedUpTo: {
        type: Date,
        required: true
    }
})

const Contribution = model('Contribution', contributionSchema)
export default Contribution