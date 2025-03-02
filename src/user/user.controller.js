'use strict'
import { checkPassword } from '../../utils/encrypt.js'
import User from '../user/user.model.js'

export const editRole = async(req, res) =>{
    try {
        
        const {id, roleUser} = req.body
        
        let userId = await User.findById(id)

        if(!userId) return res.status(404).send({success:false, message: 'User not found'})
        
        if(roleUser === 'CLIENT') return res.status(400).send({success:false, message:'You cannot change the role to client to another Admin'})


        let userUpdated = await User.findByIdAndUpdate(
                id,{role: roleUser},{new: true}
            )
        return res.send({success: true, message: 'Role updated', userUpdated})
        

        } catch (err) {
        console.error('General Error', err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
} 

export const updateUser = async(req,res) =>{
    try {
        let id = req.body.id
        
        let data = req.body

        let userId = await User.findById(id)
        console.log(userId)
        if(!userId) return res.status(404).send({success:false, message: 'User not found'})

        if(data.role || data.username || data.password) return res.status(404).send({success: false, message:'Those information should not be here, check if you put password, role or username'})
        
        let updateUser = await User.findByIdAndUpdate(
            userId.id, data, {new:true}
        )

        return res.send({success: true, message:'User updated', updateUser})

    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const deleteUser = async(req,res) =>{
    try {
        let {id, status} = req.body
        
        let duserId = await User.findById(id)
       
        console.log(duserId)
        if(!duserId)return res.status(404).send({success: false, message:'User not found'})

        let updateUser = await User.findByIdAndUpdate(
            duserId.id, {status:false}, {new:true}
        )
        
        return res.send({success: true, message:'User delete'})

    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const updateUserClient = async(req,res) =>{
    try {
        let data = req.body

        if(data.id) return res.status(404).send({success:false, message:'You can only edit your own profile'})

        if(data.role || data.username || data.password) return res.status(404).send({success: false, message:'Those information should not be here, check if you put password, role or username'})   
        
            let updatedUser = await User.findByIdAndUpdate(
            req.user.uid, data, {new:true}
        ) 
        return res.send({success:true, message: 'User update', updatedUser})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General Error', err})
    }
}


export const deleteClient = async(req, res) =>{
    try {
        let {password} = req.body

        let userI = await User.findById(req.user.uid)

        let match = await checkPassword(userI.password, password)

        if(!match) return res.status(404).send({sucess:false, message:'Incorrect Password'})
        
        let deleteClient = await User.findByIdAndUpdate(userI.id, {status: false})
        return res.send({success:true, message:'Cliente deleted'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}
