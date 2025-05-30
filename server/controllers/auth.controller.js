require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;  

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user.UserId, role: user.RoleId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
    );
    const refreshToken = jwt.sign(
        { id: user.UserId, role: user.RoleId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '4h' }
    );
    return { accessToken, refreshToken };
}

exports.register = async (req, res) => {
    const { Email, Password, FullName, RoleId } = req.body;
    try {
        const existingUser = await User.findOne({ where: { Email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại.' });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        await User.create({
            Email: Email,
            Password: hashedPassword,
            FullName: FullName,
            RoleId: RoleId,
            CreatedAt: new Date()
        });
        
        return res.status(201).json({ message: 'Người dùng đã đăng ký thành công', user: { Email, FullName, RoleId } });
    } catch (error) {
        return res.status(500).json({ message: 'Không thể kết nối tới máy chủ.', error });
    }
}

exports.login = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
        }
        const { accessToken, refreshToken} = generateTokens(user);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 4 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: 'Login successful', accessToken, user: {
                id: user.UserId,
                email: user.Email,
                name: user.FullName,
                role: user.RoleId
            } });
    } catch (error) {
        return res.status(500).json({ message: 'Không thể kết nối tới máy chủ.', error });
    }
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const newAccessToken = jwt.sign(
            { id: user.UserId, role: user.RoleId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        );
        return res.status(200).json({ accessToken: newAccessToken });
    });
}

exports.logout = async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
}

exports.changePassword = async (req, res) => {
    const { Email, OldPassword, NewPassword } = req.body;
    try {
        const user = await User.findOne({ where: { Email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(OldPassword, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
       
        const hashedPassword = await bcrypt.hash(NewPassword, 10);
        await user.update({ Password: hashedPassword });
   
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error changing password', error });
    }
}
