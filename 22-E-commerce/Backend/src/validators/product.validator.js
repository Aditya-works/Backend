import {body, validationResult} from "express-validator"

export const createProductValidator=[
    body("title")
    .exists().withMessage("title req").bail()
    .isString().withMessage("title string").bail()
    .trim()
    .isLength({min: 2, max: 100}).withMessage("titles in 2-10")
    .isAlpha("en-US", {ignore: " -"}).withMessage("title can only have english language"),
    body("description")
    .exists().withMessage("description is req").bail()
    .isString().withMessage("Description must be string").bail()
    .trim()
    .isLength({min: 20, max: 500}).withMessage("descrtiption enough"),
    body("price.amount")
    .exists().withMessage("price is req").bail()
    .isFloat({min:0}).withMessage("price amount must be a floating number and >0"),
    body("price.currency")
    .exists().withMessage("currency is req").bail()
    .isString().withMessage("currency is string value")
    .isIn(["INR","USD"]).withMessage("currency either be inr or usd"),
    body("sizes")
    .exists().withMessage('sizes req').bail()
    .isArray().withMessage("sizes must array of object"),
    body("sizes.*.size")// means whatever entries are in sizes for all check the size is.., checks at once for all
    .exists().withMessage("size must be present in every entry of sizes array").bail()
    .trim()
    .isIn(["XS","S","M","L","XL","XXL"]).withMessage("sizes must of ..."),
    body("sizes.*.stock")
    .exists().withMessage("stock must be resent in every entry of sizes array").bail()
    .isInt({min:0}).withMessage("stock must be integer val"),

    (req, res, next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "invalid req",
                errors: errors.array()
            })
        }
        next()
    }

]