const express = require('express');
const {
  createCart,
  addProductToCart,
  removeProductFromCart,
  getCart,
} = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createCart);
router.post('/product', authenticateToken, addProductToCart);
router.delete(
  '/product/:cartProductId',
  authenticateToken,
  removeProductFromCart
);
router.get('/', authenticateToken, getCart);

module.exports = router;
