const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { JWT_SECRET, JWT_EXPIRY } = process.env;

const register = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  return token;
};

module.exports = { register, login };
