const express = require('express');
// Controller
const UserController = require('../Controllers/Usuario.controller');
const ClientController = require('../Controllers/Client.controller');
const AddressController = require('../Controllers/Address.controller');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/client', ClientController.index);
routes.post('/users/:user_id/client', ClientController.store);

routes.get('/users/:user_id/client/address', AddressController.index);
routes.post('/users/:user_id/client/address', AddressController.store);




// routes.get('/', (req, res)=>{
//     return res.json({hello: 'Word'});
// });
 
module.exports = routes;