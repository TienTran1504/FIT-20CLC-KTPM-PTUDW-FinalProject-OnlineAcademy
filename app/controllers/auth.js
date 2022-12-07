import dotenv from 'dotenv'
dotenv.config()
import User from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// {{URL}}/auth/register
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name,email, password and otp')
    }
    else {
        const user = await User.create({ ...req.body });
        res.status(StatusCodes.CREATED).json({
            user: { userId: user._id, email: user.email, name: user.name, gender: user.gender, permission: user.permission }
        });
    }
}
// {{URL}}/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
    //check email, password 
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })

    //check exists email
    if (!user) {
        throw new UnauthenticatedError("Invalid email credentials");
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid password credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { id: user.id, name: user.name, permission: user.permission, msg: "Login successfully" },
        token
    });
}
export {
    register,
    login,
}


//flow
/* 
B1: tạo tài khoản -> req.body sẽ yêu cầu tạo tài khoản
B2: đăng nhập tài khoản -> check người dùng đã nhập tài khoản, password -> tìm tài khoản có email trùng với email đã nhập
    -> check password email đó nhập đúng chưa -> nếu đăng nhập thành công sẽ tạo token riêng để quản lý tài khoản đăng nhập lúc đó

    */
