// routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { authMiddleware } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

// Admin-only
router.get('/', authMiddleware, restrictTo('admin'), getStats);

module.exports = router;
