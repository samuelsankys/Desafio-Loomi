const express = require('express');
// Controller

const OrderController = require('../Controllers/Order.controller');

const authMiddleware = require('../Middleware/auth');

const routes = express.Router();



routes.get('/orders', OrderController.index);
routes.get('/orders/detail/:order_id', OrderController.orderDetail);
routes.put('/order/:order_id', OrderController.updateOrder);
routes.delete('/order/:order_id', OrderController.delete);






// routes.get('/', (req, res)=>{
//     return res.json({hello: 'Word'});
// });
 
module.exports = routes;