const Sequelize = require('sequelize');
const dbConfig = require('../Config/database');

// Models
const User = require('../Models/User');

const connection = new Sequelize(dbConfig);


// Initialation
User.init(connection);

module.exports = connection;