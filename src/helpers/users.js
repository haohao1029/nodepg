const User = require("../models").User;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = {
  lists(reqQuery, reqParams, reqBody) {
    const limit = reqQuery.perPage || null;
    const offset = reqQuery.page || 0;
    const name = reqQuery.name || null;
    const email = reqQuery.email || null;
    const teamId = reqQuery.teamId || null;
    const roleId = reqQuery.roleId || null;
    const search = reqQuery.search || null;
    const orderBy = reqQuery.orderBy || null;
    const order = reqQuery.order || "ASC";

    let completeOrder;
    let query;
    let where = {
      [Sequelize.Op.and]: [],
    };

    if (orderBy && order) {
      completeOrder = [orderBy, order];
    }
    if (name) {
      where[Sequelize.Op.and].push({
        name: { [Sequelize.Op.iLike]: `%${name}%` },
      });
    }
    if (email) {
      where[Sequelize.Op.and].push({
        email: { [Sequelize.Op.iLike]: `%${email}%` },
      });
    }
    if (teamId) {
      where[Sequelize.Op.and].push({
        teamId: { [Sequelize.Op.iLike]: `%${teamId}%` },
      });
    }
    if (roleId) {
      where[Sequelize.Op.and].push({
        roleId: { [Sequelize.Op.iLike]: `%${roleId}%` },
      });
    }

    query = {
      raw: true,
      limit: limit,
      offset: offset,
      where: where,
    };

    if (completeOrder) {
      query["order"] = [completeOrder];
    }


    return User
      .findAll
      (query);
  },
  retrieve(id) {
    return User.findByPk(id);
  },
  create(params) {
    return User.create(params);
  },
  update(user, params) {
    return user.update(params);
  },
  delete(user) {
    return user.destroy();
  },
  generateAuthToken(user) {
    token = jwt.sign({ user }, process.env.JWT_SECRET);
    return token;
  },
  async isMatch(loginPassword, password) {
    const matched = await bcrypt.compare(loginPassword, password)
    if (!matched) {
      throw new Error("Unable Login")
    }

    return matched
  },
};
