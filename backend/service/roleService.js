
const RoleDao = require('../dao/RoleDao');

class RoleService {
  static async create(data) {
    const transaction = await sequelize.transaction();
    try{
        const existingRole = await RoleDao.findByName(data.name);
        if (existingRole) throw new Error('Role already exists');
        const newRole =  await RoleDao.create(data, transaction);
        await transaction.commit();
        return newRole;
    }catch(error){
        await transaction.rollback();
        console.error('Service error, (RoleService, createRole()): ', error.message);
        throw error;
    }
  }

  static async findById(id){
    try{
        return await RoleDao.findById(id);
    }catch(error){
        console.error('Service error, (RoleService, findById()): ', error.message);
        throw error;
    }
  }

  static async findAll() {
    try{
        return await RoleDao.findAll();
    }catch(error){
        console.error('Service error, (RoleService, findAll()): ', error.message);
        throw error;
    }
  }


  static async delete(id) {
    const transaction = await sequelize.transaction();
    try{
        const existingRole = await this.findById(id);
        if(!existingRole) throw new Error('Role Not Found.');
        const roleDeleted = await RoleDao.delete(id, transaction);
        await transaction.commit();
        return roleDeleted
    }catch(error){
        await transaction.rollback();
        console.error('Service error, (RoleService, delete()): ', error.message);
        throw error;
    }
  }
}

module.exports = RoleService;
