import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [3, "Name must be atleast 3 char long"],
        maxLength: [50,"Name must be within 50 chars"]
    },
    email:{
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },
    refreshToken:{
        type: String,

    }
})

const userModel = mongoose.model("users", userSchema)
export default userModel