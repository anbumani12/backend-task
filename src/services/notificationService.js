const { Notification } = require('../models');

const createNotification = async (userId, message) => {
  const notification = await Notification.create({ user_id: userId, message });
  return notification;
};

const getNotificationsForUser = async (userId) => {
  const notifications = await Notification.findAll({ where: { user_id: userId } });
  return notifications;
};

const markNotificationAsRead = async (notificationId) => {
  const notification = await Notification.findByPk(notificationId);
  if (!notification) throw new Error('Notification not found');

  await notification.update({ is_read: true });
  return notification;
};

module.exports = { createNotification, getNotificationsForUser, markNotificationAsRead };
