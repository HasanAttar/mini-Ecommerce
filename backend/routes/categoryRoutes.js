// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategories,
  deleteCategory
} = require('../controllers/categoryController');

const { authMiddleware } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

// Public route: anyone can view
router.get('/', getCategories);

// Admin-only routes
router.post('/', authMiddleware, restrictTo('admin'), createCategory);
router.delete('/:id', authMiddleware, restrictTo('admin'), deleteCategory);

module.exports = router;
