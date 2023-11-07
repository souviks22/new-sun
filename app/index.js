import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "../routers/authRouter.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected'))
    .catch(() => console.log('Failed to Connect to Database'))
    // .catch(error => console.log(error))

app.use(express.json())
app.use('/', authRouter)

app.listen(process.env.PORT, () => console.log('Server in On'))