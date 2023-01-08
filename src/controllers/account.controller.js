import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import createError from "http-errors";
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

const sendMail = async (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({ // config mail server
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: 'leewiner102@gmail.com', //Tài khoản gmail vừa tạo
                pass: 'tqhbpdfibgjiwnje' //Mật khẩu tài khoản gmail vừa tạo
            }
        });
        const content = `<mjml>
                            <mj-body background-color="#fafbfc">
                            <mj-section padding-bottom="20px" padding-top="20px">
                                <mj-column vertical-align="middle" width="100%">
                                <mj-image align="center" padding="25px" src="https://uploads-ssl.webflow.com/5f059a21d0c1c3278fe69842/5f188b94aebb5983b66610dd_logo-arengu.png" width="125px"></mj-image>
                                </mj-column>
                            </mj-section>
                            <mj-section background-color="#fff" padding-bottom="20px" padding-top="20px">
                                <mj-column vertical-align="middle" width="100%">
                                <mj-text align="center" font-size="16px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"><span>Hello,</span></mj-text>
                                <mj-text align="center" font-size="16px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Please use the verification code below on the ONLINE ACADEMY website:</mj-text>
                                <mj-text align="center" font-size="24px" background-color="#20c997" font-weight="bold" font-family="open Sans Helvetica, Arial, sans-serif">${OTP}</mj-text>
                                <mj-text align="center" font-size="16px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="16px">If you didn't request this, you can ignore this email or let us know.</mj-text>
                                <mj-text align="center" font-size="16px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thanks! <br />FIT - HCMUS - 20CLC team</mj-text>
                                </mj-column>
                            </mj-section>
                            </mj-body>
                        </mjml>`;


        const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'leewiner102@gmail.com',
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
            custom_style: "register.css",
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = req.session.newUser;

        const rawPassword = user.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rawPassword, salt);

        user.password = hash;

        const createdUser = await User.create(user);
        delete req.session.newUser;
    
        if (createdUser) 
            redirect('/');
        else next(createError.InternalServerError());
    } catch(err) {
        next(createError.InternalServerError(err.message));
    }
}

const getOTP = (req, res) => {
    res.render('vwAccount/otp');
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
                custom_style: "login.css",
                err_message: 'Invalid username or password'
            });
            return;
        }

        const checkLogin = await bcrypt.compare(password, user.password)
        if (!checkLogin) {
            res.render("vwAccount/login", {
                custom_style: "login.css",
                err_message: "Invalid username or password",
            });
            return;
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