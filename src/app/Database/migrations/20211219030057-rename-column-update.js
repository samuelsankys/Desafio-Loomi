'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("clients", "update_at", "updated_at");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("clients", "updated_at", "update_at");
  }
};
