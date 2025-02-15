import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name:{
            type: String,
            maxLenght: [30, 'Cant be overcome 30 characters'],
            required:[true, 'Name is required']
        },
        surname:{
            type: String,
            maxLenght: [30, 'Cant be overcome 30 surname'],
            required:[true, 'Surname is required']
        },
        username:{
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            maxLenght:[15, 'Cant be overcome 15 characters']
        },
        email:{
            type:String,
            unique: true,
            required: [true, 'Email is required']
        },
        password:{
            type: String,
            minLength:[8, 'Password must be 8 characters'],
            maxLenght:[100,'Cant be overcome 16 characters'],
            required:[true, 'Password is required'],
        },
        phone:{
            type: String,
            required:[true,'Phone is required'],
            maxLenght:[13,'Cant be overcome 8 numbers'],
            minLength:[8, 'Must be 8 characters']
        },
        role:{
            type:String,
            require:[true, 'Role is required'],
            uppercase:[true],
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

userSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject()
    return user
}

export default model('User', userSchema)