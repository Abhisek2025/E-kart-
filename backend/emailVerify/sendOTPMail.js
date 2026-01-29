import nodemailer from "nodemailer";
import "dotenv/config";

export const sendOTPMail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family:4,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Your OTP for resetting your password is:</p>
          <h3 style="color: #2e86de;">${otp}</h3>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn’t request this, please ignore this email.</p>
          <br/>
          <p>Thanks,<br/>Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailConfigurations);
    console.log("✅ OTP email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};
