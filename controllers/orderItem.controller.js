import { asyncWrapper } from "../Middlewares/asyncWrapper.middleware.js";
import { orderItemsModel } from "../Modules/orderItems.module.js";
import { responseStatus } from "../utils/responseStatus.js";

const getAllOrderItems = asyncWrapper(async (req, res, next) => {
    const orderItem = await orderItemsModel.findOne({ user: req.user._id })
        .populate('user')
        .populate('recipe', 'name price -_id');
    res.status(200).json({ status: responseStatus.SUCCESS, data: { orderItems: orderItem } })
})
const addOrderItem = asyncWrapper(async (req, res, next) => {
    const body = req.body;
    const userId = req.user._id;

    // check if the same order item exists for this user
    let orderItem = await orderItemsModel.findOne({ user: userId, recipe: body.recipe });

    if (orderItem) {
        // increment quantity and update total price using unitPrice
        const newQuantity = orderItem.quantity + (body.quantity || 1);
        orderItem.quantity = newQuantity;
        orderItem.price = orderItem.price * newQuantity; // make sure you have unitPrice in schema
        await orderItem.save();
    } else {
        // create new order item
        orderItem = await orderItemsModel.create({
            ...body,
            user: userId,
            price: body.price * (body.quantity || 1)
        });
    }

    res.status(201).json({ status: responseStatus.SUCCESS, data: { orderItem } });
});


const deleteAllOrderItems = asyncWrapper(async (req, res, next) => {
    const deletedOrderItems = await orderItemsModel.deleteMany({});
    res.status(200).json({ status: responseStatus.SUCCESS, data: { deletedOrderItems } })

})

export {
    getAllOrderItems,
    addOrderItem,
    deleteAllOrderItems
}