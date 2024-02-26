export const otpVerificationEmail = otp => (
    `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
    </head>
    
    <body>
        <style>
            .heading {
                text-align: center;
            }
    
            .otp {
                background-color: #ff6a07;
                font-weight: 700;
                text-align: center;
                padding: 2rem;
            }
        </style>
        <div>
            <h4 class="heading">Thank you for your interest in Team New Sun. Your email verification code is:</h4>
            <h1 class="otp">${otp}</h1>
        </div>
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