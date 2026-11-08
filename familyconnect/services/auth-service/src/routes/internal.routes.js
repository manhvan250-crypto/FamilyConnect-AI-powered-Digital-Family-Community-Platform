// Khai báo route nội bộ /internal/... (gateway không công khai) và phân quyền
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route nội bộ để lấy thông tin user theo ID
router.get('/users/:id', UserController.getUserById);

// Route nội bộ để lấy thống kê cho report-service (Task FMLCN-34)
router.get('/stats', UserController.getStats);

module.exports = router;