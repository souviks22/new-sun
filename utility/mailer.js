import FormData from "form-data"
import Mailgun from "mailgun.js"

process.env.NODE_ENV !== 'production' && process.loadEnvFile()

export const sendEmailFromServer = async (email, subject, message, attachments = []) => {
    const mailgun = new Mailgun(FormData)
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAIL_API_KEY
    })
    try {
        await mg.messages.create('teamnewsunfoundation.org', {
            from: 'TNS Foundation<no-reply@teamnewsunfoundation.org>',
            to: `You <${email}>`,
            subject,
            html: message,
            'h:X-Priority': 1,

            attachment: attachments,
        })
    } catch (error) {
        console.error(error)
    }
}
