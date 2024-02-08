import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import { authRouter } from "../routers/auth.router.js"
import { memberRouter } from "../routers/member.router.js"
import { contributionRouter } from "../routers/contribution.router.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected'))
    .catch(() => console.log('Failed to Connect to Database'))
// .catch(error => console.log(error))

app.use(express.json())
app.use('/', authRouter)
app.use('/members', memberRouter)
app.use('/contributions', contributionRouter)

app.listen(process.env.PORT, () => console.log('Server in On'))