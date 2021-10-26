const JournalTransaction = require("../models").JournalTransaction;
const JournalEntry = require("../models").JournalEntry;
const JournalTransactionHelper = require("../helpers").JournalTransaction;
const JournalEntryHelper = require("../helpers").JournalEntry;
const Sequelize = require("sequelize");
const common = require("../common");
const { response, responseAll } = require("../common");

module.exports = {
  list(req, res) {
    const reqQuery = req.query;
    const reqParams = req.params;
    const reqBody = req.body;
    const limit = reqQuery.perPage || null;
    const offset = reqQuery.page || 0;

    let pagination = {
      perPage: limit,
      page: offset,
    };
    return JournalTransaction.count()
      .then((length) => {
        pagination["length"] = length;
        if (!limit) {
          pagination["perPage"] = length;
        }

        JournalTransactionHelper.lists(reqQuery, reqParams, reqBody)
          .then((result) => {
            
            common.responseAll(
              res,
              200,
              true,
              "sucess get pagination",
              pagination,
              result
            );
          })
          .catch((error) => common.response(res, 400, false, error.message));
      })
      .catch((error) => common.response(res, 400, false, error.message));
  },
  async retrieve(req, res) {
    const id = req.params.id;
    journalEntries = await JournalEntryHelper.lists({
      journalTransactionId: id
    })

    return JournalTransactionHelper.retrieve(id)
      .then((result) => {
        if (!result) {
          return response(res, 404, false, "Journal Transaction Where Id " + id + " Not Found")
        }
        result["dataValues"]["journalEntries"] = journalEntries;
        return response(res, 200, true, "Retrive Journal Transaction ID = " + id, result);
      })
      .catch((error) => {
        response(res, 400, false, error.message)
      });
  },
  create(req, res) {
    const params = req.body;
    const journalEntries = req.body.journalEntries;
    params["teamId"] = req.user.teamId;


    return JournalTransactionHelper.create(params)
      .then((result) => {        
        for (i = 0; i < journalEntries.length; i ++) {
          journalEntries[i]["journalTransactionId"] = result.dataValues.id;
          JournalEntry.create(journalEntries[i]);
        }
        return response(res, 200, true, "sucesss create JournalTransaction", result);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  update(req, res) {
    const id = req.params.id;
    const params = req.body;
    const journalEntries = req.body.journalEntries;
    const JournalTransaction = JournalTransactionHelper.retrieve(id);
    return JournalTransaction.then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Journal Transaction Not Found",
        });
      }
      return JournalTransactionHelper.update(result, params)
        .then((result) => {
          for (i = 0; i < journalEntries.length; i ++) {
            journalEntry = journalEntries[i];
            JournalEntryHelper.retrieve(journalEntry.id).then(result => {
              JournalEntryHelper.update(result, journalEntry);
            }).catch((error) => res.status(400).send(error));
          }
          res.status(200).send(result)
        })
        .catch((error) => res.status(400).send(error));
    }).catch((error) => res.status(400).send(error));
  },

  async destroy(req, res) {

    const id = req.params.id;
    const JournalTransaction = JournalTransactionHelper.retrieve(id);

    return JournalTransaction.then((result) => {
      if (!result) {
        return res.status(400).send({
          message: "Journal Transaction Not Found",
        });
      }
      return JournalTransactionHelper.delete(result)
        .then(() => {
          JournalEntryHelper.deleteAll(id);
          res.status(204).send();
        })
        .catch((error) => res.status(400).send(error));
    }).catch((error) => res.status(400).send(error.message));
  },
};
