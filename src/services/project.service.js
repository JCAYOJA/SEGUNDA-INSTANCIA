import projectRepository from '../repositories/project.repository.js';

class ProjectService {
  async createProject(data) {
    // Aquí va la lógica de negocio si el profesor pide validar algo más
    return await projectRepository.create(data);
  }

  async getAllProjects(user_id) {
    return await projectRepository.findAllByUserId(user_id);
  }

  async getProjectById(id) {
    return await projectRepository.findByIdWithTasks(id);
  }

  async updateProject(id, data) {
    return await projectRepository.update(id, data);
  }

  async deleteProject(id) {
    return await projectRepository.delete(id);
  }
}

export default new ProjectService();
