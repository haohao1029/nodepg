const Account = require("../models").Account;
const Sequelize = require("sequelize");

module.exports = {
  lists(reqQuery, reqParams, reqBody) {
    const limit = reqQuery.perPage || null;
    const offset = reqQuery.page || 0;
    const name = reqQuery.name || null;
    const code = reqQuery.code || null;
    const isDeleted = reqQuery.isDeleted || null;
    const reportingType = reqQuery.reportingType || null;
    const description = reqQuery.description || null;
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
      console.log(completeOrder);
    }
    if (name) {
      where[Sequelize.Op.and].push({
        name: { [Sequelize.Op.iLike]: `%${name}%` },
      });
    }
    if (description) {
      where[Sequelize.Op.and].push({
        description: { [Sequelize.Op.iLike]: `%${description}%` },
      });
    }
    if (isDeleted) {
      where[Sequelize.Op.and].push({
        default: { [Sequelize.Op.iLike]: `%${isDeleted}%` },
      });
    }
    if (code) {
      where[Sequelize.Op.and].push({
        code: { [Sequelize.Op.iLike]: `%${code}%` },
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

    return Account.findAll(query);
  },
  retrieve(id) {
    return Account.findByPk(id);
  },
  create(params) {
    return Account.create(params);
  },
  update(Account, params) {
    return Account.update(params);
  },
  delete(Account) {
    return Account.destroy();
  },
  createDefaultValue(id) {
    // Income
    incomeAcount = [
      {
        name: "salary",
        description: "salary",
        teamId: id,
        parentId: 30
      },
      {
        name: "bonus",
        description: "bonus",
        teamId: id,
        parentId: 30,
      },
      {
        name: "coupon",
        description: "coupon",
        teamId: id,
        parentId: 31,
      },
      {
        name: "trading",
        description: "trading",
        teamId: id,
        parentId: 30,
      },
      {
        name: "investment",
        description: "investment",
        teamId: id,
        parentId: 30,
      },
      {
        name: "others",
        description: "others",
        teamId: id,
        parentId: 32,
      },
    ];

    // Expense
    expenseAccount = [
      {
        name: "brunch",
        description: "brunch",
        teamId: id,
        parentId: 13,
      },
      {
        name: "breakfast",
        description: "breakfast",
        teamId: id,
        parentId: 13,
      },
      {
        name: "lunch",
        description: "lunch",
        teamId: id,
        parentId: 13,
      },
      {
        name: "dinner",
        description: "dinner",
        teamId: id,
        parentId: 13,
      },
      {
        name: "drinks",
        description: "drinks",
        teamId: id,
        parentId: 13,
      },
      {
        name: "rental",
        description: "rental",
        teamId: id,
        parentId: 15,
      },
      {
        name: "medical",
        description: "medical",
        teamId: id,
        parentId: 14,
      },
      {
        name: "education",
        description: "education",
        teamId: id,
        parentId: 17,
      },
      {
        name: "gift",
        description: "git",
        teamId: id,
        parentId: 18,
      },
      {
        name: "others",
        description: "others",
        teamId: id,
        parentId: 19,
      },
    ];
    revenueAccount = [
      {
        name: "cash",
        description: "cash",
        teamId: id,
        parentId: 1,
      },
      {
        name: "bank",
        description: "bank",
        teamId: id,
        parentId: 1,
      },
    ]
    Account.bulkCreate(revenueAccount);
    Account.bulkCreate(expenseAccount);
    Account.bulkCreate(incomeAcount);
  },
};
