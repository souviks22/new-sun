import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import catchAsync from "../errors/async.js"
import User from "../models/User.js"

export const signupHandler = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const isUserPresent = await User.findOne({ email })
    if (isUserPresent) throw new Error('You are already Registered. You can Sign In now.')
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, hashedPassword })

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
    if (!bcrypt.compare(realPassword, password)) throw new Error('Incorrect Username or Password')
    const token = jwt.sign({ _id }, process.env.TOKEN_SECRET)
    res.status(200).json({
        success: true,
        message: 'User Successfully Signed In',
        data: { token }
    })
})