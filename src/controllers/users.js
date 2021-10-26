const User = require("../models").User;
const UserHelper = require("../helpers").User;
const TeamHelper = require("../helpers").Team;
const AccountHelper = require("../helpers").Account;
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
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

    return User.count()
      .then((length) => {
        pagination["length"] = length;
        if (!limit) {
          pagination["perPage"] = length;
        }

        data = UserHelper.lists(reqQuery, reqParams, reqBody)
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
    const user = UserHelper.retrieve(id);
    return UserHelper.retrieve(id)
      .then((result) => {
        if (!result) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return res.status(200).send(result);
      })
      .catch((error) => res.status(400).send(error));
  },
  create(req, res) {
    let params = req.body;
    const team = TeamHelper.create({
      name: params.name,
    });

    return UserHelper.create(params)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  update(req, res) {
    const id = req.params.id;
    const params = req.body;
    const user = UserHelper.retrieve(id);
    return user
      .then((result) => {
        if (!result) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return UserHelper.update(result, params)
          .then((result) => res.status(200).send(result))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    const id = req.params.id;
    const user = UserHelper.retrieve(id);
    return user
      .then((result) => {
        if (!result) {
          return res.status(400).send({
            message: "User Not Found",
          });
        }
        console.log(result);
        return UserHelper.delete(result)
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error.message));
  },
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = User.findAll({
      raw: true,
      where: {
        [Sequelize.Op.and]: [{ email: email }],
      },
    })
      .then((result) => {
        console.log(result);
        const data = result[0];
        passwordMatch = UserHelper.isMatch(password, data.password)
          .then((result) => {
            const token = UserHelper.generateAuthToken(data);
            data["token"] = token;
            res.status(200).send(data);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error.message);
          });
      })
      .catch((error) => res.status(400).send(error.message));
  },
  async register(req, res) {
    let params = req.body;
    params["password"] = await bcrypt.hash(params.password, 8);

    const team = TeamHelper.create({
      name: params.name,
    }).then((result) => {
      params["teamId"] = result.dataValues.id;

      const user = User.create(params, { raw: true })
        .then((result) => {
          teamId = result.dataValues.teamId;
          AccountHelper.createDefaultValue(teamId);
          const token = UserHelper.generateAuthToken(result.dataValues);
          result.dataValues["token"] = token;
          res.status(201).send(result);
        })
        .catch((error) => res.status(400).send(error));
    });
  },
  me(req, res) {
    const id = req.user.id;
    return UserHelper.retrieve(id)
      .then((result) => {
        if (!result) {
          return res.status(404).send({
            message: "User Not Found",
          });
        }
        return res.status(200).send(result);
      })
      .catch((error) => res.status(400).send(error));
  },
  testToken(req, res) {
    res
      .status(200)
      .send(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyOCwibmFtZSI6ImdhbiIsImVtYWlsIjoiZ2FuQGdhbi5nYW4iLCJwYXNzd29yZCI6IiQyYSQwOCRvcGtyWHV2Lmt3MldNVzRiU25RMHRPTi9XQXpvS2x5YWtXSzBRcjdnQ1FaQTdzZ3VIWXhFdSIsImNyZWF0ZWRBdCI6IjIwMjEtMDktMTVUMDk6Mzc6NDAuMzA4WiIsInVwZGF0ZWRBdCI6IjIwMjEtMDktMTVUMDk6Mzc6NDAuMzA4WiIsInJvbGVJZCI6bnVsbCwidGVhbUlkIjpudWxsfSwiaWF0IjoxNjMxNzAwMzM3fQ.-lC8VQrsug1oxfsfyTV_PkPb5DOICeAf-8xpUG7-LM8"
      );
  },
  socialMediaLogin(req, res) {
    const params = req.body;
    const email = params.email;
    const photoUrl = params.photoUrl;
    const name = params.name;
    console.log(params);
    const user = User.findAll({
      raw: true,
      where: {
        [Sequelize.Op.and]: [{ email: email }],
      },
    }).then((result) => {
      console.log(result);
      if (result.length == 0) {
        const team = TeamHelper.create({
          email: params.email,
        }).then((result) => {
          params["teamId"] = result.dataValues.id;

          const user = User.create(params, { raw: true })
            .then((result) => {
              teamId = result.dataValues.teamId;
              AccountHelper.createDefaultValue(teamId);
              const token = UserHelper.generateAuthToken(result.dataValues);
              result.dataValues["token"] = token;
              res.status(201).send(result);
            })
            .catch((error) => res.status(400).send(error));
        });
      } else {
        data = result[0];
        const token = UserHelper.generateAuthToken(data);
        data["token"] = token;
        res.status(200).send(data);
      }
    });
  },
};
