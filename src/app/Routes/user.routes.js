const express = require('express');
// Controller
const UserController = require('../Controllers/User.controller');

const authMiddleware = require('../Middleware/auth');

const routes = express.Router();


routes.post('/register', UserController.store);

// Authentitation 
routes.post('/login', UserController.authenticate);
routes.use(authMiddleware);

routes.post('/logout', UserController.logout);

routes.get('/users', UserController.index);
routes.delete('/user/:user_id', UserController.delete);



// routes.get('/', (req, res)=>{
//     return res.json({hello: 'Word'});
// });
 
module.exports = routes;