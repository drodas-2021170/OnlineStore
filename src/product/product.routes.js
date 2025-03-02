import { Router } from "express";
import { isAdmin, validateToken } from "../../middlewares/validate.jwt.js"
import { addProduct, getAll, updateProduct,ceroStock, deleteProduct, getEspecificProduct, getMostProduct} from "./product.controller.js"
import { createAddValidate, deleteProductValidate, getEspecificProductValidate, updateProductValidate } from "../../middlewares/validators.js";

const api = Router()

//PRIVATE ROUTES
api.post('/addProduct', [validateToken,isAdmin, createAddValidate], addProduct)

api.get('/getStock',[validateToken,isAdmin], ceroStock)
api.put('/updatedProduct',[validateToken,isAdmin,updateProductValidate], updateProduct)

api.delete('/deletedProduct', [validateToken,isAdmin, deleteProductValidate],deleteProduct)

//PUBLIC ROUTES
api.get('/',[validateToken],getAll)
api.get('/getMostProducts', [validateToken], getMostProduct)
api.get('/getEspecificProduct', [validateToken, getEspecificProductValidate],getEspecificProduct)
export default api