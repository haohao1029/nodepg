const JournalTransaction = require("../models").JournalTransaction;
const JournalEntry = require("../models").JournalEntry;
const Sequelize = require("sequelize");


module.exports = {
    lists(reqQuery, reqParams, reqBody) {
        const limit = reqQuery.perPage || null;
        const offset = reqQuery.page || 0;
        const search = reqQuery.search || null;
        const orderBy = reqQuery.orderBy || null;
        const order = reqQuery.order || "ASC";
        const teamId = reqQuery.teamId || null;
        const date = reqQuery.date || null;

        let completeOrder;
        let query;
        let where = {
            [Sequelize.Op.and]: [],
        };

        if (orderBy && order) {
            completeOrder = [orderBy, order];
            console.log(completeOrder);
        }
        if (teamId) {
          where[Sequelize.Op.and].push({
              teamId: { [Sequelize.Op.iLike]: `%${teamId}%` },
          });
        }
        if (date) {
          where[Sequelize.Op.and].push({
              date: date,
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
      
        return JournalTransaction.findAll(query);
    
    },
    retrieve(id) {
      return JournalTransaction.findByPk(id);
    },
    create(params) {
      return JournalTransaction.create(params, {raw: true});
    },
    update(JournalTransaction, params) {
      return JournalTransaction.update(params);
    },
    delete(JournalTransaction) {
      return JournalTransaction.destroy();
    }
}