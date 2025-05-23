import cors from "cors"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"

import { authRouter } from "../routers/auth.router.js"
import { contributionRouter } from "../routers/contribution.router.js"
import { donationRouter } from "../routers/donation.router.js"
import { feedbackRouter } from "../routers/feedback.router.js"
import { memberRouter } from "../routers/member.router.js"
import { paymentRouter } from "../routers/payment.router.js"
import { queryRouter } from "../routers/query.router.js"

const app = express()
process.env.NODE_ENV !== 'production' && process.loadEnvFile()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected'))
    .catch(console.error)

app.use(express.json())
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_DOMAIN : 'http://localhost:3000' }))
app.use(morgan('dev'))
app.use(helmet())
app.use('/', authRouter)
app.use('/members', memberRouter)
app.use('/contributions', contributionRouter)
app.use('/feedbacks', feedbackRouter)
app.use('/queries', queryRouter)
app.use('/payments', paymentRouter)
app.use('/donate', donationRouter)
app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the API'
    })
})

app.get('*', (_req, res) => {
    res.status(404).json({
        success: false,
        message: 'No such API route'
    })
})

app.listen(process.env.PORT, () => console.log(`Server is active ${process.env.PORT}`))