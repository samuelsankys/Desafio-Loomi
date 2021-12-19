const express = require('express');
// Controller
const UserController = require('../Controllers/Usuario.controller');


const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// routes.get('/', (req, res)=>{
//     return res.json({hello: 'Word'});
// });

module.exports = routes;