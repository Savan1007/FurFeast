const Role = require('../models/Role');

class RoleDao {
  static async findByName(name, session=undefined) {
    try {
      return await Role.findOne({ name }).session(session);
    } catch (error) {
      console.error('RoleDao.findByName error:', error.message);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await Role.find().populate('permissions');
    } catch (error) {
      console.error('RoleDao.getAll error:', error.message);
      throw error;
    }
  }
}

module.exports = RoleDao;
