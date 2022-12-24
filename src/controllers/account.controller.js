import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";

const formRegister = async function (req, res, next) {
    res.render('vwAccount/register', {
        custom_style: "register.css",
        layout: false
    });
}

const formLogin = async function (req, res, next) {
    res.render('vwAccount/login', {
        custom_style: "login.css",
        layout: false
    });
}

const addAccount = async (req, res) => {

    const nameAccount = await User.findOne({name: req.body.name})
    if (nameAccount)
        res.status(409).send('This account has already existed.');
    else{
        const rawPassword = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rawPassword, salt);

        const newAccount = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
            permission: "student"
        }

        const createUser = await User.create(newAccount);
        if (!createUser) {
            return res.status(400).send('There was an error during account creation, please try again.');
        }
        else {
            res.render('vwAccount/login', {
                custom_style: "login.css",
                layout: false
            });
        }
    }
};

const checkLogin = async (req, res) => {

    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if (!user) {
        res.render('vwAccount/login', {
            custom_style: "login.css",
            layout: false,
            err_message: 'Invalid username or password'
        });
    }
    if (await bcrypt.compare(password, user.password)){
        res.render('vwAccount/login', {
            custom_style: "login.css",
            layout: false,
            err_message: 'Invalid username or password'
        });
    }

    req.session.auth = true;
    req.session.authUser = user;

    res.redirect("/");

    //res.redirect("vwStudentProfile/profile")
};

const logout = async (req, res) => {
    req.session.auth = false;
    req.session.authUser = user;

    const url = req.headers.referer || '/';
    res.redirect(url);

    //res.redirect("vwStudentProfile/profile")
};

export { formRegister, addAccount, formLogin, checkLogin, logout };