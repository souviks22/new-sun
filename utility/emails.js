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
                  <h1 style="color: #000000; margin: 0; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">TEAM NEW SUN FOUNDATION</h1>
                  <p style="color: #ff8c00; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-top: 5px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);">Email Verification Code</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 20px;">
                  <p style="color: #333333; font-size: 18px; margin-top: 0;">Hello ${name},</p>
                  <p style="color: #333333; font-size: 18px;">Thank you for your interest to join TEAM NEW SUN FOUNDATION! To complete your registration, please use the following verification code:</p>
                  <div style="background-color: #ff8c00; color: #ffffff; font-size: 36px; font-weight: bold; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);">
                    <p style="margin: 0;">${otp}</p>
                  </div>
                  <p style="color: #333333; font-size: 18px; margin-top: 20px;">Please note that the code will expire in 5 minutes.</p>
                  <p style="color: #333333; font-size: 18px;">If you did not request this code, please disregard this email.</p>
                  <p style="color: #333333; font-size: 18px;">Thank you,<br>TEAM NEW SUN FOUNDATION </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`
)

export const signupConfirmationEmail = (name, url) => (
  `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to TEAM NEW SUN FOUNDATION</title>
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
                  <h1 style="color: #000000; margin: 0; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">Welcome to TEAM NEW SUN FOUNDATION</h1>
                  <p style="color: #ff8c00; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-top: 5px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);">Your membership is confirmed!</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 20px;">
                  <p style="color: #333333; font-size: 18px; margin-top: 0;">Hello,</p>
                  <p style="color: #333333; font-size: 18px;">Thank you for joining TEAM NEW SUN FOUNDATION! Your registration is successful.</p>
                  <p style="color: #333333; font-size: 18px;">As a member, here is your unique QR code for your profile:</p>
                  <div style="text-align: center;">
                    <img src="${url}" alt="QR Code" style="max-width: 100%; height: auto;">
                  </div>
                  <p style="color: #333333; font-size: 18px;">TEAM NEW SUN FOUNDATION is a dedicated organisation to promote sustainable development, environmental conservation, and social justice. Our goal is to create a better world by empowering communities and fostering collaboration among individuals, organizations, and businesses.</p>
                  <p style="color: #333333; font-size: 18px;">We are excited to have you on board and look forward to collaborating with you to achieve our shared goals. Together, we can make a positive impact and create a brighter future for all.</p>
                  <p style="color: #333333; font-size: 18px; margin-top: 20px;">If you have any questions or need further assistance, feel free to contact us.</p>
                  <p style="color: #333333; font-size: 18px;">Thank you for your support!</p>
                  <p style="color: #333333; font-size: 18px;">Best regards,<br>TEAM NEW SUN FOUNDATION</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`
)

export const forgetOtpEmail = (name, otp) => (
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Code</title>
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
                <h1 style="color: #000000; margin: 0; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">TEAM NEW SUN FOUNDATION</h1>
                <p style="color: #ff8c00; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-top: 5px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);">Password Reset Request</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 20px;">
                <p style="color: #333333; font-size: 18px; margin-top: 0;">Hello ${name},</p>
                <p style="color: #333333; font-size: 18px;">You have requested to reset your password for your account on TEAM NEW SUN FOUNDATION! To proceed with the password reset, please use the following One-Time Password (OTP):</p>
                <div style="background-color: #ff8c00; color: #ffffff; font-size: 36px; font-weight: bold; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);">
                  <p style="margin: 0;">${otp}</p>
                </div>
                <p style="color: #333333; font-size: 18px; margin-top: 20px;">Please note that the code will expire in 5 minutes.</p>
                <p style="color: #333333; font-size: 18px;">If you did not request this code, please disregard this email.</p>
                <p style="color: #333333; font-size: 18px;">Thank you,<br>TEAM NEW SUN FOUNDATION </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`
)
export const donationReceivedEmail = (name, amount, transactionId) => (
  `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Received - TEAM NEW SUN FOUNDATION</title>
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
                              <h1 style="color: #000000; margin: 0; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">TEAM NEW SUN FOUNDATION</h1>
                              <p style="color: #28a745; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-top: 5px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);">Donation Received!</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 0 20px;">
                              <p style="color: #333333; font-size: 18px; margin-top: 0;">Dear ${name},</p>
                              <p style="color: #333333; font-size: 18px;">Thank you so much for your generous donation to TEAM NEW SUN FOUNDATION! We truly appreciate your support.</p>
                              <div style="background-color: #28a745; color: #ffffff; font-size: 28px; font-weight: bold; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);">
                                  <p style="margin: 0;">₹${amount}</p>
                              </div>
                              ${transactionId ? `<p style="color: #333333; font-size: 16px; margin-top: 20px;">Transaction ID: ${transactionId}</p>` : ''}
                              <p style="color: #333333; font-size: 18px; margin-top: 20px;">Your contribution will make a significant difference in helping us achieve our mission at TEAM NEW SUN FOUNDATION. We are committed to using your donation effectively to support our cause.</p>
                              <p style="color: #333333; font-size: 18px;">Thank you once again for your kindness and generosity.</p>
                              <p style="color: #333333; font-size: 18px;">Sincerely,<br>TEAM NEW SUN FOUNDATION</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`
);

export const contributionReceivedEmail = (name, amount, startDate, endDate, transactionId) => {
  const formattedStartDate = new Date(startDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const formattedEndDate = new Date(endDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  return (`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contribution Received - TEAM NEW SUN FOUNDATION</title>
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
                              <h1 style="color: #000000; margin: 0; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">TEAM NEW SUN FOUNDATION</h1>
                              <p style="color: #28a745; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-top: 5px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);">Contribution Received!</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 0 20px;">
                              <p style="color: #333333; font-size: 18px; margin-top: 0;">Dear ${name},</p>
                              <p style="color: #333333; font-size: 18px;">Thank you so much for your generous contribution to TEAM NEW SUN FOUNDATION! We truly appreciate your ongoing support.</p>
                              <div style="background-color: #28a745; color: #ffffff; font-size: 28px; font-weight: bold; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);">
                                  <p style="margin: 0;">₹${amount}</p>
                              </div>
                              ${formattedStartDate != formattedEndDate ? `<p style="color: #333333; font-size: 16px; margin-top: 20px;">This contribution is for the period of <strong>${formattedStartDate}</strong> to <strong>${formattedEndDate}</strong>.</p>` : `This contribution is for <strong>${formattedStartDate}</strong></p>`}
                              ${transactionId ? `<p style="color: #333333; font-size: 16px; margin-top: 10px;">Transaction ID: ${transactionId}</p>` : ''}
                              <p style="color: #333333; font-size: 18px; margin-top: 20px;">Your continued support makes a significant difference in helping us achieve our mission at TEAM NEW SUN FOUNDATION. We are committed to using your contributions effectively to support our cause throughout this period.</p>
                              <p style="color: #333333; font-size: 18px;">Thank you once again for your kindness and generosity.</p>
                              <p style="color: #333333; font-size: 18px;">Sincerely,<br>TEAM NEW SUN FOUNDATION</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`
  );
};