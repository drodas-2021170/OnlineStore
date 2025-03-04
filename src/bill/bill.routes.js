import { Router } from "express"
import { getBill, getHystorial, getClientBills, updateBill, getAllBills } from "./bill.controller.js"
import { isAdmin, validateToken } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/getBill',[validateToken], getBill)
api.get('/',[validateToken,isAdmin],getClientBills)
api.get('/myHistorial',[validateToken],getHystorial)
api.get('/getAllBills',[validateToken, isAdmin], getAllBills)
api.put('/updateBill',[validateToken,isAdmin], updateBill)

export default api