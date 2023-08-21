import Product from "../models/productModel.js";
import asyncHandler from "../middleWare/asyncHandler.js";
import express  from "express";

//import products from "../data/products.js";


const router=express.Router();

// Set up a route to handle requests for retrieving all products
router.get("/", asyncHandler(async (req, res) => {
    const products=await Product.find({})
    res.json(products);
}));

// Set up a route to handle requests for retrieving a specific product by its ID
router.get("/:id", asyncHandler(async (req, res) => {
    // Find a product in the 'products' array that matches the provided ID
    const product = await Product.findById(req.params.id)
    if(product){

    // Respond with the found product in JSON format
    res.json(product);
    }else{
        res.status(404)
        throw new Error(`Resource not found`)
    }
    

}));
 export default router;