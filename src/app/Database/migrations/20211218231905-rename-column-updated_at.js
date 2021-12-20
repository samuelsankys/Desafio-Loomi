'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "update_at", "updated_at");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "updated_at", "update_at");
  }
};
