import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";
export async function addToCart(req, res){
    const {productId, quantity, size}= req.body
    const product = await productModel.findById(productId)
    if(!product){
        return res.status(404).json({
            message: "product not found"
        })
    }

    const selectedSize= product.sizes.find(s=>s.size===size)

    if(!selectedSize){
        return res.status(400).json({
            message: "invalid size"
        })
    }

    if(selectedSize.stock<quantity){
        return res.status(400).json({
            message: "insufficient stock"
        })
    }
    let cart = await cartModel.findOne({user: req.user.userId})

    if(!cart){
        cart = await cartModel.create({user: req.user.userId, items:[]})
    }
    const productInCart = cart.products.find(p=>(p.product.toString()===productId)&& (p.size=== size))
    if(productInCart){
        if((productInCart.quantity+quantity)>selectedSize.stock){
            return res.status(400).json({
                message: "insufficiet stock"
            })
        }  
        
        await cartModel.updateOne({
        user: req.user.userId,
        "products.product": productId,
        "products.size": size
    },{
        $inc: {"products.$.quantity": quantity}
    })
    return res.status(200).json({
        message: "product quantity added to cart"
    })
    }

    await cartModel.findOneAndUpdate({
        user: req.user.userId
    },{
        $push: {
            products: {
                product: productId,
                quantity: quantity,
                size: size
            }
        }
    })
    return res.status(200).json({
        message: "product added to cart"
    })
}

export async function getCart(req, res){
    const cart = (await cartModel.findOne({user: req.user.userId}))??(await cartModel.create({user: req.user.userId}))
    return res.status(200).json({
        message: "cart fetched successfully",
        data:{
            cart: cart
        }
    })
}