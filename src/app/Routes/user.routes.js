const express = require('express');
// Controller
const UserController = require('../Controllers/User.controller');
const ClientController = require('../Controllers/Client.controller');
const AddressController = require('../Controllers/Address.controller');
const OrderController = require('../Controllers/Order.controller');

const authMiddleware = require('../Middleware/auth');

const routes = express.Router();


routes.post('/register', UserController.store);

// Authentitation 
routes.post('/login', UserController.authenticate);
routes.use(authMiddleware);

routes.post('/logout', UserController.logout);

routes.get('/users', UserController.index);
routes.delete('/user/:user_id', UserController.delete);


routes.get('/users/:user_id/client', ClientController.index);
routes.post('/users/:user_id/client', ClientController.store);

routes.get('/users/:user_id/client/address', AddressController.index);
routes.post('/users/:user_id/client/address', AddressController.store);


routes.post('/users/:user_id/client/order', OrderController.store);





// routes.get('/', (req, res)=>{
//     return res.json({hello: 'Word'});
// });
 
module.exports = routes;