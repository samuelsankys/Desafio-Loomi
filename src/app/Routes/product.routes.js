const express = require('express');


// Controllers
const ProductController = require('../Controllers/Product.controller');

// Routes
const routes = express.Router();

routes.get('/products', ProductController.index);
routes.get('/products/details/:product_id', ProductController.productDetail);
routes.post('/product', ProductController.store);
routes.put('/product/:product_id', ProductController.update);
routes.delete('/product/:product_id', ProductController.delete);



module.exports = routes;