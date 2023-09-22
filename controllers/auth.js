import User from "../models/User.js"
import catchAsync from "../errors/async.js"
import jwt from "jsonwebtoken"
import bcrpyt from "bcrypt"

export const signupHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const isUserPresent = await User.findOne({ email })
    if (isUserPresent) throw new Error('You are already Registered. You can Sign In now.')
    const user = new User({ email, password })
    await user.save()
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.status(201).json({
        success: true,
        message: 'User Successfully Signed Up',
        data: { token }
    })
})

export const signinHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error('You are not Registered. Please Sign Up first.')
    const { _id, password: realPassword } = user
    if (!bcrpyt.compare(realPassword, password)) throw new Error('Incorrect Username or Password')
    const token = jwt.sign({ _id }, process.env.TOKEN_SECRET)
    res.status(200).json({
        success: true,
        message: 'User Successfully Signed In',
        data: { token }
    })
})