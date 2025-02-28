import { Schema, model } from "mongoose"

const billSchema = Schema(
    {
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