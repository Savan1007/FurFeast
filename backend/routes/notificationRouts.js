const express = require('express');
const router = express.Router();
const notificationController = require('../controller/NotificationController');

router.get('/notification', notificationController.getAll);
router.get('/notification/unread', notificationController.getUnread);
router.patch('/notification/:id/read', notificationController.markAsRead);
router.patch('/notification/read-all', notificationController.markAllAsRead);
router.delete('/notification/:id', notificationController.deleteOne);
module.exports = router;
