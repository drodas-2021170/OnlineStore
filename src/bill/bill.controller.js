import Bill from "./bill.model.js"
import Cart from "../cart/cart.model.js"
import Product from "../product/product.model.js"
import User from "../user/user.model.js"

export const getBill = async(req, res) =>{
    try {
        let {idClient}= req.body

        let cliente = await User.findOne({_id:idClient})
        
        if(!cliente) return res.status(404).send({sucess: false, message:'User not found'})
            
        let cart = await Cart.findOne({user: idClient, status:'PENDIENT'}).populate('user', 'name surname username')
            
        if(!cart) return res.status(404).send({sucess:false, message:'Cart not found'})
        
        let bill = new Bill({cart: cart.id})
        for(let i = 0; i<cart.product.length; i++){
            
            let product = await Product.findOne({_id: cart.product[i].products.toString()})
            
            console.log(product.updateAt)
            bill.product.push({
                products: product._id,
                quantity: cart.product[i].quantity,
                price: product.price,
            })
            await Product.findByIdAndUpdate(product.id, {stock: product.stock - cart.product[i].quantity})
            await Product.findByIdAndUpdate(product.id, {updateAt: product.updateAt + 1})
            console.log(product.updateAt)   
            
            
        }

        if(cart.length === 0) return res.status(404).send({success:false, message:'Procesing Bill'})            
            bill.user = req.user.uid
            bill.total = cart.subTotal + (cart.subTotal *0.12)
            await Cart.findByIdAndUpdate(cart.id, {status: 'COMPLETED'})
            await bill.save()
            return res.send({success:false, message:'Procesing Bill', bill})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}

export const getMyBill = async(req,res) =>{
    try {
        

        let bill = await Bill.find({cart: cart.id})
        return res.send({success: true, message:'Your bill', bill})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const getHystorial = async(req,res) =>{
    try {
        let bill = await Bill.find({user: req.user.uid})
        .populate('cart', 'product subTotal')
        .populate('user', 'name surname username -_id')
        
        if(bill.length === 0) return res.status(404).send({success:false, message:'You dont do any purchase right now'})
            return res.send({success: true, message:'Purchase', bill})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}