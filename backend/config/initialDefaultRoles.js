const Role = require('../models/Roles');

async function initializeDefaultRoles() {

  global.defaultRoleIds = {
    supplier: await Role.findOne({ name: 'supplier' }).then(r => r?._id),
    community: await Role.findOne({name: 'community'}).then(r=> r?._id),
    admin: await Role.findOne({ name: 'admin' }).then(r => r?._id),
    superAdmin: await Role.findOne({ name: 'superAdmin' }).then(r => r?._id)
  };

  console.log(' Default roles initialized:', global.defaultRoleIds);
}

module.exports = initializeDefaultRoles;
