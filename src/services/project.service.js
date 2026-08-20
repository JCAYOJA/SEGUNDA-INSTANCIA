import projectRepository from '../repositories/project.repository.js';
import { AppError } from '../utils/AppError.js'; // Importamos tu clase de errores

class ProjectService {
  async createProject(data) {
    // Aquí va la lógica de negocio si el profesor pide validar algo más
    return await projectRepository.create(data);
  }

  async getAllProjects(user_id) {
    return await projectRepository.findAllByUserId(user_id);
  }

  // 🚀 OPTIMIZADO: Envía el user_id para control de seguridad y maneja el error 404
  async getProjectById(id, user_id) {
    const project = await projectRepository.findByIdWithTasks(id, user_id);

    if (!project) {
      throw new AppError('Proyecto no encontrado', 404);
    }

    return project;
  }

  async updateProject(id, data) {
    return await projectRepository.update(id, data);
  }

  async deleteProject(id) {
    return await projectRepository.delete(id);
  }
}

export default new ProjectService();
