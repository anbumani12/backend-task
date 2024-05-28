const { User } = require('../models');

const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = { getUserById, getAllUsers };
