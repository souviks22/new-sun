export const otpVerificationEmail = (name, otp) => (
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Verify Your Email</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: linear-gradient(to right, #f8fafc, #e2e8f0); font-family: 'Poppins', sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
      <tr>
        <td align="center" style="padding: 50px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; background: #ffffff; border-radius: 20px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Logo & Header -->
            <tr>
              <td align="center" style="padding: 40px 20px 20px;">
                <img src="https://res.cloudinary.com/dmoyqi6br/image/upload/v1744383550/new-sun/extras/logo_di2exf.png" alt="Organization Icon" width="80" height="80" style="border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"/>
                <h1 style="margin: 20px 0 0; font-size: 30px; color: #1e293b; font-weight: 700;">Team New Sun Foundation</h1>
                <p style="font-size: 18px; color: #ff6b00; font-weight: 600; margin: 6px 0 0;">Your Verification Code</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px 40px;">
                <p style="font-size: 16px; color: #334155;">Hi <strong>${name}</strong>,</p>
                <p style="font-size: 16px; color: #334155;">Thanks for showing interest in joining <strong>Team New Sun Foundation</strong>! To proceed, please use the following one-time verification code:</p>
                
                <!-- OTP Block -->
                <div style="text-align: center; margin: 40px 0;">
                  <div style="
                    display: inline-block;
                    background: linear-gradient(to right, #ff8c00, #ff6b00);
                    color: #fff;
                    font-size: 36px;
                    font-weight: bold;
                    padding: 20px 40px;
                    border-radius: 16px;
                    letter-spacing: 4px;
                    box-shadow: 0 6px 20px rgba(255, 108, 0, 0.3);">
                    ${otp}
                  </div>
                </div>

                <p style="font-size: 16px; color: #334155;">This code will expire in <strong>5 minutes</strong>. Please don’t share it with anyone for security reasons.</p>
                <p style="font-size: 16px; color: #64748b;">Didn’t request this? No problem — you can safely ignore this message.</p>

                <p style="font-size: 16px; color: #334155; margin-top: 30px;">Kind regards,<br /><strong>Team New Sun Foundation</strong></p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 25px; background-color: #f8fafc; color: #94a3b8; font-size: 13px;">
                &copy; ${new Date().getFullYear()} Team New Sun Foundation. All rights reserved.
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to TEAM NEW SUN FOUNDATION</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: linear-gradient(to right, #f8fafc, #e2e8f0); font-family: 'Poppins', sans-serif; color: #1e293b;">
    <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 700px; background: #ffffff; border-radius: 20px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Hero Section -->
            <tr>
              <td align="center" style="padding: 50px 30px 30px;">
                <img src="https://res.cloudinary.com/dmoyqi6br/image/upload/v1744383550/new-sun/extras/logo_di2exf.png" alt="Team Icon" width="90" height="90" style="border-radius: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.1);"/>
                <h1 style="margin: 25px 0 10px; font-size: 32px; font-weight: 700; color: #0f172a;">Welcome, ${name}!</h1>
                <p style="font-size: 20px; color: #ff6b00; font-weight: 600; margin: 0;">You're officially one of us 🎉</p>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 30px 40px;">
                <p style="font-size: 16px; color: #334155;">Thank you for registering with <strong>TEAM NEW SUN FOUNDATION</strong>. We're thrilled to welcome you to a community of changemakers working towards sustainability, equality, and a better future.</p>

                <p style="font-size: 16px; color: #334155;">Here’s your unique QR code for your profile:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <img src="${url}" alt="QR Code" style="width: 180px; height: auto; border: 4px solid #ff6b00; border-radius: 12px;" />
                </div>

                <p style="font-size: 16px; color: #334155;">As a valued member, you'll have the opportunity to:</p>
                <ul style="padding-left: 20px; color: #334155; font-size: 16px; line-height: 1.6;">
                  <li>Contribute to real social and environmental change</li>
                  <li>Join exciting projects and events</li>
                  <li>Collaborate with other passionate members</li>
                  <li>Learn and grow as a change leader</li>
                </ul>

                <div style="text-align: center; margin: 40px 0;">
                  <a href="https://teamnewsunfoundation.org" target="_blank" style="
                    background: linear-gradient(to right, #ff8c00, #ff6b00);
                    color: #fff;
                    text-decoration: none;
                    padding: 14px 28px;
                    font-size: 16px;
                    font-weight: bold;
                    border-radius: 30px;
                    display: inline-block;
                    box-shadow: 0 6px 20px rgba(255, 108, 0, 0.4);
                  ">Explore Opportunities</a>
                </div>

                <p style="font-size: 16px; color: #334155;">If you have any questions or need help, just reply to this email or reach out through our website. We're always here for you!</p>

                <p style="font-size: 16px; color: #334155;">Warm regards,<br/><strong>Team New Sun Foundation 🌞</strong></p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 25px; background-color: #f8fafc; color: #94a3b8; font-size: 13px;">
                &copy; ${new Date().getFullYear()} Team New Sun Foundation. All rights reserved.
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset OTP</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: #f0f4f8; font-family: 'Poppins', sans-serif;">
    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 50px 20px;">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); overflow: hidden;">
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #ffa500, #ff7e00); padding: 40px 20px;">
                <img src="https://res.cloudinary.com/dmoyqi6br/image/upload/v1744383550/new-sun/extras/logo_di2exf.png" alt="Team New Sun Foundation Logo" width="80" style="margin-bottom: 12px; border-radius: 50%;" />
                <h1 style="color: #ffffff; margin: 0; font-size: 40px; font-weight: 700;">TEAM NEW SUN FOUNDATION</h1>
                <p style="color: #fffbea; font-size: 20px; margin-top: 10px; font-weight: 500;">Reset Your Password Securely</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 30px 20px;">
                <p style="color: #333333; font-size: 18px; margin-top: 0;">Hi <strong>${name}</strong>,</p>
                <p style="color: #4f4f4f; font-size: 16px; line-height: 1.6;">
                  We received a request to reset your password for your TEAM NEW SUN FOUNDATION account.
                  Please use the One-Time Password (OTP) below to proceed:
                </p>
                <div style="margin: 30px 0; background: #fff3e0; border-radius: 10px; padding: 25px; text-align: center; border: 2px dashed #ff9800;">
                  <span style="font-size: 36px; font-weight: 700; color: #ff6f00; letter-spacing: 3px;">${otp}</span>
                </div>
                <p style="color: #757575; font-size: 15px; text-align: center;">
                  This OTP is valid for <strong>5 minutes</strong>. Please don’t share it with anyone.
                </p>
                <p style="color: #4f4f4f; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                  If you didn't request this reset, you can safely ignore this email.
                </p>
                <p style="color: #4f4f4f; font-size: 16px; margin-top: 20px;">
                  With care,<br/><strong>Team New Sun Foundation</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background: #f5f5f5; padding: 15px; font-size: 13px; color: #9e9e9e;">
                &copy; ${new Date().getFullYear()} TEAM NEW SUN FOUNDATION. All rights reserved.
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
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Donation Received - TEAM NEW SUN FOUNDATION</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      </style>
  </head>
  <body style="margin: 0; padding: 0; background: #f2f4f8; font-family: 'Poppins', sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          <tr>
              <td align="center" style="padding: 40px 20px;">
                  <table width="100%" style="max-width: 600px; background: #fff; border-radius: 16px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); overflow: hidden;">
                      <tr>
                          <td align="center" style="padding: 35px 25px 15px; background: linear-gradient(135deg, #4caf50, #2e7d32);">
                              <img src="https://res.cloudinary.com/dmoyqi6br/image/upload/v1744383550/new-sun/extras/logo_di2exf.png" alt="New Sun Foundation Logo" width="90" style="margin-bottom: 15px;" />
                              <h1 style="font-size: 36px; color: #fff; margin: 0; font-weight: 700;">Thank You, ${name}!</h1>
                              <p style="font-size: 20px; color: #e4e4e4; font-weight: 600; margin-top: 5px;">Your donation is making a real difference 💚</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 25px 30px; background: #f9f9f9;">
                              <p style="font-size: 18px; color: #444; text-align: center; font-weight: 600;">We deeply appreciate your generous contribution to <strong>TEAM NEW SUN FOUNDATION</strong>.</p>
                              <div style="background: linear-gradient(135deg, #43a047, #2e7d32); color: #fff; font-size: 28px; font-weight: 700; padding: 18px; border-radius: 10px; text-align: center; margin: 30px 0 20px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);">
                                  ₹${amount}
                              </div>
                              <p style="font-size: 14px; color: #666; text-align: center; margin: 0 0 25px;"><strong>Transaction ID:</strong> ${transactionId}</p>
                              <p style="font-size: 16px; color: #444; text-align: center; line-height: 1.6; font-weight: 500;">Your support is a key ingredient in helping us continue our mission to uplift lives and bring positive change to the world. Each rupee you contribute is a seed for a better tomorrow.</p>
                              <p style="font-size: 16px; color: #444; text-align: center; line-height: 1.6;">On behalf of <strong>TEAM NEW SUN FOUNDATION</strong>, we want to express our heartfelt thanks for being a part of our journey. 🌞</p>
                              <p style="font-size: 16px; color: #444; text-align: center;">With gratitude,<br /><strong>Team New Sun Foundation</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 20px; background: #f1f1f1; font-size: 14px; color: #777;">
                              <p style="font-size: 14px; color: #2e7d32; margin-top: 10px;">
                                  Have questions? Reach out to us at 
                                  <a href="mailto:contact@teamnewsunfoundation.org" style="color: #2e7d32; text-decoration: none;">contact@teamnewsunfoundation.org</a>
                              </p>
                              <p>© ${new Date().getFullYear()} TEAM NEW SUN FOUNDATION. All rights reserved.</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`
)


export const contributionReceivedEmail = (name, amount, startDate, endDate, transactionId) => (
  `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Thank You - Team New Sun Foundation</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      </style>
  </head>
  <body style="margin: 0; padding: 0; background: #e8f5e9; font-family: 'Poppins', sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
              <td align="center" style="padding: 40px 16px;">
                  <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background: #ffffff; border-radius: 20px; box-shadow: 0 12px 32px rgba(0,0,0,0.08); overflow: hidden;">
                      
                      <!-- Header -->
                      <tr>
                          <td align="center" style="background: linear-gradient(135deg, #2e7d32, #66bb6a); padding: 32px 24px;">
                              <img src="https://res.cloudinary.com/dmoyqi6br/image/upload/v1744383550/new-sun/extras/logo_di2exf.png" alt="Team New Sun Foundation Logo" width="80" style="margin-bottom: 12px; border-radius: 50%;" />
                              <h1 style="color: #ffffff; font-size: 26px; margin: 0; font-weight: 700;">TEAM NEW SUN FOUNDATION</h1>
                              <p style="color: #e8f5e9; font-size: 16px; margin: 10px 0 0;">We’ve received your contribution 🌱</p>
                          </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                          <td style="padding: 32px 24px;">
                              <p style="font-size: 18px; color: #2e7d32; margin: 0;">Hi ${name},</p>
                              <p style="font-size: 16px; color: #444; line-height: 1.6; margin-top: 16px;">
                                  Your generous contribution of 
                                  <strong style="color: #2e7d32;">₹${amount}</strong> 
                                  has been received with immense gratitude.<br>
                                  ${startDate !== endDate
                                  ? `It will support our mission from <strong>${startDate}</strong> to <strong>${endDate}</strong>.`
                                  : `It will support our mission for the month of <strong>${startDate}</strong>.`}
                              </p>

                              <!-- Amount Card -->
                              <div style="margin-top: 28px; text-align: center;">
                                  <div style="display: inline-block; background: #1b5e20; padding: 20px 36px; border-radius: 16px;">
                                      <p style="color: #ffffff; font-size: 30px; margin: 0; font-weight: 600;">₹${amount}</p>
                                  </div>
                              </div>

                              <!-- Transaction ID -->
                              <div style="margin-top: 24px; text-align: center;">
                                  <span style="display: inline-block; background: #e0f2f1; color: #00796b; font-size: 14px; font-weight: 500; padding: 8px 16px; border-radius: 30px;">
                                      Transaction ID: ${transactionId}
                                  </span>
                              </div>

                              <!-- Message -->
                              <p style="font-size: 16px; color: #555555; margin-top: 32px; line-height: 1.6;">
                                  Your support fuels our mission to bring light, hope, and positive change.<br>
                                  Every rupee is a seed for a better tomorrow.
                              </p>

                              <p style="font-size: 16px; color: #555555; line-height: 1.6;">
                                  Thank you for believing in us. You're not just a donor — you're part of a growing family that believes in making a real difference 🌍
                              </p>

                              <p style="font-size: 16px; color: #2e7d32; margin-top: 32px;">
                                  With gratitude,<br/>
                                  <strong>Team New Sun Foundation</strong>
                              </p>
                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td style="background: #f1f8e9; padding: 24px; text-align: center; border-top: 1px solid #dcedc8;">
                              <p style="font-size: 13px; color: #607d8b; margin: 0;">
                                  Have questions? Reach out to us at 
                                  <a href="mailto:contact@teamnewsunfoundation.org" style="color: #2e7d32; text-decoration: none;">contact@teamnewsunfoundation.org</a>
                              </p>
                              <p style="font-size: 12px; color: #607d8b; margin-top: 10px;">
                                  © ${new Date().getFullYear()} TEAM NEW SUN FOUNDATION. All rights reserved.
                              </p>
                          </td>
                      </tr>

                  </table>
              </td>
          </tr>
      </table>

  </body>
  </html>`
)