import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS
    }
})

export const sendEmailFromServer = ((email, subject, message) => {
    transporter.sendMail({
        from: process.env.MAIL_ID,
        to: email,
        priority: 'high',
        subject,
        html: message
    })
})