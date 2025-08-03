// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { authMiddleware } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

// Public routes (both users and admins)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/', authMiddleware, restrictTo('admin'), createProduct);
router.put('/:id', authMiddleware, restrictTo('admin'), updateProduct);
router.delete('/:id', authMiddleware, restrictTo('admin'), deleteProduct);

module.exports = router;
