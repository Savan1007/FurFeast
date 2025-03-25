require("dotenv").config();
const mongoose = require('mongoose');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const config = require('../config/rolePermission');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Seed permissions first
    const permissionMap = {};
    for (const perm of config.permissions) {
      const existing = await Permission.findOne({ name: perm.name });
      if (!existing) {
        const created = await Permission.create(perm);
        permissionMap[perm.name] = created._id;
      } else {
        permissionMap[perm.name] = existing._id;
      }
    }

    // Seed roles with permission references
    for (const role of config.roles) {
      const existing = await Role.findOne({ name: role.name });
      if (!existing) {
        const permIds = role.permissions.map(name => permissionMap[name]);
        await Role.create({ name: role.name, description: role.description, permissions: permIds });
      }
    }

    console.log('Roles and permissions seeded!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();


// script to run!!!
// node scripts/seedRolesAndPermissions.js
