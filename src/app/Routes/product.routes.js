const express = require('express');


// Controllers
const ProductController = require('../Controllers/Product.controller');

// Routes
const routes = express.Router();

routes.get('/products', ProductController.index);
routes.post('/product', ProductController.store);
routes.put('/product/:product_id', ProductController.update);



module.exports = routes;