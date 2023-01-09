import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import User from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();

const formRegister = async function (req, res, next) {
    res.render('vwAccount/register', {
        CatList: req.session.CatList,
        custom_style: "register.css",
    });
}

const formLogin = async function (req, res, next) {
    res.render('vwAccount/login', {
        CatList: req.session.CatList,
        custom_style: "login.css",
    });
}

const num = Math.floor((Math.random() * (999999 - 100000)) + 100000);
const OTP = num.toString();

const sendMail = async (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({ // config mail server
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: process.env.MAIL_ADD, //Tài khoản gmail vừa tạo
                pass: process.env.MAIL_PASS //Mật khẩu tài khoản gmail vừa tạo
            }
        });
        const content = `Please use the verification code below on the ONLINE ACADEMY website: ${OTP} `;


        const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: process.env.MAIL_ADD,
            to: req.body.email,
            subject: 'OTP Confirm',
            text: 'Your OTP is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
            html: content //Nội dung html mình đã tạo trên kia
        }

        await transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err); //Gửi thông báo đến người dùng
                next(createError.InternalServerError(err.message));
                return;
            } else {
                console.log('Message sent: ' + info.response + OTP); //Gửi thông báo đến người dùng
            }
        });
        

        req.session.newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            permission: "Student"
        }

        res.render('vwAccount/otp', {
            CatList: req.session.CatList,
            custom_style: "register.css",
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = req.session.newUser;

        const createdUser = await User.create(user);
        delete req.session.newUser;
    
        if (createdUser) res.redirect('/account/login');
        else next(createError.InternalServerError());
    } catch(err) {
        next(createError.InternalServerError(err.message));
    }
}

const getOTP = (req, res) => {
    res.render('vwAccount/otp', {
        CatList: req.session.CatList,
    });
}

const checkAvailableEmail = async (req, res) => {
    const email = req.query.email;

    const user = await User.findOne({ email }).lean();

    if (!user) {
        return res.json(true);
    }
    else {
        return res.json(false);
    }
}

const isCorrectOTP = async (req, res, next) => {
    if (req.query.otp === OTP) {
        return res.json(true);
    }   
    else {
        return res.json(false);
    }
}

const checkLogin = async (req, res, next) => {
    try {
        const mail = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: mail })
        

        if (!user) {
            res.render('vwAccount/login', {
                CatList: req.session.CatList,
                err_message: 'Invalid username or password'
            });
            return;
        }

        const checkLogin = await bcrypt.compare(password, user.password);
        
        if (!checkLogin) {
            res.render("vwAccount/login", {
                CatList: req.session.CatList,
                err_message: "Invalid username or password",
            });
            return;
        }
        else {
            if (user.blocked === "False") {
                delete user.password;
                req.session.auth = true;
                req.session.authUser = user;
                if (req.session.authUser.permission === "Admin") {
                    res.redirect("/admin");
                }
                else {
                    res.redirect("/");
                }
            }
            else {
                res.render("400");
            }
        }

    } catch (err) {
        console.log(err);
        next(createError.InternalServerError(err.message));
    }
};

const logout = async (req, res, next) => {
    req.session.auth = false;
    req.session.authUser = null;

    const url = '/';
    res.redirect(url);
};

export { formRegister, sendMail, formLogin, checkLogin, getOTP, logout, checkAvailableEmail, isCorrectOTP, createUser };