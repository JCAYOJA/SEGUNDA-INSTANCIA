import Project from '../entities/project.entity.js';
import Task from '../entities/task.entity.js';

class ProjectRepository {
  async create(data) {
    return await Project.create(data);
  }

  async findAllByUserId(user_id) {
    return await Project.findAll({ where: { user_id } });
  }

  // 🚀 OPTIMIZADO: Implementación de la investigación 3.2 con atributos y seguridad de usuario
  async findByIdWithTasks(id, user_id) {
    return await Project.findOne({
      where: { 
        id, 
        user_id // Seguridad: Valida que pertenezca al usuario autenticado
      },
      attributes: ['id', 'name', 'description', 'createdAt'], // Atributos específicos del proyecto
      include: [
        { 
          model: Task, 
          as: 'tasks', // Alias obligatorio definido en associations.js
          attributes: ['id', 'title', 'description', 'completed', 'createdAt'] // Atributos específicos de la relación
        }
      ]
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
