import Project from '../entities/project.entity.js';
import Task from '../entities/task.entity.js';

class ProjectRepository {
  async create(data) {
    return await Project.create(data);
  }

  async findAllByUserId(user_id) {
    return await Project.findAll({ where: { user_id } });
  }

  async findByIdWithTasks(id) {
    return await Project.findByPk(id, {
      include: [{ model: Task, as: 'tasks' }]
    });
  }

  async findById(id) {
    return await Project.findByPk(id);
  }

  async update(id, data) {
    const project = await Project.findByPk(id);
    if (!project) return null;
    return await project.update(data);
  }

  async delete(id) {
    const project = await Project.findByPk(id);
    if (!project) return false;
    await project.destroy();
    return true;
  }
}

export default new ProjectRepository();
