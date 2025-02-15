import { Router } from "express"
import { isAdmin, validateToken,isClient} from "../../middlewares/validate.jwt.js"
import { deleteUser, editRole, updateUser, updateUserClient } from "./user.controller.js"
import { updateRoleValidate } from "../../middlewares/validators.js"

const api = Router()
//Private Routes ADMIN
api.put('/updateRole', [validateToken,isAdmin, updateRoleValidate],editRole)
api.put('/updateUser', [validateToken,isAdmin],updateUser)
api.put('/deleteUser',[validateToken,isAdmin], deleteUser)

//PRIVATE ROUTES CLIENT
api.put('/updateClient',[validateToken,isClient], updateUserClient)

export default api