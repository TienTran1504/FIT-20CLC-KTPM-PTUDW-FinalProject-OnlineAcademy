import mongoose from "mongoose";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";

const formRegister = async function (req, res, next) {
    res.render('vwAccount/register', {
        custom_style: "register.css",
    });
}

const formLogin = async function (req, res, next) {
    res.render('vwAccount/login', {
        custom_style: "login.css",
    });
}

const num = Math.floor((Math.random() * (999999 - 100000)) + 100000);
const OTP = num.toString();

const addAccount = async (req, res, next) => {
    try {
        const nameAccount = await User.findOne({ firstname: req.body.firstName, lastName: req.body.lastName, email: req.body.email })
        if (nameAccount === null) {
            const rawPassword = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(rawPassword, salt);

            const newAccount = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                gender: req.body.gender,
                permission: "Student"
            }

            const createUser = await User.create(newAccount);
            if (!createUser) {
                return res.status(400).send('There was an error during account creation, please try again.');
            }
            else {
                const transporter = nodemailer.createTransport({ // config mail server
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'ltnga20@clc.fitus.edu.vn', //Tài khoản gmail vừa tạo
                        pass: 'Thuynga1606' //Mật khẩu tài khoản gmail vừa tạo
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false
                    }
                });
                const content = "Welcome to Academy Online.\nACB sincerely thanks you for choosing our service and wishes you all the best.\n" +
                    "And here is your OTP code: " + OTP + "\nYou do not provide the OTP code sent by ACB to your email to anyone.\nThank you!";


                const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'NQH-Test nodemailer',
                    to: req.body.email,
                    subject: 'OTP Confirm',
                    text: 'Your OTP is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
                    html: content //Nội dung html mình đã tạo trên kia :))
                }
                await transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        req.flash('mess', 'Error mail: ' + err); //Gửi thông báo đến người dùng
                        res.redirect('/');
                    } else {
                        console.log('Message sent: ' + info.response + OTP);
                        req.flash('mess', 'An email has been sent to your account'); //Gửi thông báo đến người dùng
                    }
                });
                res.render('vwAccount/otp', {
                    custom_style: "register.css",
                });
            }
        }
        else {
            res.status(409).send('This account has already existed.');
        }
    } catch (err) {
        throw createError.InternalServerError(err.message);
    }
};

const checkOTP = async (req, res, next) => {
    const enOTP = req.body.otp;
    if (enOTP !== OTP) {
        res.status(409).send('OTP is incorrect');
    }
    else {
        res.render('vwAccount/login', {
            custom_style: "login.css",
        });
    }

};

const checkLogin = async (req, res, next) => {
    try {
        const mail = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: mail })

        if (!user) {
            res.render('vwAccount/login', {
                custom_style: "login.css",
                err_message: 'Invalid username or password'
            });
        }

        const checkLogin = await bcrypt.compare(password, user.password)
        if (!checkLogin) {
            res.render("vwAccount/login", {
                custom_style: "login.css",
                err_message: "Invalid username or password",
            });
        }
        else {
            if (user.blocked === "False") {
                delete user.password;
                req.session.auth = true;
                req.session.authUser = user;
                console.log("login success")
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
        throw createError.InternalServerError(err.message);
    }
};

const logout = async (req, res, next) => {
    req.session.auth = false;
    req.session.authUser = null;

    const url = '/';
    res.redirect(url);
};

export { formRegister, addAccount, formLogin, checkLogin, checkOTP, logout };