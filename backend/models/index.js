// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


const { Sequelize } = require('sequelize');
const config = require('../config/config.js')['development'];

// Create Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Manually register models
const Supplier = require('./supplier.js')(sequelize, Sequelize.DataTypes);
const Donation = require('./donation')(sequelize, Sequelize.DataTypes);
const Recipient = require('./recipient')(sequelize, Sequelize.DataTypes);
const Inventory = require('./inventory')(sequelize, Sequelize.DataTypes);
const Distribution = require('./distribution')(sequelize, Sequelize.DataTypes);
const Log = require('./log')(sequelize, Sequelize.DataTypes);
const DonationDetails = require('./donationDetails')(sequelize, Sequelize.DataTypes);
const db = {
  sequelize,
  Sequelize,
  Supplier,
  Donation,
  Recipient,
  Distribution,
  Inventory,
  Log,
  DonationDetails
};

// Run associations if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
