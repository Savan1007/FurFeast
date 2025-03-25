const Permission = require('../models/Permission');

class PermissionDao {
  static async findByName(name) {
    try {
      return await Permission.findOne({ name });
    } catch (error) {
      console.error('PermissionDao.findByName error:', error.message);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await Permission.find();
    } catch (error) {
      console.error('PermissionDao.getAll error:', error.message);
      throw error;
    }
  }
}

module.exports = PermissionDao;
