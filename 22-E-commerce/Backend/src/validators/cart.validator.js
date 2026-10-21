import {body, validationResult} from "express-validator"

export const addToCartValidator=[
    body("productId")
    .exists().withMessage("product id is req").bail()
    .isString().withMessage("string").bail()
    .isMongoId().withMessage("valid mongo id"),
    body("quantity")
    .exists().withMessage("quantity is req").bail()
    .isInt({min:1}).withMessage("quantity >0"),
    body("size")
    .exists().withMessage("size is req").bail()
    .isString().withMessage("Size is string").bail()
    .isIn(["XS","S","M","L","XL","XXL"]).withMessage("size one of the true"),

    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors){
            return res.status(400).json({
                message: "validation failed",
                errors: errors.array()
            });
        }
        next()
    }
]