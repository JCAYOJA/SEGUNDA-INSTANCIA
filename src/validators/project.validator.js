import { body, param } from 'express-validator';

export const createProjectValidator = [
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser un texto')
    .isLength({ max: 255 }).withMessage('El nombre no debe exceder los 255 caracteres'),
  
  body('description')
    .notEmpty().withMessage('La descripción es requerida')
    .isString().withMessage('La descripción debe ser un texto'),
];

export const updateProjectValidator = [
  param('id')
    .isUUID().withMessage('Formato de ID de proyecto inválido'),
  
  body('name')
    .optional()
    .isString().withMessage('El nombre debe ser un texto')
    .isLength({ max: 255 }).withMessage('El nombre no debe exceder los 255 caracteres'),
  
  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser un texto'),
  
  body('status')
    .optional()
    .isString().withMessage('El estado debe ser un texto')
    .isLength({ max: 50 }).withMessage('El estado no debe exceder los 50 caracteres'),
];

export const getProjectByIdValidator = [
  param('id')
    .isUUID().withMessage('Formato de ID de proyecto inválido'),
];
