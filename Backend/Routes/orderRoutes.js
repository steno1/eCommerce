// Importing necessary functions from the userController.js file.

import {
addOrderItems,
getMyOrders,
getMyOrdersById,
getOrders,
updateOrderToDelivered,
updateOrderToPaid
} from "../controller/orderController.js";
import { admin, protect } from "../middleWare/AuthMiddleWare.js";

import express from "express";

// Importing the Express framework.


// Creating an instance of the Express router.
const router = express.Router();

router.route("/").post(protect, addOrderItems)
router.route("/").get(protect, admin, getOrders)
router.route("/mine").get(protect, getMyOrders)
router.route("/:id").get(protect,admin, getMyOrdersById)
router.route("/:id/pay").put(protect,updateOrderToPaid)
router.route("/:id/deliver").put(protect,admin, updateOrderToDelivered)


export default router
