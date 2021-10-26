const JournalEntry = require("../models").JournalEntry;
const Sequelize = require("sequelize");

module.exports = {
  lists(reqQuery, reqParams, reqBody) {
    const limit = reqQuery.perPage || null;
    const offset = reqQuery.page || 0;
    const search = reqQuery.search || null;
    const orderBy = reqQuery.orderBy || null;
    const order = reqQuery.order || "ASC";
    const accountId = reqQuery.accountId || null;
    const journalTransactionId = reqQuery.journalTransactionId || null;

    let completeOrder;
    let query;
    let where = {
        [Sequelize.Op.and]: [],
    };

    if (orderBy && order) {
        completeOrder = [orderBy, order];
        console.log(completeOrder);
    }

    if (accountId) {
      where[Sequelize.Op.and].push({
        accountId: accountId,
      });
    }

    if (journalTransactionId) {
      where[Sequelize.Op.and].push({
        journalTransactionId: journalTransactionId,
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
    return JournalEntry.findAll(query);

  },
  retrieve(id) {
    return JournalEntry.findByPk(id, { raw: true });
  },
  create(params) {
    return JournalEntry.create(params, { raw: true });
  },
  update(JournalEntry, params) {
    return JournalEntry.update(params);
  },
  delete(JournalEntry) {
    return JournalEntry.destroy();
  },
  deleteAll(journalTransactionId) {
    return JournalEntry.destroy({
      where: {
        journalTransactionId: journalTransactionId,
      },
    });
  },
};
