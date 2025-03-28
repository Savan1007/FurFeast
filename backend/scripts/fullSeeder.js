require('dotenv').config();

const mongoose = require('mongoose');

const User = require('../models/User');
const Inventory = require('../models/Inventory');
const Request = require('../models/Request');
const RequestDetails = require('../models/RequestDetails');

const userData = require('../config/userData');
const inventoryData = require('../config/inventoryData');
const requestData = require('../config/requestData');
const generateRequestDetails = require('../config/detailsData');

const DB_URI = process.env.MONGO_URI;

async function seedAll() {
  await mongoose.connect(DB_URI);

  try {
    // 1. Seed Users
    await User.deleteMany({});
    const users = await User.insertMany(userData);
    console.log('Users seeded');

    // 2. Seed Inventory
    await Inventory.deleteMany({});
    const inventoryItems = await Inventory.insertMany(inventoryData);
    console.log('Inventory seeded');

    // 3. Seed Requests
    await Request.deleteMany({});
    const requests = await Request.insertMany(requestData);
    console.log('Requests seeded');

    // 4. Seed Request Details
    await RequestDetails.deleteMany({});
    const requestDetails = generateRequestDetails(requests.map(r => r._id), inventoryItems);
    await RequestDetails.insertMany(requestDetails);
    console.log('Request Details seeded');

  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
}

seedAll();


// to run: node scripts/fullSeeder.js