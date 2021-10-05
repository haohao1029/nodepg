const Team = require("../models").Team;
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = {
    create(params) {
        return Team.create(params);
      },
}