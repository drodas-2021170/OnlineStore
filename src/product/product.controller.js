import Product from "./product.model.js"
import Category from "../category/category.model.js"
import Bill from "../bill/bill.model.js"

export const addProduct = async(req,res) =>{
    try {
        
        let data = req.body
        
        let categories = await Category.findOne({_id: data.category})

        if(!categories) return res.status(403).send({success: false, message: 'Category not found'})
        
        let product = new Product(data)
        await product.save()
        
        if(!product) return res.status(404).send({success:false, message:'Product not add'})
            return res.send({success: true, message:'Product saved', product})

    } catch (err) {
        console.log(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}

export const getAll = async(req, res) =>{
    try {
        let products = await Product.find({stock: { $gt: 1 } }).populate('category','name description').select('-updateAt')

        if(!products) return res.status(404).send({success:false, message:'Products not found'})
            return res.send({success:true, message:'Products found', products})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}


export const getMostProduct = async(req,res) =>{
    try {
        let mostProduct = await Product.find().sort({updateAt: -1})
        return res.send({message: 'Productos mas vendidos', mostProduct})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const updateProduct = async(req,res) =>{
    try {
        let id = req.body.id
        let data = req.body

        let productId = await Product.findById({_id:id})
        

        if(!productId) return res.status(404).send({success:false, message:'Product not found'}) 
        
        if(data.category){
            let categoryId = await Category.findOne({_id: data.category})
            if(!categoryId){
                return res.status(404).send({ success: false, message: 'Category not found' });  
            }
        }

        let editedProduct = await Product.findByIdAndUpdate(
            id, data, {new: true}
        )

        if(!editedProduct) return res.status(404).send({success: false, message: 'Product no found'})
            return res.send({status: true, message: 'Product Updated', editedProduct})

    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General Error', err})
    }
} 

export const getEspecificProduct = async(req,res) =>{
    try {
        let {name , category} = req.body    
        let productSearch = await Product.find(
            {
                $or:[
                    {name: name},
                    {category: category}
                ]
            }
        )
        if(productSearch.length === 0) return res.status(404).send({success: false, message:'Products not found for this filter'})
            return res.send({success: true, message:'Product Found',productSearch,total: productSearch.length})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const ceroStock  = async(req, res) =>{
    try {
        let stock = Product.stock
        let ostock = await Product.find({stock:0})
            console.log(ostock)
            
        if(ostock.length === 0) return res.send({success: false, message: 'Product 0 stock not found '})
            return res.send({success: true, message: 'Product 0 stock:', ostock})
            
    } catch (err) {
        console.error(err)  
        return res.status(500).send({success: false, message: 'General Error', err})
    }
}

export const deleteProduct = async(req,res) =>{
    try {
        let id = req.body.id
        
        let deleteProduct = await Product.deleteOne({_id:id})

        if(!deleteProduct) return res.status(404).send({success: false, message:'Product not found'})
            return res.send({success: true, message:'Product deleted' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}



