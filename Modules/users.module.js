import mongoose from "mongoose";
import { roles } from "../utils/roles.js";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'you must provide your first name']
    },
    lastName: {
        type: String,
        required: [true, 'you must provide your last ame']
    },
    email: {
        type: String,
        required: [true, 'you must provide your first name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'you must provide your  password']
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [roles.ADMIN, roles.USER],
        default: roles.USER
    },
})

export const userModel = mongoose.model('users', userSchema)