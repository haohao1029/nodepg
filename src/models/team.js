'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.hasMany(models.User, {
        foreignKey: 'teamId',
        as: 'users',
      }),
      Team.hasMany(models.Account, {
        foreignKey: 'teamId',
        as: 'accounts',
      }),
      Team.hasMany(models.JournalTransaction, {
        foreignKey: 'teamId',
        as: 'journalTransactions',
      });
    }
  };
  Team.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};