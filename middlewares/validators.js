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

export const updateUserValidate =[
    body('name', 'Name cannot be empty').optional().notEmpty(),
    body('surname', 'Surnanme cannot be empty').optional().notEmpty(),
    body('username', 'Username cannot be empty').optional().notEmpty(),
    body('email', 'Email cannot be empty').optional().notEmpty(),
    body('phone', 'Phone cannto be empty').optional().notEmpty(),
    validateErrors
]

export const deleteUserValidate =[
    body('id', 'Introduce an ID for delete the user').notEmpty(),
    validateErrors
]

export const createCategoryValidate =[
    body('name', 'Name canntot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    validateErrors
]

export const updateCategoryValidate =[
    body('name', 'Name canntot be empty').optional().notEmpty(),
    body('description', 'Description cannot be empty').optional().notEmpty(),
    validateErrors
]

export const deleteCategoryValidate =[
    body('id', 'Introduce an ID for delete the category').notEmpty(),
    validateErrors
]

export const createAddValidate =[
    body('name', 'Name is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('price', 'Price is required').notEmpty(),
    body('stock', 'Stock is required').notEmpty(),
    body('category', 'Category is required').notEmpty(),
    validateErrors
]

export const getEspecificProductValidate =[
    body('name', 'Name is required').optional().notEmpty(),
    body('category', 'Category is required').optional().notEmpty(),
    validateErrors
]

export const updateProductValidate =[
    body('id', 'Id is required').notEmpty(),
    body('name', 'Name is required').optional().notEmpty(),
    body('description', 'Description is required').optional().notEmpty(),
    body('price', 'Price is required').optional().notEmpty(),
    body('stock', 'Stock is required').optional().notEmpty(),
    validateErrors
]

export const deleteProductValidate =[
    body('id', 'Introduce an ID for delete the Product').notEmpty(),
    validateErrors
]

export const addCartValidate =[
    body('products', 'Introduce the id Product').notEmpty(),
    body('quantity', 'Quantity is required').notEmpty().isInt({min:1}).withMessage('Please 1 product for min'),
    validateErrors
]