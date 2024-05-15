const express = require('express');
const { createOrder, getOrder } = require('../controllers/orderController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/:orderId', authenticateToken, getOrder);

module.exports = router;
