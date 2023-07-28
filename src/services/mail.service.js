import nodemailer from 'nodemailer';

const resetPassword = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  return transporter.sendMail({
    from: 'your-email@example.com',
    to: email,
    subject: 'Reset Password',
    html: `
      <h1>Reset Password</h1>
      <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
      <a href="${process.env.APP_URL}/auth/password">Reset Password</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
  });
};

export default {
  resetPassword,
};
