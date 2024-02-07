import cors from 'cors'
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRouter from "../routers/auth.router.js"
import userRouter from "../routers/user.router.js"
const app = express()
dotenv.config()
app.use(cors())
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected'))
    .catch(() => console.log('Failed to Connect to Database'))
// .catch(error => console.log(error))

app.use(express.json())
app.use('/', authRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT, () => console.log('Server in On'))