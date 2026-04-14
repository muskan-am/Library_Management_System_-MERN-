import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",   
    port: 587,              
    secure: false,         
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    });
  } catch (error) {
    console.log("Email Error: ", error);
    throw error;
  }
};