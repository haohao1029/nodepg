"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("JournalEntries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      entryType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      accountId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Accounts",
          key: "id",
          as: "accountId",
        },
      },
      journalTransactionId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "JournalTransactions",
          key: "id",
          as: "journalTransactionId",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("JournalEntries");
  },
};
