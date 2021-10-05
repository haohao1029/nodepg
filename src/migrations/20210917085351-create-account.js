'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      code: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      default: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      reportingType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      parentId: {
        type: Sequelize.INTEGER,
      },
      teamId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Teams',
          key: 'id',
          as: 'teamId',
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accounts');
  }
};