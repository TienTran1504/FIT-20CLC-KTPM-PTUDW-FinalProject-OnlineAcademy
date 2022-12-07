import User from '../models/User'
import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors'

const auth = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user 

        const user = User.findById(payload.id).select('-password') // look for the user in DB
        // req.user = user;
        // console.log(user)
        req.user = { userId: payload.userId, name: payload.name, user: payload }; //payload có các key đã tạo bên models User phần createJWT()
        // console.log(payload);
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

export default auth;