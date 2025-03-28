'use strict'
const mongoose = require('mongoose');

module.exports = [
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef01'),
    requestType: 'distribution',
    status: 'pending',
    notes: 'Requesting food supplies for rescued dogs.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef02'),
    requestType: 'donation',
    status: 'approved',
    notes: 'Offering surplus cat toys from recent fundraiser.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef03'),
    requestType: 'distribution',
    status: 'pending',
    notes: 'Need leashes and collars for an upcoming event.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef04'),
    requestType: 'donation',
    status: 'processed',
    notes: 'Donating bulk dry food for shelter pets.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef05'),
    requestType: 'distribution',
    status: 'rejected',
    notes: 'Request denied due to duplicate entry.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef06'),
    requestType: 'distribution',
    status: 'approved',
    notes: 'Supplies needed for a temporary shelter in winter.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef07'),
    requestType: 'donation',
    status: 'pending',
    notes: 'Planning to donate canned cat food next week.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef08'),
    requestType: 'distribution',
    status: 'pending',
    notes: 'Community event requires pet food and accessories.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef09'),
    requestType: 'donation',
    status: 'approved',
    notes: 'Leftover toys from retail donation drive.'
  },
  {
    requestedBy: new mongoose.Types.ObjectId('65fcabc123456789abcdef10'),
    requestType: 'distribution',
    status: 'pending',
    notes: 'Disaster relief supplies for evacuated pet families.'
  }
];
