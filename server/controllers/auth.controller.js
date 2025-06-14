require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const sendMail = require("../utils/mailer.util");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.UserId, role: user.RoleId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
  const refreshToken = jwt.sign(
    { id: user.UserId, role: user.RoleId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "4h" }
  );
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  const { Email, Password, FullName, RoleId } = req.body;
  try {
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    await User.create({
      Email: Email,
      Password: hashedPassword,
      FullName: FullName,
      RoleId: RoleId,
      CreatedAt: new Date(),
    });

    return res.status(201).json({
      message: "Người dùng đã đăng ký thành công",
      user: { Email, FullName, RoleId },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Không thể kết nối tới máy chủ.", error });
  }
};

exports.login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không hợp lệ" });
    }
    const { accessToken, refreshToken } = generateTokens(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 4 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken,
      user: {
        FullName: user.FullName,
        RoleId: user.RoleId,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Không thể kết nối tới máy chủ.", error });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const newAccessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      return res.status(200).json({ accessToken: newAccessToken });
    }
  );
};

exports.logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

exports.changePassword = async (req, res) => {
  const { Email, OldPassword, NewPassword } = req.body;
  try {
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    const isMatch = await bcrypt.compare(OldPassword, user.Password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không hợp lệ" });
    }

    const hashedPassword = await bcrypt.hash(NewPassword, 10);
    await user.update({ Password: hashedPassword });

    return res
      .status(200)
      .json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Không thể kết nối tới máy chủ.", error });
  }
};

exports.googleCallback = (req, res) => {
  const jwt = require("jsonwebtoken");
  const user = req.user;

  const { accessToken, refreshToken } = generateTokens(user);
  // Lưu refreshToken vào HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 4 * 60 * 60 * 1000, // 4 giờ
  });
  // Redirect về FE chỉ kèm accessToken
  res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${accessToken}`);
};

exports.forgotPassword = async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng với email này." });
    }
    const token = jwt.sign(
      { id: user.UserId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await sendMail(
      Email,
      "Khôi phục mật khẩu",
      `<p>Bạn vừa yêu cầu đặt lại mật khẩu. Nhấn vào link sau để đặt lại mật khẩu:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Link này sẽ hết hạn sau 10 phút.</p>`
    );
    return res
      .status(200)
      .json({ message: "Đã gửi email khôi phục mật khẩu." });
  } catch (error) {
    return res.status(500).json({ message: "Không thể gửi email.", error });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 8 ký tự." });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ Password: hashedPassword });
    return res.status(200).json({ message: "Đặt lại mật khẩu thành công." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn.", error });
  }
};
