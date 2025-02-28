import { Router } from "express"
import { getBill } from "./bill.controller.js"
import { validateToken } from "../../middlewares/validate.jwt.js"

const api = Router()

api.get('/getBill',[validateToken], getBill)

export default api