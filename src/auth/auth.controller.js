import { encrypt,checkPassword } from "../../utils/encrypt.js"
import {generatejwt} from '../../utils/jwt.js'

import User from "../user/user.model.js"

export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message:'Test is running'})
}


export const defaulttAdmin = async(req,res) =>{
    try {
        let defaultAdmin =  await User.findOne({name: 'admin'})
        if(!defaultAdmin)
            defaultAdmin = await User.create(
        {
            name: 'admin',
            surname: 'admin',
            username: 'ADMIN',
            email: 'admin@gmail.com',
            password: await encrypt(process.env.ADMIN_KEY),
            phone: '44778899',
            role: 'ADMIN'
        }
    ) 
    await defaultAdmin.save()
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const register = async(req,res) =>{
    try {
        let data = req.body

        let user = new User(data)
        user.role = 'CLIENT'
        user.status = true
        user.password = await encrypt(user.password)
        await user.save()

        return res.send({success: true, message:`Hello: ${user.username}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}

export const login = async(req,res) =>{
    try {
        let {userData, password} = req.body

        let user = await User.findOne(
            {
                $or:[
                    {email: userData},
                    {username: userData}
                ]
            }
        )
        if(user && await checkPassword(user.password,password)){
            let loggedUser ={   
                uid: user._id,
                username: user.username,
                role: user.role
            }
            let token = await generatejwt(loggedUser)
            
            return res.send({success: true, message:`Welcome again ${user.name}`,loggedUser,token})
        }
        return res.status(404).send({message: 'Wrong input information'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General error', err})
    }
}