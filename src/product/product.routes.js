import { Router } from "express";
import { isAdmin, validateToken } from "../../middlewares/validate.jwt.js"
import { addProduct, getAll, updateProduct,ceroStock, deleteProduct} from "./product.controller.js"

const api = Router()

//PRIVATE ROUTES
api.post('/addProduct', [validateToken], addProduct)

api.get('/',[validateToken,isAdmin],getAll)

api.get('/getStock',[validateToken,isAdmin], ceroStock)
api.put('/updatedProduct',[validateToken,isAdmin], updateProduct)

api.put('/deletedProduct', [validateToken,isAdmin],deleteProduct)

export default api