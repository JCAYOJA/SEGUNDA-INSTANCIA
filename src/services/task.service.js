import * as repository from '../repositories/task.repository.js';
import { AppError } from '../utils/AppError.js';

export const createTask = async (data) => {
  return await repository.create(data);
};

export const findAllTasks = async (userId) => {
  return await repository.findAllByUser(userId);
};

export const getTask = async (id, userId) => {
  const task = await repository.findById(id, userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return task;
};

export const updateTask = async (id, userId, data) => {
  const task = await repository.findById(id, userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, data);
};

export const deleteTask = async (id, userId) => {
  const task = await repository.findById(id, userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  await repository.remove(task);
};

export const completeTask = async (id, userId) => {
  const task = await repository.findById(id, userId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, {
    completed: true,
  });
};

// 🚀 NUEVA FUNCIÓN: Implementación de la investigación de paginado
export const getPaginatedTasks = async (userId, pageParam, limitParam) => {
  // 1. Convertir parámetros a enteros y definir valores por defecto
  const page = parseInt(pageParam, 10) || 1;
  const limit = parseInt(limitParam, 10) || 10;

  // 2. Aplicar la fórmula matemática investigada para calcular el desplazamiento (offset)
  const offset = (page - 1) * limit;

  // 3. Consultar los datos y conteo total llamando a la nueva función del repositorio
  const { count: totalItems, rows: tasks } = await repository.findAllPaginated(userId, limit, offset);

  // 4. Calcular el total de páginas usando Math.ceil()
  const totalPages = Math.ceil(totalItems / limit);

  // Retornar los datos estructurados con su metadata de control
  return {
    tasks,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    }
  };
};
