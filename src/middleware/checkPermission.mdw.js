import createError from "http-errors";

const checkTeacher = (req, res, next) => {
    try {
        if (req.session.authUser.permission = "Teacher") {
            next();
        } else {
            
            res.redirect("/");
        }
        
    } catch(err) {
        next(createError.InternalServerError(err.message));
    }
    
}   

export  {
    checkTeacher
}