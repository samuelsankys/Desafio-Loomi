'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'orders_products',
      'quantidade',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders_products', 'quantidade')
  }
};
