const express = require('express');
const {
  createProduct,
  getProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createProduct);
router.get('/', getProducts);
router.get('/:category', getProductsByCategory);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
