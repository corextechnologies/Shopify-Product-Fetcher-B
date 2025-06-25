require('dotenv').config();
const express = require('express');
const cors = require('cors');
const shopifyRoutes = require('./routes/shopifyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/shopify', shopifyRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});