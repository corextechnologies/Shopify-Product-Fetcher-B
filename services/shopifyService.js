// services/shopifyService.js
const axios = require('axios');

const client = axios.create({
  baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-07`,
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
    'Content-Type': 'application/json'
  },
});

async function searchProducts(query) {
  try {
    const response = await client.get('/products.json', {
      params: {
        title: query,
        fields: 'id,title,images,variants'
      }
    });
    return response.data.products;
  } catch (error) {
    console.error('Shopify API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch products');
  }
}

async function getAllProducts() {
  try {
    const response = await client.get('/products.json', {
      params: {
        limit: 250,
        // fields: 'id,title,images,variants'
      }
    });

    // Debug logs
    console.log('API URL Called:', response.config.url);
    console.log('Products Returned:', response.data.products.length);
    console.log('First Product:', response.data.products[0]?.title);

    return response.data.products;
  } catch (error) {
    console.error('Full Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
}
// async function getAllProducts() {
//   let allProducts = [];
//   let hasMore = true;
//   let page = 1;

//   while (hasMore) {
//     try {
//       const response = await client.get('/products.json', {
//         params: {
//           limit: 250, // Max allowed per request
//           page: page,
//           fields: 'id,title,images,variants'
//         }
//       });

//       allProducts = allProducts.concat(response.data.products);
      
//       // Stop if no more products
//       if (response.data.products.length < 250) {
//         hasMore = false;
//       } else {
//         page++;
//       }
//     } catch (error) {
//       console.error('Error fetching page', page, error);
//       throw error;
//     }
//   }

//   return allProducts;
// }

module.exports = { getAllProducts };  // Fixed export to match controller import