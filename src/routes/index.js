const userRouter = require('./users')
const accountRouter = require('./account');
const JournalTransctionRounter = require('./journalTransactions');

module.exports = (app) => {

  app.use(userRouter)
  app.use(accountRouter)
  app.use(JournalTransctionRounter)
  app.get("/api/v1", (req, res) =>
  res.status(200).send({
    message: "Welcome to the NodePg API!",
  })
);
};
