import { Schema, model } from "mongoose"

const productSchema = Schema (   
    {
        name:{
            type: String,
            maxLenght:[25, 'Cant be overcome 25 characters'],
            required: [true, 'Name is required']
        },
        description:{
            type: String,
            maxLenght:[100, 'Cant be overcome 100 characters'],
            required:[true, 'Description is required']
        },
        price:{
            type: Number,
            required:[true, 'Price is required']
        },
        stock:{
            type: Number,
            required:[true, 'Stock number is required']
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        status:{
            type: Boolean,
            default: true
        }
    }
)

productSchema.methods.toJSON = function(){
    const {__v, ...product} = this.toObject()
    return product
}

export default model('Product', productSchema)