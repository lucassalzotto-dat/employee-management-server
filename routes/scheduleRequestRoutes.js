const express = require('express');
const router = express.Router();
const scheduleRequestController = require('../controllers/scheduleRequestController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, scheduleRequestController.createScheduleRequest);
router.get('/', authMiddleware, scheduleRequestController.getScheduleRequests);
router.put('/:id', authMiddleware, scheduleRequestController.updateScheduleRequestStatus);

module.exports = router;
