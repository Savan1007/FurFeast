const Notification = require('../models/Notification');

class NotificationDAO {
  async create(data) {
    try {
      return await Notification.create(data);
    } catch (error) {
      throw new Error(`DAO Error: NotificationDAO.create - ${error.message}`);
    }
  }

  async findByTargetUser(userId) {
    try {
      return await Notification.find({
        targetUsers: userId
      }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`DAO Error: NotificationDAO.findByTargetUser - ${error.message}`);
    }
  }

  async findUnreadByTargetUser(userId) {
    try {
      return await Notification.find({
        targetUsers: userId,
        read: false
      });
    } catch (error) {
      throw new Error(`DAO Error: NotificationDAO.findUnreadByTargetUser - ${error.message}`);
    }
  }

  async markAsRead(id) {
    try {
      return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    } catch (error) {
      throw new Error(`DAO Error: NotificationDAO.markAsRead - ${error.message}`);
    }
  }

  async markAllAsReadByTargetUser(userId) {
    try {
      return await Notification.updateMany(
        { targetUsers: userId, read: false },
        { read: true }
      );
    } catch (error) {
      throw new Error(`DAO Error: NotificationDAO.markAllAsReadByTargetUser - ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      return await Notification.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`DAO Error: NotificationDAO.deleteById - ${error.message}`);
    }
  }
}

module.exports = new NotificationDAO();
