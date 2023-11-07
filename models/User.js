import { Schema, model } from 'mongoose'
import { regex } from "../validation/regex.js"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: regex.email
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        minlength: 2
    },
    lastname: {
        type: String,
        minlength: 2
    },
    phone: {
        type: String,
        unique: true,
        match: regex.phone
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    sex: {
        type: String,
        enum: ['Male', 'Female', 'Prefer not to say']
    },
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
    },
    monthsDue: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
})

userSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`
})

const User = model('User', userSchema)
export default User