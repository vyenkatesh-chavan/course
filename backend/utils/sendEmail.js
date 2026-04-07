import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, link, name = "User") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 🎨 Professional HTML Email Template
  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; text-align: center;">
      
      <h2 style="color: #333;">Welcome to Women Empowerment Platform 🌸</h2>
      
      <p style="color: #555; font-size: 14px;">
        Hello <b>${name}</b>,
      </p>

      <p style="color: #555; font-size: 14px;">
        Thank you for registering. Please verify your email to continue.
      </p>

      <a href="${link}" 
         style="display: inline-block; margin: 20px 0; padding: 12px 20px; 
                background-color: #28a745; color: white; text-decoration: none; 
                border-radius: 5px; font-weight: bold;">
        Verify Email
      </a>

      <p style="font-size: 12px; color: #999;">
        If you did not create this account, you can safely ignore this email.
      </p>

      <hr />

      <p style="font-size: 12px; color: #aaa;">
        © 2026 Women Empowerment Platform
      </p>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Women Empowerment" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};