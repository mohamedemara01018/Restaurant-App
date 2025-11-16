import { asyncWrapper } from "../Middlewares/asyncWrapper.middleware.js";
import { AppError } from "../utils/appError.js";
import { generateToken } from "../utils/token.js";
import { responseStatus } from "../utils/responseStatus.js";
import bcrypt from 'bcrypt'
import { userModel } from "../Modules/users.module.js";







const getAllUser = asyncWrapper(async (req, res, next) => {
    const users = await userModel.find();
    res.status(200).json({ status: responseStatus.SUCCESS, data: { users } });
})

const deleteAllUser = asyncWrapper(async (req, res, next) => {
    const deletedUsers = await userModel.deleteMany({});
    res.status(200).json({ status: responseStatus.SUCCESS, data: { deletedUsers } });
})




const register = asyncWrapper(async (req, res, next) => {
    const body = req.body;

    if (!body) {
        const fail = AppError('you must provide data', 404, responseStatus.FAIL);
        return next(fail)
    }

    const token = generateToken({ email: body.email, role: body.role });
    if (!body.password) {
        const fail = AppError('you must provide password', 404, responseStatus.FAIL);
        return next(fail)
    }
    const encryptedPassword = await bcrypt.hash(body.password, 10);
    const userData = {
        ...body,
        password: encryptedPassword,
        token
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    res.status(201).json({ status: responseStatus.SUCCESS, data: { user } })
})

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });

    if (!isUserExist) {
        const fail = AppError("you did't exit, Register", 404, responseStatus.FAIL);
        return next(fail);
    }

    const comparePassword = await bcrypt.compare(password, isUserExist.password);

    if (!comparePassword) {
        const fail = AppError("password is wrong, try again", 400, responseStatus.FAIL);
        return next(fail);
    }

    const token = generateToken({
        email: isUserExist.email,
        id: isUserExist._id,
    });

    res.status(200).json({
        status: responseStatus.SUCCESS,
        data: { token },
    });
});


export {
    getAllUser,
    deleteAllUser,
    register,
    login
}