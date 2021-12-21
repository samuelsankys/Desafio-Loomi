const express = require('express');
// Controller

const ClientController = require('../Controllers/Client.controller');
const AddressController = require('../Controllers/Address.controller');
const OrderController = require('../Controllers/Order.controller');

const authMiddleware = require('../Middleware/auth');

const routes = express.Router();


// Authentitation 
routes.use(authMiddleware);

routes.get('/clients', ClientController.index);
routes.post('/users/:user_id/client', ClientController.store);

routes.get('/users/:user_id/client/address', AddressController.index);
routes.post('/users/:user_id/client/address', AddressController.store);


routes.post('/users/:user_id/client/order', OrderController.store);





// routes.get('/', (req, res)=>{
//     return res.json({hello: 'Word'});
// });
 
module.exports = routes;