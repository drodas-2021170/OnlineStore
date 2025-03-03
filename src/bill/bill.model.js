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
                name:{
                    type:String
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
        status:{
            type: String,
            enum:['ANULED', 'PERMITED'],
            default: 'PERMITED' 
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Bill', billSchema)