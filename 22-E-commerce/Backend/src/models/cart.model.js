import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId, // mongoose schema has different types to be stored and thy are accessed in this manner.
                required: true
            },
            quantity:{
                type: Number,
                default: 1,
                min: 1
            },
            size:{
                type: String,
                enum:["XS", "S", "M", "L", "XL", "XXL"]
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",// ref tells the which collection you can use to access ObjectId
        required: true
    }
})

const cartModel = mongoose.model("cart", cartSchema)

export default cartModel