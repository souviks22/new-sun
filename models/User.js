import { Schema, model } from 'mongoose'
import { regex } from "../validation/regex.js"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        match: [regex.email, 'Your email is invalid'],
        validate: {
            validator: function (email) {
                return model('User', userSchema).findOne({ email }).exec().then(user => !user)
            },
            message: 'You are already registered'
        }
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
        required: true,
        immutable: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [regex.phone, 'Your mobile number is invalid'],
        validate: {
            validator: function (phone) {
                return model('User', userSchema).findOne({ phone }).exec().then(user => !user)
            },
            message: 'Your mobile number is already registered'
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
        required: true,
        enum: {
            values: ['Male', 'Female', 'Prefer not to say'],
            message: 'Your sex is corrupted'
        }
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: {
            values: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
            message: 'Your blood group is corrupted'
        }
    },
    joinedOn: {
        type: Date,
        default: new Date(),
        immutable: true
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Inactive'],
            message: 'Your status is corrupted'
        },
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

userSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate()
    const immutableFields = Object.keys(this.schema.paths).filter(field => {
        return this.schema.paths[field].options.immutable === true
    })
    for (const field of immutableFields) {
        if (update.hasOwnProperty(field)) {
            return next(new Error(`Your ${field} cannot be changed`))
        }
    }
    next()
})

const User = model('User', userSchema)
export default User