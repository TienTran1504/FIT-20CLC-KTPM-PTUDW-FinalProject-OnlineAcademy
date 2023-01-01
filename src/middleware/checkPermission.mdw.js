import createError from "http-errors";
const checkTeacher = (res, req, next) => {
    try {
        if (req.authUser.permission === "Teacher"){
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
const checkStudent = (res, req, next) => {
    try {
        if (req.authUser.permission === "Student"){
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
const checkAdmin = (res, req, next) => {
    try {
        if (req.authUser.permission === "Admin"){
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