const JournalEntry = require("../models").JournalEntry;
const Sequelize = require("sequelize");


module.exports = {
    retrieve(id) {
      return JournalEntry.findByPk(id);
    },
    create(params) {
      return JournalEntry.create(params, {raw: true});
    },
    update(JournalEntry, params) {
      return JournalEntry.update(params);
    },
    delete(JournalEntry) {
      return JournalEntry.destroy();
    }
}