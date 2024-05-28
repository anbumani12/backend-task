const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    const foundUser = await User.findByPk(user.id);
    if (!foundUser) return res.sendStatus(403);

    req.user = foundUser;
    next();
  });
};

module.exports = authenticateToken;
