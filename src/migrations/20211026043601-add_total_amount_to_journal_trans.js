'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'JournalTransactions',
      'totalAmount',
     Sequelize.FLOAT
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'JournalTransactions',
      'totalAmount'
    );
  }
};
