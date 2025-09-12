import FormData from "form-data"
import Mailgun from "mailgun.js"

process.env.NODE_ENV !== 'production' && process.loadEnvFile()

export const sendEmailFromServer = async (email, subject, message) => {
    const mailgun = new Mailgun(FormData)
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAIL_API_KEY
    })
    try {
        await mg.messages.create('sandboxec2a21d381694bfeb9c2d9d8668fc408.mailgun.org', {
            from: 'TNSF Admin <postmaster@sandboxec2a21d381694bfeb9c2d9d8668fc408.mailgun.org>',
            to: `You <${email}>`,
            subject,
            html: message
        })
    } catch (error) {
        console.error(error)
    }
}
