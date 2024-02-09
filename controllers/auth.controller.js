import { Member } from "../models/Member.js"
import { regex } from "../validation/regex.js"

import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"
import bcrpyt from "bcrypt"
import nodemailer from "nodemailer"
import randomstring from "randomstring"

const authBuffer = {}
const OTP_EXPIRATION_TIME = 5 * 60 * 1000

export const signupInitiationHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const memberDoesExist = await Member.findOne({ email })
    if (memberDoesExist) throw new Error('You are already registered.')
    if (!regex.email.test(email)) throw new Error('Your email is invalid.')
    if (!regex.password.test(password)) throw new Error('Your password is way too weak.')
    const hashedPw = await bcrpyt.hash(password, parseInt(process.env.HASH_ROUNDS))
    const otp = randomstring.generate({ length: 6, charset: 'numeric' })
    authBuffer[email] = {
        otp,
        details: { ...req.body, password: hashedPw },
        createdAt: Date.now()
    }
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS
        }
    })
    transporter.sendMail({
        from: process.env.MAIL_ID,
        to: email,
        priority: 'high',
        subject: 'Team New Sun Email Verification',
        text: `Thank you for your interest in Team New Sun. Your email verification code is ${otp}`
    })
    res.status(200).json({
        success: true,
        message: 'OTP is successfully sent to your email address.'
    })
})

export const signupVerificationHandler = catchAsync(async (req, res) => {
    const { email, otp } = req.body
    if (!authBuffer[email]) throw new Error('We do not have your email waiting for signup.')
    if (authBuffer[email].otp !== otp) throw new Error('Your verification code is inaccurate.')
    if (Date.now() - authBuffer[email].createdAt > OTP_EXPIRATION_TIME) throw new Error('Your verification code is expired')
    const member = new Member(authBuffer[email].details)
    await member.save()
    const token = jwt.sign({ _id: member._id }, process.env.TOKEN_SECRET, { expiresIn: '365d' })
    res.status(200).json({
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