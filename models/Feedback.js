import { Schema, model } from "mongoose"
import { regex } from "../validation/regex.js"

const feedbackSchema = new Schema({
    name: {
        type: String,
        default: 'Anonymous',
        minlength: [3, 'Your name is too short']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [regex.email, 'Your email is invalid.'],
        validate: {
            validator: function (email) {
                return model('Feedback', feedbackSchema).findOne({ email }).exec().then(member => !member)
            },
            message: 'You already gave a feedback.'
        }
    },
    content: {
        type: String,
        required: true,
        minlength: [3, 'Please elaborate a bit more about your experience with us.']
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Your rating cannot be less than 1.'],
        max: [5, 'Your rating cannot be greater than 5.']
    }
})

export const Feedback = model('Feedback', feedbackSchema)