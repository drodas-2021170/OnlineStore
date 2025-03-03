import Product from "../product/product.model.js"
import Cart from "./cart.model.js"

export const addCart = async(req,res) =>{
    try {
        let data = req.body
        let found = false

        let{products} = req.body
        
        let product = await Product.findById(products)
        
        if(!product) return res.status(404).send({success: false, message:'Product not found'})
            
        if(product.status === false) return res.status(404).send({success: false, message:'Product not found'})

        let carts = await Cart.findOne({user: req.user.uid, status:'PENDIENT'} ).populate('product', ' -_id')
        
        if(product.stock === 0) return res.status(404).send({success:false, message:'This product is out of stock'})
        
        if(product.stock < data.quantity) return res.status(404).send({success:false, message:'Cant add more than stock'})
            //await Product.findByIdAndUpdate(products, {stock: product.stock - data.quantity})

            if(carts){
                for(let i = 0; i<carts.product.length; i++){
                    console.log(carts.product[i].products.toString() )
                    if(carts.product[i].products.toString() === product.id){
                            console.log('Si hay un producto asi')
                            found = true;
                            if(carts.product[i].quantity + Number(data.quantity) > product.stock){
                                return res.status(403).send({success:false, message:'You cannot add more products that the stock has'})
                            }else{
                                carts.product[i].quantity = carts.product[i].quantity + Number(data.quantity) 
                            }
                            break
                        } 
                    }
                    if(!found){
                        console.log('No hay asi')
                        carts.product.push({
                            products: product._id,
                            name: product.name, 
                            quantity: Number(data.quantity),
                            price: product.price 
                            
                        })
                    }
            carts.subTotal = Number(carts.subTotal) + (product.price * Number(data.quantity))
            let carrito = await carts.save()
            return res.send({success:true, message:'New Product was added to the cart', carrito})
        }else{
            let cart = new Cart({...data, user:req.user.uid})
            cart.subTotal =  product.price * Number(data.quantity)
            cart.product.push({
                products: product._id,
                name: product.name,  
                quantity: Number(data.quantity),
                price: product.price 
            });
            let carritoNew = await cart.save()
            return res.send({success:true, message:'Cart created',carritoNew})
        }

    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const getCart = async(req,res) =>{
    try {
        console.log(req.user.uid)
        let carrito = await Cart.findOne({user: req.user.uid} && {status: 'PENDIENT'}).populate('product', 'name price ')
        console.log(carrito)
        if(carrito.length === 0)return res.status(404).send({success:false, message:'You dont have cart'})
            return res.send({sucess:true, message:'Your cart', carrito})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}