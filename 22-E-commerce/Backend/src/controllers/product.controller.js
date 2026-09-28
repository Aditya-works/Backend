import productModel from "../models/products.model.js";

export async function createProduct(req, res){
    console.log(req.body)
    console.log(req.files)
    res.status(200).json({
        message:"dummy response"
    })
}
