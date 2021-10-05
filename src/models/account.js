'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Team, {
        foreignKey: 'teamId',
        onDelete: 'CASCADE',
        allowNull: true
      })
      Account.hasMany(models.JournalEntry, {
        foreignKey: 'accountId',
        as: 'journalEntries',
      })
    }
  };
  Account.init({
    name: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};