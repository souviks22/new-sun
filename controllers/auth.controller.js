import { Member } from "../models/Member.js"
import { uploadStreamToCloudinary, uploadToCloudinary } from "../utility/cloudinary.js"
import { forgetOtpEmail, otpVerificationEmail, signupConfirmationEmail } from "../utility/emails.js"
import { sendEmailFromServer } from "../utility/mailer.js"
import { regex } from "../validation/regex.js"

import bcrpyt from "bcrypt"
import fs from "fs"
import jwt from "jsonwebtoken"
import QRCode from "qrcode"
import randomstring from "randomstring"
import catchAsync from "../errors/async.js"

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
        image: req.file,
        createdAt: Date.now()
    }
    sendEmailFromServer(email, 'Team New Sun Email Verification', otpVerificationEmail(req.body.firstname, otp))
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
    const image = await uploadStreamToCloudinary(authBuffer[email].image?.buffer, 'member-profiles', email)
    const member = new Member({ ...authBuffer[email].details, image })
    await member.save()
    const path = `${email}.png`
    await QRCode.toFile(path, `${process.env.FRONTEND_DOMAIN}/members/${member._id}`)
    const qrCode = await uploadToCloudinary(path, 'qr-codes')
    sendEmailFromServer(email, 'Team New Sun Joining Confirmation', signupConfirmationEmail(member.firstname, qrCode.url))
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

export const generateOTPHandler = catchAsync(async (req, res) => {
    const { email } = req.body;
    const member = await Member.findOne({ email })
    if (!member) throw new Error('You are not registered. Kindly Sign Up!!')
    const name = member.firstname;
    const otp = randomstring.generate({ length: 6, charset: 'numeric' })
    authBuffer[email] = {
        otp,
        otpVerified: false
    }
    sendEmailFromServer(email, 'RESET PASSWORD', forgetOtpEmail(name, otp))
    res.status(200).json({
        success: true,
        message: 'OTP is successfully sent to your email address.'
    })
})

export const verifyOTPHandler = catchAsync(async (req, res) => {
    const { email, otp } = req.body
    if (!authBuffer[email]) throw new Error('We do not have any request for reset password')
    if (authBuffer[email].otp !== otp) throw new Error('Incorrect OTP')
    const member = await Member.findOne({ email: email.toLowerCase() })
    const _id = member._id
    authBuffer[email] = {
        ...authBuffer[email],
        otpVerified: true
    }
    res.status(200).json({
        success: true,
        message: 'OTP is verified.',
        data: { _id }
    })
})

export const resetPasswordHandler = catchAsync(async (req, res) => {
    const { email, _id, password } = req.body;
    if (!authBuffer[email].otpVerified) throw new Error("Your email is not verified")
    if (!regex.password.test(password)) throw new Error('Your password is way too weak.')
    const member = await Member.findById(_id);
    if (!member) throw new Error('Member not found.')
    const isMatched = await bcrpyt.compare(password, member.password)
    if (isMatched) throw new Error("Current Password and New Password should be different.")
    const hashedPw = await bcrpyt.hash(password, parseInt(process.env.HASH_ROUNDS))

    const updated = await Member.findByIdAndUpdate(_id, { "password": hashedPw }, { runValidators: true })
    res.status(201).json({
        success: true,
        message: '',
    })
})