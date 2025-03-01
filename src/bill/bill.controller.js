import Bill from "./bill.model.js"
import Cart from "../cart/cart.model.js"


export const getBill = async(req, res) =>{
    try {
        let cart = await Cart.findOne({user: req.user.uid}).populate('user', 'name surname username')

        let bill = new Bill({cart: cart.id})
        if(cart.length === 0) return res.status(404).send({success:false, message:'Procesing Bill'})
            
            bill.total = cart.subTotal + (cart.subTotal *0.12)
            //await Cart.findByIdAndUpdate(cart.id, {status: 'COMPLETED'})
            await bill.save()
            return res.send({success:false, message:'Procesing Bill', cart})
        
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}

export const getMyBill = async(req,res) =>{
    try {
        let cart = await Cart.findOne({user: req.user.uid} )
        console.log(cart.id)

        let bill = await Bill.find({cart: cart.id})
        return res.send({success: true, message:'Your bill', bill})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}