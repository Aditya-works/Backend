import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.utils.js";



export async function register(req, res) {

    console.log("1. API called");

    const { name, email, password } = req.body;

    console.log("2. Body received");

    const isUserAlreadyExists = await userModel.findOne({ email });

    console.log("3. Database query completed");

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user already exists with this email address"
        });
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash: await bcrypt.hash(password, 12)
    });

    console.log("4. User created");

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    });

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    });

    console.log("5. Tokens created");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    });

    console.log("6. Cookie set");
    await userModel.findByIdAndUpdate(user._id,{
        refreshToken
    })

    return res.status(201).json({
        message: "user registered successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            },
            accessToken
        }
    });
}

export async function login(req, res){
    const {email, password} = req.body
    const user = await userModel.findOne({
        email
    })
    if(!user){
         return res.status(400).json({
            message: "invalid email or password"
         })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    });

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    });

    await userModel.findOneAndUpdate({
        email
    },{
        refreshToken
    })

    res.cookie("refreshToken", refreshToken,{
        httpOnly: true
    })
    res.status(201).json({
        message: "user loggedIn successfully",
        data:{
            user:{
                id: user._id,
                email: user.email,
                name: user.name
            },
            accessToken
        }
    })
}

export async function refresh(req, res){
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
    return res.status(401).json({
        message: "refresh token is required."
    })
    }

    try{
        const decoded = readRefreshToken(refreshToken)// if verify works and token is right then it returns the data of the token
        const {userId, role} = decoded
        const user = await userModel.findById(userId)
        if(refreshToken != user.refreshToken){
            await userModel.findByIdAndUpdate(user._id,{
                refreshToken: null
            })
            return res.status(401).json({
                message: "refresh token mismatch"
            })
        }
        const accessToken = createAccessToken({
            userId, role
        })

        const newRefreshToken = createRefreshToken({
            userId, role
        })

        await userModel.findByIdAndUpdate(user._id,{
            refreshToken: newRefreshToken
        })
        res.cookie("refreshToken", refreshToken,{
            httpOnly: true
        })
        res.status(200).json({
            message: "tokens rotated successfully",
            data:{
                user:{
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
                accessToken
            }
        })
    }
    catch(error){
        return res.status(401).json({
            message: "invalid refresh token"
        })
    }
}

export async function getMe(req, res){
    const {userId, role}= req.user
    const user = await userModel.findById(userId)
    res.status(200).json({
        message: "user data fetched successfully",
        data: {
            user:{
                email: user.email,
                name: user.name,
                id: user._id
            }
        }
    })
}