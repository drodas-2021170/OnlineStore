import { Router } from "express"
import { isAdmin, validateToken,isClient} from "../../middlewares/validate.jwt.js"
import { deleteClient, deleteUser, editRole, updateUser, updateUserClient } from "./user.controller.js"
import { deleteUserValidate, updateRoleValidate, updateUserValidate } from "../../middlewares/validators.js"

const api = Router()
//Private Routes ADMIN
api.put('/updateRole', [validateToken,isAdmin, updateRoleValidate],editRole)
api.put('/updateUser', [validateToken,isAdmin, updateUserValidate],updateUser)
api.delete('/deleteUser',[validateToken,isAdmin, deleteUserValidate], deleteUser)

//PRIVATE ROUTES CLIENT
api.put('/updateClient',[validateToken,isClient,updateUserValidate], updateUserClient)
api.delete('/deleteCLIENT', [validateToken], deleteClient)
export default api