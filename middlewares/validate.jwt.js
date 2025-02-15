
'use strict'

import jwt from "jsonwebtoken"

export const validateToken = async(req, res, next) =>{
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({success: false, message: 'You must be logged in'})
        let user = jwt.verify(authorization,secretKey)
        req.user = user
        next()
        } catch (err) {
        console.error(err)
        return res.status(401).send({success: false, message: 'Invalid Token'})
    }
}

export const validateRole = async (req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        
        if (!authorization) return res.status(401).send({ message: 'You are not loggin' })

        let user = jwt.verify(authorization, secretKey);

        req.user = user 
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'Invalid Token' })
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user  || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: 'Only Admins can access to this option'
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send({success: false,message: 'Unauthorized role'})
    }
}
export const isClient = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user  || user.role !== 'CLIENT') return res.status(403).send(
            {
                success: false,
                message: 'Only Clients can access to this option'
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send({success: false,message: 'Unauthorized role'})
    }
}


