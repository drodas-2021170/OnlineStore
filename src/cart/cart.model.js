import { Schema, model } from "mongoose";

const cartSchema = Schema(
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
        subTotal:{
            type: Number,
            default: 0
        },
        status:{
            type:String,
            enum:['COMPLETE', 'PENDIENT'],
            default: 'PENDIENT'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default model('Cart', cartSchema)