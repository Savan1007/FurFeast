'use strict'
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const InventoryItem = require('../models/Inventories');

router.get('/dashboard/summary', async (req, res) => {
  try {
    console.log('here')
    const [recentRequests, totalInventoryItems, pendingRequests, completeRequests, inventorySummary] = await Promise.all([
      Request.find().sort({ createdAt: -1 }).limit(5),
      InventoryItem.countDocuments(),
      Request.countDocuments({ status: 'pending' }),
      Request.countDocuments({ status: { $in: ['approved', 'processed'] } }),
      InventoryItem.aggregate([
        { $match: { itemName: { $in: ['Collar', 'Toy', 'Dog Wet Food', 'Dog Dry Food', 'Cat Wet Food', 'Cat Dry Food'] } } },
        { $group: { _id: '$itemName', totalQuantity: { $sum: '$quantity' } } },
        { $project: { _id: 0, itemName: '$_id', totalQuantity: 1 } }
      ])
    ]);

    res.json({
      recentRequests,
      totalInventoryItems,
      totalPendingRequests: pendingRequests,
      totalCompleteRequests: completeRequests,
      inventorySummary
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
