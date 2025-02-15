import { Router } from "express"
import { addCategory, deleteCategory, getAll, updateCategory } from "./category.controller.js"
import { isAdmin, validateToken } from "../../middlewares/validate.jwt.js"

const api = Router()

//PRIVATE ROUTES
api.post('/addCategory', [validateToken,isAdmin],addCategory)

api.get('/', [validateToken,isAdmin], getAll)

api.put('/updateCategory',[validateToken,isAdmin], updateCategory)

api.delete('/deleteCategory',[validateToken,isAdmin], deleteCategory)
export default api