import User from './user.entity.js';
import Task from './task.entity.js';

User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
