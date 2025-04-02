const NotificationService = require('../service/NotificationService');

const notificationController = {
  async getAll(req, res, next) {
    try {
      const userId = req.user?.id;
      const notifications = await NotificationService.getNotificationsForUser(userId);
      res.json(notifications);
    } catch (err) {
      next(err);
    }
  },

  async getUnread(req, res, next) {
    try {
      const userId = req.user?.id;
      const unread = await NotificationService.getUnreadNotificationsForUser(userId);
      res.json(unread);
    } catch (err) {
      next(err);
    }
  },

  async markAsRead(req, res, next) {
    try {
      const updated = await NotificationService.markNotificationAsRead(req.params.id);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async markAllAsRead(req, res, next) {
    try {
      const userId = req.user?.id;
      const result = await NotificationService.markAllNotificationsAsRead(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async deleteOne(req, res, next) {
    try {
      const result = await NotificationService.deleteNotification(req.params.id);
      res.json({ success: true, deleted: result });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = notificationController;
