import { Router } from "express"
import { login, register, test } from "./auth.controller.js"
import { loginValidate, registerValidate } from "../../middlewares/validators.js"

const api = Router()

api.get('/', test)

//PUBLIC ROUTES
api.post('/register',[registerValidate], register)

api.post('/login', [loginValidate],login)


export default api