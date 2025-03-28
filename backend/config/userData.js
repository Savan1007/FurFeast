'use strict'
const mongoose = require('mongoose');

module.exports = [
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef01'),
    username: 'rescuer_doggo',
    email: 'rescuer1@example.com',
    password: 'hashedpassword1', // Replace with actual hashed password
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef02'),
    username: 'donor_catlover',
    email: 'donor1@example.com',
    password: 'hashedpassword2',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef03'),
    username: 'event_support',
    email: 'event1@example.com',
    password: 'hashedpassword3',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef04'),
    username: 'donor_bulk',
    email: 'donor2@example.com',
    password: 'hashedpassword4',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef05'),
    username: 'duplicate_requester',
    email: 'requester1@example.com',
    password: 'hashedpassword5',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef06'),
    username: 'winter_aid',
    email: 'aid1@example.com',
    password: 'hashedpassword6',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef07'),
    username: 'can_donor',
    email: 'donor3@example.com',
    password: 'hashedpassword7',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef08'),
    username: 'community_event',
    email: 'event2@example.com',
    password: 'hashedpassword8',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef09'),
    username: 'retail_giver',
    email: 'donor4@example.com',
    password: 'hashedpassword9',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId('65fcabc123456789abcdef10'),
    username: 'relief_support',
    email: 'relief@example.com',
    password: 'hashedpassword10',
    isVerified: true
  }
];
