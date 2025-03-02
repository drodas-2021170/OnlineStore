import { Router } from "express"
import { getBill, getHystorial, getMyBill } from "./bill.controller.js"
import { isAdmin, validateToken } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/getBill',[validateToken, isAdmin], getBill)
api.get('/',[validateToken],getMyBill)
api.get('/myHistorial',[validateToken],getHystorial)

export default api