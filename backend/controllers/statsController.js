// controllers/statsController.js
const Product = require('../models/product');
const Category = require('../models/category');

exports.getStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalInventory = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$inventory" }
        }
      }
    ]);

    res.json({
      totalProducts,
      totalCategories,
      totalInventory: totalInventory[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
};
