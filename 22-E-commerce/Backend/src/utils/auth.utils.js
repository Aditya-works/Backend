import config from "../config/config";
import jwt from "jsonwebtoken"

export function createAccessToken({userId, role}){
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN_SECRET,{expiresIn: "15Min"})
}

export function createRefreshToken({userId, role}){
    const refreshToken = jwt.sign({
        userId, role
    }, config.REFRESH_TOKEN_SECRET,{expiresIn: "7Days"})
}