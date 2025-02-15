import User from "../src/user/user.model.js"

export const existUsername = async(username) =>{
    const userUsername = await User.findOne({username})
    if(userUsername){
        console.error(`Username: ${username} already exists`)
        throw new Error(`Username: ${username} already exists`)
    }
}

export const existEmail = async(email) =>{
    const userEmail = await User.findOne({email})
    if(userEmail){
        console.error(`Email: ${email} already exists`)
        throw new Error(`Email: ${email} already exists`)
    }
}

export const userDeleted = async(status) =>{
    const userStatus = await User.findOne({status:false})
    if(userStatus){
        console.error('This user is already deleted')
        throw new Error('This user is already deleted')
    }
}

export const existPhone = async(phone) =>{
    const userEmail = User.phone
    if(userEmail){
        console.error(`Email can not allowed to update`)
        throw new Error(`Email can not allowed to update`)
    }
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

