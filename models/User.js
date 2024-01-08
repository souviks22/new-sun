import { Schema, model } from 'mongoose'
import { regex } from "../validation/regex.js"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'You are already registered'],
        match: [regex.email, 'Your email is invalid']
    },
    password: {
        type: String,
        required: true
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
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: [true, 'Your mobile number is already registered'],
        match: [regex.phone, 'Your mobile number is invalid']
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    sex: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Prefer not to say']
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
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

userSchema.virtual('age').get(function () {
    const today = new Date()
    let age = today.getFullYear() - this.dob.getFullYear()
    if (today.getMonth() < this.dob.getMonth()) --age
    else if (today.getMonth() === this.dob.getMonth() && today.getDate() < this.dob.getDate()) --age
    return age
})

const User = model('User', userSchema)
export default User