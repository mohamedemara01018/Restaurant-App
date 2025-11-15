import mongoose from "mongoose";


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
    }
})

export const userModel = mongoose.model('users', userSchema)