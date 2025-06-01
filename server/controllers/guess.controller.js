require("dotenv").config();
const db = require("../models");
const nodemailer = require("nodemailer");
const Contact = db.Contact;

exports.createContact = async (req, res) => {
  const { Name, Phone, Email, Message } = req.body;
  try {
    await Contact.create({
      Name: Name,
      Phone: Phone,
      Email: Email,
      Message: Message,
      CreatedAt: new Date(),
    });

    // Gửi email cho admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"GIA BẢO FORKLIFT" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Liên hệ mới từ website",
      text: `Tên: ${Name}\nSố điện thoại: ${Phone}\nEmail: ${Email}\nNội dung: ${Message}`,
    });

    res.json({ success: true, message: "Đã gửi liên hệ thành công" });
  } catch (err) {
    res.status(500).json({ message: "Không thể kết nối tới máy chủ." });
  }
};
