import { Router } from 'express';
import * as taskController from '../controllers/task.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas de este módulo requieren autenticación por token Bearer de forma global
router.use(authenticate);

/**
 * @swagger
 * /tasks/{projectId}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Obtener todas las tareas de un proyecto con paginación
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista paginada de tareas devuelta con éxito
 */
router.get('/:projectId', taskController.getPaginatedTasks);

/**
 * @swagger
 * /tasks/{projectId}:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Crear una nueva tarea en un proyecto
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea asignada al proyecto con éxito
 */
router.post('/:projectId', validate, taskController.createTask);

/**
 * @swagger
 * /tasks/{projectId}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Actualizar una tarea perteneciente a un proyecto
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *             properties:
 *               taskId:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea modificada con éxito
 */
router.patch('/:projectId', validate, taskController.updateTask);

/**
 * @swagger
 * /tasks/{projectId}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Eliminar una tarea de un proyecto
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *             properties:
 *               taskId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Tarea eliminada del sistema
 */
router.delete('/:projectId', validate, taskController.deleteTask);

/**
 * @swagger
 * /tasks/{projectId}/complete:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Marcar una tarea de un proyecto como completada
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *             properties:
 *               taskId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Estado de la tarea modificado a completado
 */
router.patch('/:projectId/complete', validate, taskController.completeTask);

export default router;
