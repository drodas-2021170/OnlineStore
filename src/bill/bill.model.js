import { Schema, model } from "mongoose"

const billSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        product:[
            {
                products:{   
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity:{
                    type:Number,
                },
                price:{
                    type:Number
                }
        }],
        cart:{
            type: Schema.Types.ObjectId,
            ref: 'Cart'
        },
        total:{
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Bill', billSchema)