const Sequelize = require('sequelize');
const dbConfig = require('../Config/database');

// Models
const User = require('../Models/User');
const Client = require('../Models/Client');
const Address = require('../Models/Address');

const connection = new Sequelize(dbConfig);


// Initialation
User.init(connection);
Client.init(connection);
Address.init(connection);

//Relations
User.associate(connection.models);
Client.associate(connection.models);
Address.associate(connection.models);

module.exports = connection;