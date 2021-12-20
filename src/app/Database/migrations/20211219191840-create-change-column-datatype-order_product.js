'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn("orders_products", "preco_produto", {
        type: 'Decimal USING CAST("preco_produto" as DECIMAL(10,2))',
      });
      await queryInterface.changeColumn("orders_products", "preco_produto", {
        type: Sequelize.DECIMAL(10,2),
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn("orders_products", "preco_produto", {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
