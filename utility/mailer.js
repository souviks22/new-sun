import nodemailer from "nodemailer"

process.env.NODE_ENV !== 'production' && process.loadEnvFile()

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: '465',
    secure: true,
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