import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'users',
        required: true,

    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes',
        required: true
    },
    quantity: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 1
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },


})

export const orderItemsModel = mongoose.model('orderItems', orderItemSchema)