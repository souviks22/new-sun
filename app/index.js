import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected'))
    .catch(() => console.log('Failed to Connect to Database'))

app.use(express.json())

app.listen(process.env.PORT, () => console.log('Server in On'))