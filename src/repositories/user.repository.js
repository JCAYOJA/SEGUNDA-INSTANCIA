import User from '../entities/user.entity.js';

export const create = async (data) => {
  return await User.create(data);
};

export const findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};
