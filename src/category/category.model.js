import { Schema, model } from "mongoose";

const categorySchema = Schema(
    {
        name:{
            type: String,
            maxLenght:[25, 'Cant be overcome 25 characters'],
            required:[true,'Name is requiered']
        },
        description:{
            type: String,
            maxLenght:[25, 'Cant be overcome 25 characters'],
            required:[true,'Name is requiered']
        }
    }
)

categorySchema.methods.toJSON = function(){
    const {__v, ...category} = this.toObject()//Sirve para convertir un documento de MONGODB a objeto de JS
    return category
} 
export default model('Category',categorySchema)