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
