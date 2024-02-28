import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import { authRouter } from "../routers/auth.router.js"
import { contributionRouter } from "../routers/contribution.router.js"
import { feedbackRouter } from "../routers/feedback.router.js"
import { memberRouter } from "../routers/member.router.js"

const app = express()
dotenv.config()
app.use(cors())
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected'))
    .catch(() => console.log('Failed to Connect to Database'))
// .catch(error => console.log(error))

app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_DOMAIN }))
app.use('/', authRouter)
app.use('/members', memberRouter)
app.use('/contributions', contributionRouter)
app.use('/feedbacks', feedbackRouter)

app.listen(process.env.PORT, () => console.log('Server is On'))