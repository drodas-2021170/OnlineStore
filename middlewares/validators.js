import { body } from "express-validator"
import { validateErrors } from "./validate.error.js"
import { existUsername,existEmail } from "./db.validators.js"

export const registerValidate = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('username', 'Username cannot be empty').notEmpty().custom(existUsername),
    body('email', 'Email cannot be empty').notEmpty().custom(existEmail),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong'),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone().isLength({min: 8}),
    validateErrors
]

export const loginValidate = [
    body('userData', 'Userdata cannot be empty').notEmpty(),
    body('password', 'Password cannot be empty').notEmpty(),
    validateErrors
]

export const updateRoleValidate =[
    body('role', 'Role cannot be empty').optional().notEmpty(),
    validateErrors
]

/*export const updateUserValidate =[
    body('name', 'Name cannot be empty').optional().notEmpty(),
    body('surname', 'Surnanme cannot be empty').optional().notEmpty(),
    
]*/