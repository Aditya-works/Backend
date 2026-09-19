import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";



export async function register(req, res){
    const {name , email, password} = req.body
    const isUserAlreadyExists = await userModel.findOne({email})
    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "user already exists with this email address",
            errors: [
                {
                    field: "email",
                    message: "user already exists with this email"
                }
            ]
        })
    }
    const user = await userModel.create({
        email,
        name,
        passwordHash: await bcryptjs.hash(password, 12)
    })

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    })
    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })
    

}