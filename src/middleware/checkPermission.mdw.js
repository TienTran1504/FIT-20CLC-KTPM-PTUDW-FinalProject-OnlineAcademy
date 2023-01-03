import createError from "http-errors";
const checkTeacher = (req, res, next) => {
    try {
        if (req.session.authUser.permission === "Teacher"){
            next();
        }
        else {
            res.status(409).send('You do not have permission to access this page');
            res.redirect('/');
        }
    }catch (err){
        throw createError.InternalServerError(err.message);
    }
}
const checkStudent = (req, res, next) => {
    try {
        if (req.session.authUser.permission === "Student"){
            next();
        }
        else {
            res.status(409).send('You do not have permission to access this page');
            res.redirect('/');
        }
    }catch (err){
        throw createError.InternalServerError(err.message);
    }
}
const checkAdmin = (req, res, next) => {
    try {
        if (req.session.authUser.permission === "Admin"){
            next();
        }
        else {
            res.status(409).send('You do not have permission to access this page');
            res.redirect('/');
        }
    }catch (err){
        throw createError.InternalServerError(err.message);
    }
}
export { checkTeacher, checkAdmin, checkStudent};