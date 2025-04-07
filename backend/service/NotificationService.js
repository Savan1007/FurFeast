const NotificationDAO = require('../dao/NotificationDao');
const User = require('../models/Users');

class NotificationService {
  async createNotification(data) {
    try {
      return await NotificationDAO.create(data);
    } catch (error) {
      console.error(`Service Error: NotificationService.createNotification - ${error.message}`);
      throw error;
    }
  }

  async getNotificationsForUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      

      return await NotificationDAO.findByTargetUser(userId);
    } catch (error) {
      console.error(`Service Error: NotificationService.getNotificationsForUser - ${error.message}`);
      throw error;
    }
  }

  async getUnreadNotificationsForUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      return await NotificationDAO.findUnreadByTargetUser(userId);
    } catch (error) {
      console.error(`Service Error: NotificationService.getUnreadNotificationsForUser - ${error.message}`);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId) {
    try {
      const updated = await NotificationDAO.markAsRead(notificationId);
      if (!updated) {
        throw new Error('Notification not found');
      }
      return updated;
    } catch (error) {
      console.error(`Service Error: NotificationService.markNotificationAsRead - ${error.message}`);
      throw error;
    }
  }

  async markAllNotificationsAsRead(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      return await NotificationDAO.markAllAsReadByTargetUser(userId);
    } catch (error) {
      console.error(`Service Error: NotificationService.markAllNotificationsAsRead - ${error.message}`);
      throw error;
    }
  }

  async deleteNotification(notificationId) {
    try {
      const deleted = await NotificationDAO.deleteById(notificationId);
      if (!deleted) {
        throw new Error('Notification not found');
      }
      return deleted;
    } catch (error) {
      console.error(`Service Error: NotificationService.deleteNotification - ${error.message}`);
      throw error;
    }
  }
}

module.exports = new NotificationService();
