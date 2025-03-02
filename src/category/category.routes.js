import { Router } from "express"
import { addCategory, deleteCategory, getAll, updateCategory } from "./category.controller.js"
import { isAdmin, validateToken } from "../../middlewares/validate.jwt.js"
import { createCategoryValidate, deleteCategoryValidate, updateCategoryValidate } from "../../middlewares/validators.js"

const api = Router()

//PRIVATE ROUTES
api.post('/addCategory', [validateToken,isAdmin , createCategoryValidate],addCategory)

api.get('/', [validateToken,isAdmin], getAll)

api.put('/updateCategory',[validateToken,isAdmin, updateCategoryValidate], updateCategory)

api.delete('/deleteCategory',[validateToken,isAdmin,deleteCategoryValidate], deleteCategory)
export default api