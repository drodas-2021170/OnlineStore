import Product from "../product/product.model.js"
import Cart from "./cart.model.js"

export const addCart = async(req,res) =>{
    try {
        let data = req.body

        let{products} = req.body
        
        let product = await Product.findById(products)
        
        if(!product) return res.status(404).send({success: false, message:'Product not found'})
        
        let carts = await Cart.findOne({user: req.user.uid}).populate('product', 'name price -_id')
        
        if(product.stock === 0) return res.status(404).send({success:false, message:'This product is out of stock'})
        
        if(product.stock < data.quantity) return res.status(404).send({success:false, message:'Cant add more than stock'})
        
        await Product.findByIdAndUpdate(products, {stock: product.stock - data.quantity})
        
        if(carts){
            carts.product.push(product)
            carts.quantity = carts.quantity + Number(data.quantity)
            carts.subTotal = Number(carts.subTotal) + (product.price * Number(data.quantity))
            carts.total =  carts.subTotal + (carts.subTotal*0.12)
            let carrito = await carts.save()
            return res.send({success:true, message:'New Product was added to the cart', carrito})
        }else{
            let cart = new Cart({...data, user:req.user.uid})
            cart.subTotal =  product.price * Number(data.quantity)
            cart.product.push(product)
            let carritoNew = await cart.save()
            return res.send({success:true, message:'Cart created',carritoNew})
        }

    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}