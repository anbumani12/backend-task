const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.update({ is_read: true }, { where: { user_id: req.user.id, is_read: false } });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getNotifications, markNotificationsAsRead };
