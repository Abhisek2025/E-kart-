import nodemailer from "nodemailer";
import "dotenv/config";

// Function to send verification email
export const verifyEmail = async (token, email) => {
  try {
    // 1️⃣ Create transporter using Gmail SMTP
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

    // 2️⃣ Email configuration
    const mailConfigurations = {
      from: process.env.MAIL_USER, // sender
      to: email, // receiver
      subject: "Email Verification",

      // Email body
      text: `Hi there 👋,

You recently registered on our website.

Please click the link below to verify your email address:
http://localhost:5173/verify/${token}

If you did not request this, please ignore this email.

Thanks,
Team`,
    };

    // 3️⃣ Send email
    await transporter.sendMail(mailConfigurations);

    console.log("✅ Verification email sent successfully");
  } catch (error) {
    // ❌ Do NOT crash server if email fails
    console.error("❌ Email sending failed:", error.message);
  }
};
