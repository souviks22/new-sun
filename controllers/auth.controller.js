import { Member } from "../models/Member.js"
import { regex } from "../validation/regex.js"

import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"
import bcrpyt from "bcrypt"

export const signupHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    if (!regex.password.test(password)) throw new Error('Your password is way too weak.')
    const hashedPw = await bcrpyt.hash(password, parseInt(process.env.HASH_ROUNDS))
    const member = new Member({ ...req.body, email: email.toLowerCase(), password: hashedPw })
    await member.save()
    const token = jwt.sign({ _id: member._id }, process.env.TOKEN_SECRET, { expiresIn: '365d' })
    res.status(201).json({
        success: true,
        message: 'You are successfully signed up.',
        data: { token }
    })
})

export const signinHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const member = await Member.findOne({ email: email.toLowerCase() })
    if (!member) throw new Error('Your email or password is/are inaccurate.')
    const isMatched = await bcrpyt.compare(password, member.password)
    if (!isMatched) throw new Error('Your email or password is/are inaccurate.')
    const token = jwt.sign({ _id: member._id }, process.env.TOKEN_SECRET)
    res.status(200).json({
        success: true,
        message: 'You are successfully signed in.',
        data: { token }
    })
})