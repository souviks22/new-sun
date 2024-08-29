import { Schema, model } from "mongoose"
import { regex } from "../validation/regex.js"

const querySchema = new Schema({
    email: {
        type: String,
        required: true,
        immutable: true,
        match: [regex.email, 'Your email is invalid']
    },
    firstname: {
        type: String,
        required: true,
        minlength: [2, 'Your firstname is too short']
    },
    lastname: {
        type: String,
        required: true,
        minlength: [2, 'Your lastname is too short']
    },
    eventdate: {
        type: Date,
        required: true,
        immutable: true
    },
    phone: {
        type: String,
        required: true,
        match: [regex.phone, 'Your mobile number is invalid.']
    },
    budget: {
        type: String,
        required: true,
        enum: {
            values: ["Below 2000", "2000-5000", "5000-10000", "Above 10000"],
            message: 'Your budget cannot be accepted'
        }
    },
    cause: {
        type: String,
        required: true
    },
    submittedOn: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Processed', 'Completed'],
            message: 'Query status cannot be accepted.'
        },
        default: 'Active'
    }
})

export const Query = model('query', querySchema)

