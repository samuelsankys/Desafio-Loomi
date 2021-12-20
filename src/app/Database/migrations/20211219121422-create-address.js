'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('address', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id'}, 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      numero: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(20),
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
    return queryInterface.dropTable('address');
  }
};
