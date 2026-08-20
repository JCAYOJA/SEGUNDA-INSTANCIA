import * as taskService from '../services/task.service.js';
import { successResponse } from '../utils/response.js';

// 🚀 ADAPTADO: Obtener tareas de un proyecto específico con paginación
export const getPaginatedTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params; // Extraído de la URL /tasks/:projectId
    const { page, limit } = req.query; // Extraídos de los query params (?page=1&limit=5)
    const userId = req.user.id;

    // Ejecutar lógica enviando el projectId para filtrar
    const { tasks, pagination } = await taskService.getPaginatedTasks(userId, page, limit, projectId);

    return res.status(200).json({
      success: true,
      message: 'Tareas del proyecto obtenidas con paginación',
      meta: pagination,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// 🚀 ADAPTADO: Crear tarea asociándola de forma obligatoria al proyecto de la URL
export const createTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const task = await taskService.createTask({
      ...req.body,
      userId,
      project_id: projectId, // Vinculación directa al proyecto de la ruta
    });

    return successResponse(res, task, 'Tarea creada con éxito en el proyecto', 201);
  } catch (error) {
    next(error);
  }
};

// 🚀 ADAPTADO: Actualizar una tarea validando el contexto del proyecto
export const updateTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { taskId } = req.body; // Se envía el ID de la tarea a modificar en el cuerpo
    const { title, description } = req.body;
    const userId = req.user.id;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    // El servicio procesa la actualización usando el taskId verificado
    const task = await taskService.updateTask(taskId, userId, updateData);

    return successResponse(res, task, 'Tarea actualizada correctamente');
  } catch (error) {
    next(error);
  }
};

// 🚀 ADAPTADO: Eliminar una tarea enviando el ID por el cuerpo o query params
export const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.body; // O de req.query según prefieras estructurar tu JSON
    const userId = req.user.id;

    await taskService.deleteTask(taskId, userId);

    return successResponse(res, null, 'Tarea eliminada con éxito del proyecto');
  } catch (error) {
    next(error);
  }
};

// 🚀 ADAPTADO: Marcar tarea como completada usando el identificador correcto
export const completeTask = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    const userId = req.user.id;

    const task = await taskService.completeTask(taskId, userId);

    return successResponse(res, task, 'Tarea marcada como completada');
  } catch (error) {
    next(error);
  }
};
