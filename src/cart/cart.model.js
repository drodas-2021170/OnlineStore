import { Schema, model } from "mongoose";

const cartSchema = model(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        product:[{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        subTotal:[{
            type: Number,
        }],
        total:[{
            type: Number
        }]
    }
)

export default model('Cart', cartSchema)