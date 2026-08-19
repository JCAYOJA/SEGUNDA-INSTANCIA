import { Router } from 'express';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js'; // Importado para procesar express-validator
import { 
  createProjectValidator, 
  updateProjectValidator, 
  getProjectByIdValidator 
} from '../validators/project.validator.js'; // Importados tus nuevos validadores

const router = Router();

// Todas las rutas de proyectos requieren autenticación (Bearer Token)
router.use(authenticate);

// Rutas protegidas y validadas paso a paso
router.post('/', createProjectValidator, validationMiddleware, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectByIdValidator, validationMiddleware, getProjectById);
router.put('/:id', updateProjectValidator, validationMiddleware, updateProject);
router.delete('/:id', getProjectByIdValidator, validationMiddleware, deleteProject);

export default router;
