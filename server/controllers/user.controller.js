require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.getMe = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Không có mã thông báo được cung cấp" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await db.User.findByPk(decoded.id, {
      attributes: ["FullName", "RoleId"],
    });
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Mã thông báo không hợp lệ" });
  }
};
