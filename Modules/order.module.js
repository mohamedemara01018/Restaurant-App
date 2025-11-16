import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    total_amount: {
        type: Number,
        min: 0,
        default: 0
    },
    total_price: {
        type: Number,
        min: 0,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true }
)

export const orderModel = mongoose.model('orders', orderSchema)
