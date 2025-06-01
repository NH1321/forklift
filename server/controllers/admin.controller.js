require("dotenv").config();
const db = require("../models");
const Contact = db.Contact;

exports.getContact = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Không thể kết nối tới máy chủ." });
  }
};
