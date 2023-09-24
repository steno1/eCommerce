// Importing the Order model and asyncHandler middleware

import Order from "../models/orderModel.js";
import asyncHandler from "../middleWare/asyncHandler.js";

// Handler function for adding order items
const addOrderItems = asyncHandler(async (req, res) => {
    // Destructuring properties from req.body
    console.log(req.body);
    const { shippingAddress, orderItems, paymentMethod, itemsPrice,
        taxPrice, shippingPrice, totalPrice } = req.body;

    // Checking if there are order items
    if (orderItems && orderItems.length === 0) {
        res.status(400); // Setting response status to Bad Request
        throw new Error("No Order Items"); // Throwing an error
    } else {
        // Creating a new Order object
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        // Saving the order to the database
        const createdOrder = await order.save();
        res.status(201).json(createdOrder); // Responding with the created order
    }
});

// Handler function for getting orders of the authenticated user
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }); // Finding orders by user ID
    res.status(200).json(orders); // Responding with the orders in JSON format
});

// Handler function for getting a specific order by ID
const getMyOrdersById = asyncHandler(async (req, res) => {
    const orderById = await Order.findById(req.params.id)
    .populate("user", "name email"); 
    // Finding order by ID and populating user info
    if (orderById) {
        res.status(200).json(orderById); // Responding with the order in JSON format
    } else {
        res.status(404); // Setting response status to Not Found
        throw new Error("Order not found"); // Throwing an error
    }
});

// Handler function for updating an order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // Finding the order by its ID
    const order = await Order.findById(req.params.id);
    if (order) {
        // Setting the order as paid and recording the payment timestamp
        order.isPaid = true;
        order.paidAt = Date.now();
        // Recording payment details
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        // Saving the updated order
        const updatedOrder = await order.save();
        // Responding with the updated order in JSON format
        res.status(200).json(updatedOrder)
    } else {
        // If the order is not found, set status to 404 and throw an error
        res.status(404);
        throw new Error("Order not found")
    }
});


// Handler function for updating an order to delivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order=await Order.findById(req.params.id);
    if(order){
order.isDelivered=true;
order.deliveredAt=Date.now();
const updatedOrder=await order.save();
res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order not Found")
    }
});

// Handler function for getting all orders (not implemented)
const getOrders = asyncHandler(async (req, res) => {
    const orders=await Order.find({}).populate("user", "id name");
    res.status(200).json(orders)
});

// Exporting the handler functions
export {
    getMyOrders,
    getMyOrdersById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders,
    addOrderItems
};
