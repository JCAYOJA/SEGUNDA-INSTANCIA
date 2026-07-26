import Task from '../entities/task.entity.js';

export const create = async (data) => {
  return await Task.create(data);
};

export const findAllByUser = async (userId) => {
  return await Task.findAll({
    where: {
      userId,
    },
    attributes: ['id', 'title', 'description', 'completed'],
    order: [['createdAt', 'DESC']],
  });
};

export const findById = async (id, userId) => {
  return await Task.findOne({
    where: {
      id,
      userId,
    },
    attributes: ['id', 'title', 'description', 'completed'],
  });
};

export const update = async (task, data) => {
  return await task.update(data);
};

export const remove = async (task) => {
  return await task.destroy();
};
