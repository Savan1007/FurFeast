const notificationService = require('../service/NotificationService');

const NotificationUtil = {
  async notifyUsers({ userIds = [], type = 'info', message, context = {} }) {
    try {
      if (!userIds.length) return;

      await notificationService.createNotification({
        targetUsers: userIds,
        type,
        message,
        context
      });
    } catch (error) {
      console.error(`Util Error: NotificationUtil.notifyUsers - ${error.message}`);
      throw error;
    }
  },

  async notifyRoles({ roles = [], type = 'info', message, context = {} }) {
    try {
      if (!roles.length) return;

      await notificationService.createNotification({
        targetRoles: roles,
        type,
        message,
        context
      });
    } catch (error) {
      console.error(`Util Error: NotificationUtil.notifyRoles - ${error.message}`);
      throw error;
    }
  },

  async notifySingleUser(userId, message, type = 'info', context = {}) {
    return this.notifyUsers({ userIds: [userId], type, message, context });
  },

  async notifyAdmins(message, type = 'info', context = {}) {
    return this.notifyRoles({ roles: ['admin'], type, message, context });
  }
};

module.exports = NotificationUtil;
