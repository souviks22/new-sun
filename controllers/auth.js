import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"
import bcrpyt from "bcrypt"

import { regex } from "../validation/regex.js"

export const signupHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const userIsPresent = await User.findOne({ email })
    if (userIsPresent) throw new Error('You are already registered')
    if (!regex.password.test(password)) throw new Error('Your password is way too weak')
    const hashedPw = await bcrpyt.hash(password, parseInt(process.env.HASH_ROUNDS))
    const user = new User({ email, password: hashedPw })
    await user.save()
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.status(201).json({
        success: true,
        message: 'You are successfully signed up',
        data: { token }
    })
})

export const signinHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error('Incorrect username or password')
    const isMatched = await bcrpyt.compare(password, user.password)
    if (!isMatched) throw new Error('Incorrect username or password')
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.status(200).json({
        success: true,
        message: 'You are successfully signed in',
        data: { token }
    })
})