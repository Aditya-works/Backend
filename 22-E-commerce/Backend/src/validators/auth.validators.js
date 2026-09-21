import {body, validationResult} from "express-validator"


export const registerValidator=[
    body("email")
    .exists().withMessage("email is required").bail()
    .trim()
    .isEmail().withMessage("enter a valid email"),
    body("name")
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name must be a string")
    .trim() 
    .isLength({min: 2, max: 50}).withMessage("name length must be between 2 to 50 characters"),
    body("password")
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password must be a string")
    .trim()
    .isLength({min: 6}).withMessage("password atleast 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "invalid request",
                errors: errors.array()
            })
        }
        next()
    }
]

export const loginValidator = [
    body("email")
    .exists().withMessage("email is required").bail()
    .isString().withMessage("email must be string").bail()
    .isEmail().withMessage("enter a valid email address"),
    body("password")
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password must be string").bail()
    .trim()
    .isLength({min:6}).withMessage("password must be atleast 6 characters long"),

    (req, res, next)=>{
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "invalid data",
                errors: errors.array()
            })
        }
        next()
    }
]