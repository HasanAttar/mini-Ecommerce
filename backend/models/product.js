// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  inventory: { type: Number, required: true },
  image: String, // ✅ renamed to match frontend
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
