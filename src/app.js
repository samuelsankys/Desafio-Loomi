const express = require('express');
const morgan = require('morgan');

// Inicialização
const app = express();

// Configurações
app.set('port', process.env.PORT || 4000);


// Meddlewares
app.use(morgan('dev'));

// Variaveis Globais

// Rotas
app.get('/', (req, res)=>{
    res.send("hello word");
});

// Public

// Iniciando Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})