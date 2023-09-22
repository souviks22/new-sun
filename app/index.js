import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRouter from "../routers/authRouter.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected'))
    .catch((error) => {
        console.error('Failed to Connect to Database');
        console.error(error);
     } // Print the error for debugging purposes
    )

app.use(express.json())
app.use('/', authRouter)

app.listen(process.env.PORT, () => console.log('Server in On'))