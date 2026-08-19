import User from './user.entity.js';
import Project from './project.entity.js'; // El que acabamos de crear
import Task from './task.entity.js';

// Relación 1:N entre User y Project
User.hasMany(Project, { foreignKey: 'user_id', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Relación 1:N entre Project y Task
Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

export { User, Project, Task };
