import { Router } from "express"
import { validateToken } from "../../middlewares/validate.jwt.js"
import { addCart, getCart } from "./cart.controller.js"
import { addCartValidate } from "../../middlewares/validators.js"

const api = Router()

api.post('/addCart', [validateToken, addCartValidate], addCart) 
api.get('/', getCart)

export default api