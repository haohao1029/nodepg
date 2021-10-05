'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JournalEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JournalEntry.belongsTo(models.JournalTransaction, {
        foreignKey: 'journalTransactionId',
        onDelete: 'CASCADE',
        allowNull: true
      });
      JournalEntry.belongsTo(models.Account, {
        foreignKey: 'accountId',
        onDelete: 'CASCADE',
        allowNull: true
      });
    }
  };
  JournalEntry.init({
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'JournalEntry',
  });
  return JournalEntry;
};