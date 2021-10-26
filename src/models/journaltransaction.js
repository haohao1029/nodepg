"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JournalTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JournalTransaction.hasMany(models.JournalEntry, {
        foreignKey: "journalTransactionId",
        onDelete: "CASCADE",
      });
      JournalTransaction.belongsTo(models.Team, {
        foreignKey: "teamId",
        onDelete: "CASCADE",
        allowNull: true,
      });
    }
  }
  JournalTransaction.init(
    {
      date: DataTypes.STRING,
      totalAmount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "JournalTransaction",
    }
  );
  return JournalTransaction;
};
