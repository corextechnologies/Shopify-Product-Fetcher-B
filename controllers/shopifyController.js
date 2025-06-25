// server/controllers/shopifyController.js

const { getAllProducts } = require('../services/shopifyService');

exports.getProducts = async (req, res) => {
  try {
    const products = await getAllProducts(); // Remove query param
    console.log("Products: ", products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
};

// New filtered version
// exports.getFilteredProducts = async (req, res) => {
//   try {
//     const { fields } = req.query; // e.g. ?fields=id,title
//     const validFields = ['id', 'title', 'variants', 'images'];
//     console.log("In backend!");
//     let requestedFields = [];
//     if (fields) {
//       requestedFields = fields.split(',').filter(f => validFields.includes(f));
//     }

//     const allProducts = await getAllProducts();

//     // If no fields specified, return full data
//     if (!requestedFields.length) {
//       return res.json(allProducts);
//     }

//     // Otherwise filter each product
//     const filteredProducts = allProducts.map(product => {
//       const filtered = {};
//       requestedFields.forEach(field => {
//         filtered[field] = product[field];
//       });
//       return filtered;
//     });

//     res.json(filteredProducts);

//   } catch (error) {
//     console.error('Error filtering products:', error.message);
//     res.status(500).json({ error: 'Failed to filter products' });
//   }
// };
// controllers/shopifyController.js

// controllers/shopifyController.js

// exports.getFilteredProducts = async (req, res) => {
//   try {
//     const { fields } = req.query; // e.g. ?fields=id,title,vendor,body_html

//     // ✅ Extended list of supported fields
//     const validFields = [
//       // Basic Info
//       'id', 'title', 'vendor', 'product_type', 'status', 'tags',
      
//       // Description
//       'body_html',
      
//       // Images
//       'images', 'image',
      
//       // Meta
//       'handle', 'published_at', 'created_at', 'updated_at'
//     ];

//     let requestedFields = [];
//     if (fields) {
//       requestedFields = fields.split(',').filter(f => validFields.includes(f));
//     }

//     // Fetch all products from Shopify (with full data)
//     const allProducts = await getAllProducts();

//     // If no fields specified, return full product data
//     if (!requestedFields.length) {
//       return res.json(allProducts);
//     }

//     // Otherwise filter each product to include only selected fields
//     const filteredProducts = allProducts.map(product => {
//       const filtered = {};
//       requestedFields.forEach(field => {
//         filtered[field] = product[field];
//       });
//       return filtered;
//     });

//     res.json(filteredProducts);

//   } catch (error) {
//     console.error('Error filtering products:', error.message);
//     res.status(500).json({ error: 'Failed to filter products' });
//   }
// };
// controllers/shopifyController.js

exports.getFilteredProducts = async (req, res) => {
  try {
    const { fields } = req.query;

    const validFields = [
      'id', 'title', 'vendor', 'product_type', 'status', 'tags',
      'body_html', 'images', 'image', 'variants',
      'handle', 'published_at', 'created_at', 'updated_at'
    ];

    let requestedFields = [];
    if (fields) {
      requestedFields = fields.split(',').filter(f => validFields.includes(f));
    }

    const allProducts = await getAllProducts();

    if (!requestedFields.length) {
      return res.json(allProducts);
    }

    const filteredProducts = allProducts.map(product => {
      const filtered = {};

      requestedFields.forEach(field => {
        if (product.hasOwnProperty(field)) {
          filtered[field] = product[field];
        }
      });

      return filtered;
    });

    res.json(filteredProducts);

  } catch (error) {
    console.error('Error filtering products:', error.message);
    res.status(500).json({ error: 'Failed to filter products' });
  }
};