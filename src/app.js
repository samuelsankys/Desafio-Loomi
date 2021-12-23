const express = require('express');
const morgan = require('morgan');


const UserRoutes = require('./app/Routes/user.routes');
const ClientRoutes = require('./app/Routes/client.routes');
const ProductRoutes = require('./app/Routes/product.routes');
const OrderRoutes = require('./app/Routes/order.routes');

// Imports
require('./app/Database');


// Inicialização
const app = express();
app.use(express.json());

// Configurações
app.set('port', process.env.PORT || 4001);
require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.testing": ".env"
});


// Meddlewares
app.use(morgan('dev'));

// Variaveis Globais

// Rotas
app.use(UserRoutes);
app.use(ClientRoutes);
app.use(ProductRoutes);
app.use(OrderRoutes);

// Public

// Iniciando Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})