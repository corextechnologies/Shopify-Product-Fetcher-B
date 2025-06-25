
// server/routes/shopifyRoutes.js

const express = require('express');
const router = express.Router();
const shopifyController = require('../controllers/shopifyController');

router.get('/products', shopifyController.getProducts);
router.get('/products/filter', shopifyController.getFilteredProducts); // NEW ROUTE

module.exports = router;