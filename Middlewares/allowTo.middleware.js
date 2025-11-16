import { AppError } from "../utils/appError.js"
import { responseStatus } from "../utils/responseStatus.js"

export const allowTo = (roles) => {
    return (req, res, next) => {
        console.log(req.user)
        if (!roles.includes(req.user.role)) {
            const error = AppError('not allow to you to make this action', 400, responseStatus.ERROR);
            return next(error)
        }
        next();
    }
}