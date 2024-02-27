export const otpVerificationEmail = (name, otp) => (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification Code</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
      </style>
    </head>
    <body style="background-color: #f7f7f7; margin: 0; padding: 0; font-family: 'Poppins', sans-serif;">
      <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table cellpadding="0" cellspacing="0" width="90%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <h1 style="color: #000000; margin: 0; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">Team New Sun</h1>
                  <p style="color: #ff8c00; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-top: 5px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);">Email Verification Code</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 20px;">
                  <p style="color: #333333; font-size: 18px; margin-top: 0;">Hello ${name},</p>
                  <p style="color: #333333; font-size: 18px;">Thank you for signing up to Team New Sun! To complete your registration, please use the following verification code:</p>
                  <div style="background-color: #ff8c00; color: #ffffff; font-size: 36px; font-weight: bold; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);">
                    <p style="margin: 0;">${otp}</p>
                  </div>
                  <p style="color: #333333; font-size: 18px; margin-top: 20px;">Please note that the code will expire in 5 minutes.</p>
                  <p style="color: #333333; font-size: 18px;">If you did not request this code, please disregard this email.</p>
                  <p style="color: #333333; font-size: 18px;">Thank you,<br>Team New Sun</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`
)

export const signupConfirmationEmail = url => (
    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signup Confirmation</title>
    </head>
    
    <body>
        <style>
            .heading {
                text-align: center;
            }
    
            .cover {
                background-color: #ff6a07;
                padding: 2rem;
                display: flex;
                justify-content: center;
            }
    
            .qr-code {
                width: 90%;
            }
        </style>
        <div>
            <h4 class="heading">Welcome to Team New Sun. You are successfully signed up. Find below the QRCode to your
                member account:</h4>
            <div class="cover">
                <img class="qr-code"
                    src=${url}>
            </div>
        </div>
    </body>
    
    </html>`
)