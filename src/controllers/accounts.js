const Account = require("../models").Account;
const AccountHelper = require("../helpers").Account;
const Sequelize = require("sequelize");
const common = require("../common");

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
      
      return Account.count()
        .then((length) => {
          pagination["length"] = length;
          if (!limit) {
            pagination["perPage"] = length;
          }
          
          data = AccountHelper.lists(reqQuery, reqParams, reqBody)
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
    retrieve(req, res) {
      const id = req.params.id;
      const Account = AccountHelper.retrieve(id);
      return AccountHelper.retrieve(id)
        .then((result) => {
          if (!result) {
            return res.status(404).send({
              message: "Account Not Found",
            });
          }
          return res.status(200).send(result);
        })
        .catch((error) => res.status(400).send(error));
    },
    create(req, res) {
      const params = req.body;
      return AccountHelper.create(params)
        .then((result) => res.status(201).send(result))
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    },
    update(req, res) {
      const id = req.params.id;
      const params = req.body;
      const Account = AccountHelper.retrieve(id);
      return Account
        .then((result) => {
          if (!result) {
            return res.status(404).send({
              message: "Account Not Found",
            });
          }
          return AccountHelper.update(result, params)
            .then((result) => res.status(200).send(result))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
      const id = req.params.id;
      const Account = AccountHelper.retrieve(id);
      return Account
        .then((result) => {
          if (!result) {
            return res.status(400).send({
              message: "Account Not Found",
            });
          }
          return AccountHelper.delete(result)
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error.message));
    },
  };
  