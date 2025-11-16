import express from 'express'
import { addOrderItem, deleteAllOrderItems, getAllOrderItems } from '../controllers/orderItem.controller.js';
import { verifyUser } from '../Middlewares/verifyUser.middleware.js';


const route = express.Router();


route.route('/')
    .get(verifyUser, getAllOrderItems)
    .post(verifyUser, addOrderItem)
    .delete(verifyUser, deleteAllOrderItems)




export default route