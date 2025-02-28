'use strict'
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import productRoutes from "../src/product/product.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import billRoutes from "../src/bill/bill.routes.js"

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app) =>{
    app.use('/v1/auth',authRoutes)
    app.use('/v1/user',userRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/cart', cartRoutes)
    app.use('/v1/bill', billRoutes)
}

export const initServer = async() =>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log('Server running' + `${process.env.PORT}`)
    } catch (err) {
        console.error('Sever init failed', err)
    }
}