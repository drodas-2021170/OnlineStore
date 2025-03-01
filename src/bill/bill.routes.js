import { Router } from "express"
import { getBill, getMyBill } from "./bill.controller.js"
import { validateToken } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/getBill',[validateToken], getBill)
api.get('/',[validateToken],getMyBill)

export default api