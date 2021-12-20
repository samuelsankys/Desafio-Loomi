'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('address', 'addresses');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('addresses', 'address');
  }
};
