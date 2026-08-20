import * as taskService from '../services/task.service.js';
import { successResponse } from '../utils/response.js';

export const getAllTasks = async (req, res) => {
  const tasks = await taskService.findAllTasks(req.user.id);

  return successResponse(res, tasks, 'Tareas obtenidas');
};

export const createTask = async (req, res) => {
  const task = await taskService.createTask({
    ...req.body,
    userId: req.user.id,
  });

  return successResponse(res, task, 'Tarea creada', 201);
};

export const getTask = async (req, res) => {
  const task = await taskService.getTask(req.params.id, req.user.id);

  return successResponse(res, task, 'Tarea obtenida');
};

export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;

  const task = await taskService.updateTask(
    req.params.id,
    req.user.id,
    updateData
  );

  return successResponse(res, task, 'Tarea actualizada');
};

export const deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user.id);

  return successResponse(res, null, 'Tarea eliminada');
};

export const completeTask = async (req, res) => {
  const task = await taskService.completeTask(req.params.id, req.user.id);

  return successResponse(res, task, 'Tarea completada');
};

// 🚀 NUEVA FUNCIÓN: Implementación del controlador de paginado
export const getPaginatedTasks = async (req, res, next) => {
  try {
    // 1. Extraer los query params de la URL (?page=2&limit=5)
    const { page, limit } = req.query;
    const userId = req.user.id;

    // 2. Ejecutar la lógica de negocio estructurada en el servicio
    const { tasks, pagination } = await taskService.getPaginatedTasks(userId, page, limit);

    // 3. Responder usando tu helper, incluyendo los datos y la metadata de paginación
    return res.status(200).json({
      success: true,
      message: 'Tareas obtenidas con paginación',
      meta: pagination,
      data: tasks
    });
  } catch (error) {
    next(error); // Envía cualquier error inesperado al middleware global
  }
};
