import { Member } from "../models/Member.js"
import { regex } from "../validation/regex.js"
import { sendEmailFromServer } from "../utility/mailer.js"
import { uploadToCloudinary } from "../utility/cloudinary.js"
import { otpVerificationEmail, signupConfirmationEmail } from "../utility/emails.js"

import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"
import bcrpyt from "bcrypt"
import randomstring from "randomstring"
import QRCode from "qrcode"
import fs from "fs"

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
    sendEmailFromServer(email, 'Team New Sun Email Verification', otpVerificationEmail(otp))
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
    const path = `${email}.png`
    await QRCode.toFile(path, `${process.env.FRONTEND_DOMAIN}/members/${member._id}`)
    const url = await uploadToCloudinary(path, 'qr-codes')
    sendEmailFromServer(email, 'Team New Sun Joining Confirmation', signupConfirmationEmail(url))
    fs.unlinkSync(path)
    const token = jwt.sign({ _id: member._id }, process.env.TOKEN_SECRET, { expiresIn: '30d' })
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
    const token = jwt.sign({ _id: member._id }, process.env.TOKEN_SECRET, { expiresIn: '30d' })
    res.status(200).json({
        success: true,
        message: 'You are successfully signed in.',
        data: { token }
    })
})

export const authPersistenceHandler = catchAsync(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET)
    const member = await Member.findById(_id)
    res.status(200).json({
        success: true,
        message: 'You are authenticated',
        data: { member: member.toObject({ virtuals: true }) }
    })
})