import { Router } from "express"
import { validateToken } from "../../middlewares/validate.jwt.js"
import { addCart } from "./cart.controller.js"

const api = Router()

api.post('/addCart', [validateToken], addCart) 

export default api