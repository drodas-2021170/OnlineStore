import Category from "./category.model.js"
import Product from "../product/product.model.js"



export const addDefaultCategory = async(req,res) =>{
    try {
        let categoryDef = await Category.findOne({name: 'Default Category'})
        if(!categoryDef)
            categoryDef = await Category.create(
        {
            name: 'Default Category',
            description: 'Default category for all products'
        }
    )
    await categoryDef.save()
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}
export const addCategory = async(req, res) =>{
    try {
    
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({success: true,message: 'Category saved', category})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}

export const getAll = async(req, res) =>{
    try {
        const {limit, skip} = req.body
        let categories = await Category.find()
            .skip(skip)
            .limit(limit)
        if(!categories) return res.status(404).send({success: false, message:'Products not found'})
            return res.send({success: true, message:'Products found', categories, total: categories.length})
        } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General Error'})
    }
}

export const updateCategory = async(req,res) =>{
    try {
       
        let id = req.body.id
        let data = req.body

        let categoryId = await Category.findOne({_id: id})
        if(!categoryId) return res.status(404).send({success: false, message: 'Id not found'})
        
        if(categoryId.name === 'Default Category') return res.status(403).send({success: false, message:'You can not update default category'})    
        let updatedCategory = await Category.findByIdAndUpdate(
            id, 
            data, 
            {new:true}
        )
            
        if(!updatedCategory)   return res.status(404).send({success: false, message:' User updated not updated'})
            return res.send({success: true, message:'User updated', updatedCategory})
    
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message: 'General Error',err})
    }
}

export const deleteCategory = async(req,res) =>{
    try{

        let id = req.body.id

        let categoryId = await Category.findOne({_id:id})

        if(!categoryId) return res.status(404).send({success: false, message: 'Category not found'})

        let defaultCategory = await Category.findOne({ name: 'Default Category' });

        await Product.updateMany(
            { category: id }, 
            { category: defaultCategory._id }
        );

        let deletedCategory = await Category.deleteOne({_id: id})
        if(deletedCategory.deletedCount <=0) return res.status(404).send({success: false, message: 'Category not deleted'})
            return res.send({success: true, message: 'Category deleted', deleteCategory})

    }catch(err){
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}


