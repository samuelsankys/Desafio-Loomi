'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      preco: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      codigo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      caracteristicas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
