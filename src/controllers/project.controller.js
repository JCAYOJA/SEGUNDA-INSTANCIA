import projectService from '../services/project.service.js';

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user_id = req.user.id; 

    const newProject = await projectService.createProject({ name, description, user_id });

    return res.status(201).json({
      success: true,
      message: "Proyecto creado",
      data: {
        id: newProject.id,
        name: newProject.name,
        description: newProject.description,
        status: newProject.status
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error al crear el proyecto", error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const user_id = req.user.id;
    const projects = await projectService.getAllProjects(user_id);
    return res.status(200).json({ success: true, message: "Proyectos obtenidos", data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error al obtener los proyectos", error: error.message });
  }
};

// 🚀 OPTIMIZADO: Envía el user_id para control relacional seguro y delega errores al middleware global
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id; // Extraído por tu middleware authenticate

    const project = await projectService.getProjectById(id, user_id);
    
    return res.status(200).json({ 
      success: true, 
      message: "Proyecto obtenido con sus tareas", 
      data: project 
    });
  } catch (error) {
    next(error); // Permite que tu AppError 404 sea manejado de manera centralizada
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await projectService.updateProject(id, req.body);
    if (!updatedProject) return res.status(404).json({ success: false, message: "Proyecto no encontrado" });
    return res.status(200).json({ success: true, message: "Proyecto actualizado", data: updatedProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error al actualizar el proyecto", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await projectService.deleteProject(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Proyecto no encontrado" });
    return res.status(200).json({ success: true, message: "Proyecto eliminado", data: null });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error al eliminar el proyecto", error: error.message });
  }
};
