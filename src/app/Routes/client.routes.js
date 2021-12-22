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
routes.get('/client/:client_id/details', ClientController.userDetail);

routes.post('/client/:user_id', ClientController.store);
routes.put('/client/:client_id', ClientController.update);
routes.delete('/client/:client_id', ClientController.delete);

//routes.get('/client/address/:client_id', AddressController.index);
routes.post('/client/address/:client_id', AddressController.store);
routes.put('/client/address/:client_id', AddressController.update);
routes.delete('/client/address/:client_id', AddressController.delete);


routes.post('/users/:user_id/client/order', OrderController.store);





// routes.get('/', (req, res)=>{
//     return res.json({hello: 'Word'});
// });
 
module.exports = routes;