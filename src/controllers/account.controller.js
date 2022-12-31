import mongoose from "mongoose";
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

const addAccount = async (req, res, next) => {
    try{
        const nameAccount = await User.findOne({firstname: req.body.firstName, lastName: req.body.lastName, email: req.body.email})
        if (nameAccount === null){
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
                res.render('vwAccount/login', {
                    custom_style: "login.css",
                });
            }
        }
        else{
            res.status(409).send('This account has already existed.');
        }
    }catch (err){
        throw createError.InternalServerError(err.message);
    }
};

const checkLogin = async (req, res, next) => {
    try{
        const mail = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: mail})

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
            delete user.password;
            req.session.auth = true;
            req.session.authUser = user;
            console.log("login success")
            res.redirect("/");
        }
    }catch (err){
        throw createError.InternalServerError(err.message);
    }
};

const logout = async (req, res, next) => {
    req.session.auth = false;
    req.session.authUser = null;

    const url = '/';
    res.redirect(url);
};

export { formRegister, addAccount, formLogin, checkLogin, logout };