import { Schema, model } from 'mongoose'
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const phoneRegex = /\d{10}/
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegex
    },
    password: {
        type: String,
        match: passwordRegex
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: Number,
        unique: true,
        sparse: true,
        validate: {
            validator: value => phoneRegex.test(value),
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