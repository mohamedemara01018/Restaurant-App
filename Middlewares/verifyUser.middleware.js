import { userModel } from "../Modules/users.module.js";
import { AppError } from "../utils/appError.js";
import { responseStatus } from "../utils/responseStatus.js";
import { verifyToken } from "../utils/token.js";

export const verifyUser = async (req, res, next) => {
    const token = req.headers.Authorization || req.headers.authorization;
    if (!token) {
        const error = AppError('you must login or register', 400, responseStatus.ERROR);
        return next(error)
    }
    const decodeToken = verifyToken(token);
    const user = await userModel.findOne({ email: decodeToken.email });
    // console.log('user', user)
    req.user = user;
    next();
}