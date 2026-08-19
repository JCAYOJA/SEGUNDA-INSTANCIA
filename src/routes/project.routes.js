import { Router } from 'express';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { 
  createProjectValidator, 
  updateProjectValidator, 
  getProjectByIdValidator 
} from '../validators/project.validator.js';

const router = Router();

// Todas las rutas de proyectos requieren autenticación (Bearer Token)
router.use(authenticate);

/**
 * @openapi
 * /projects:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sistema de Control de Inventarios"
 *               description:
 *                 type: string
 *                 example: "Backend desarrollado en Node.js para la gestión de stocks"
 *     responses:
 *       201:
 *         description: Proyecto creado con éxito
 *       400:
 *         description: Error de validación en los campos enviados
 *       401:
 *         description: No autorizado (Token faltante o inválido)
 *       500:
 *         description: Error interno del servidor
 *   get:
 *     summary: Obtener todos los proyectos del usuario autenticado
 *     tags: [Proyectos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de proyectos obtenido con éxito
 *       401:
 *         description: No autorizado (Token faltante o inválido)
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createProjectValidator, validationMiddleware, createProject);
router.get('/', getProjects);

/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID con todas sus tareas
 *     tags: [Proyectos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID único del proyecto
 *     responses:
 *       200:
 *         description: Datos del proyecto obtenidos junto con sus tareas relacionadas
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Actualizar un proyecto
 *     tags: [Proyectos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID único del proyecto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nombre del Proyecto Modificado"
 *               description:
 *                 type: string
 *                 example: "Nueva descripción del proyecto"
 *               status:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Proyecto actualizado con éxito
 *       400:
 *         description: Formato de ID o campos inválidos
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error interno del servidor
 *   delete:
 *     summary: Eliminar un proyecto (soft delete)
 *     tags: [Proyectos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID único del proyecto a eliminar
 *     responses:
 *       200:
 *         description: Proyecto eliminado con éxito
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getProjectByIdValidator, validationMiddleware, getProjectById);
router.put('/:id', updateProjectValidator, validationMiddleware, updateProject);
router.delete('/:id', getProjectByIdValidator, validationMiddleware, deleteProject);

export default router;
