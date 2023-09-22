import bcrypt from "bcrypt"
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
        match: regex.password,
        set: pw => bcrpyt.hash(pw, process.env.HASH_SECRET)
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
        type: Number,
        unique: true,
        sparse: true,
        validate: {
            validator: value => regex.phone.test(value),
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    sex: {
        type: String,
        enum: ['Male', 'Female', 'None'],
        default: 'None'
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