import Bill from "./bill.model.js"
import Cart from "../cart/cart.model.js"
import Product from "../product/product.model.js"
import User from "../user/user.model.js"

export const getBill = async(req, res) =>{
    try {
        let cliente = await User.findOne({_id:req.user.uid})
        
        if(!cliente) return res.status(404).send({sucess: false, message:'User not found'})
            
        let cart = await Cart.findOne({user: req.user.uid, status:'PENDIENT'}).populate('user', 'name surname username')
            
        if(!cart) return res.status(404).send({sucess:false, message:'Cart not found'})
        
        let bill = new Bill({cart: cart.id})
        for(let i = 0; i<cart.product.length; i++){
            
            let product = await Product.findOne({_id: cart.product[i].products.toString()})
        
            bill.product.push({
                products: product._id,
                name: product.name,
                quantity: cart.product[i].quantity,
                price: product.price,
            })

            /*if(product.stock<cart.product[i].quantity){
                await Cart.findByIdAndUpdate(cart.id, {status: 'EDIT'})
                await bill.save()
                return res.status(404).send({success:false, message:'Please talk with an Admin to change your bill'})
            }*/

            await Product.findByIdAndUpdate(product.id, {stock: product.stock - cart.product[i].quantity})
            await Product.findByIdAndUpdate(product.id, {updateAt: product.updateAt + 1})
            console.log(product.stock)
            console.log(cart.product[i].quantity)
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

export const getClientBills = async(req,res) =>{
    try {
        let {idCliente} = req.body
        let bill = await Bill.find({user: idCliente}).populate('cart', 'subTotal')
        if(bill.length === 0) return res.status(404).send({sucess: false, message:'No bills for this client'})
            return res.send({success: true, message:'Your bill', bill})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const getHystorial = async(req,res) =>{
    try {
        let bill = await Bill.find({user: req.user.uid})
        .populate('cart', 'subTotal')
        .populate('user', 'name surname username -_id')
        
        if(bill.length === 0) return res.status(404).send({success:false, message:'You dont do any purchase right now'})
            return res.send({success: true, message:'Purchase', bill})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const updateBill = async(req,res) =>{
    try {
        let {idCliente, newIva} = req.body
        let user = await User.findById(idCliente)
        let cart = await Cart.findOne({user: user.id }&&{status: 'PENDIENT'})
        let bill = await Bill.findOne({cart:cart.id})
        await Bill.findByIdAndUpdate(bill.id,{total: cart.subTotal + (cart.subTotal* newIva)},{new:true})
        let bill2 = await Bill.findByIdAndUpdate(bill.id,{status: 'COMPLETED'},{new:true})
        if(!bill) return res.status(404).send({success:false, message:'Bill not updated'})
            return res.send({success:true, message:'Bill Updated', bill2})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}