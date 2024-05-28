const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProfile };
