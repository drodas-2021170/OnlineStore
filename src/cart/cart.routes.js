import { Router } from "express"
import { validateToken } from "../../middlewares/validate.jwt.js"
import { addCart, getCart } from "./cart.controller.js"

const api = Router()

api.post('/addCart', [validateToken], addCart) 
api.get('/', getCart)

export default api