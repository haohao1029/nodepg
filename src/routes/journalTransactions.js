const express = require('express')
const auth = require('../middlewares/auth')
const JournalTransactionController = require("../controllers").JournalTransction;
const router = new express.Router()

router.get("/api/v1/journal_transactions", auth, JournalTransactionController.list);
router.get("/api/v1/journal_transactions/:id", auth, JournalTransactionController.retrieve);
router.post("/api/v1/journal_transactions", auth, JournalTransactionController.create);
router.put("/api/v1/journal_transactions/:id", auth, JournalTransactionController.update);
router.delete("/api/v1/journal_transactions/:id", auth, JournalTransactionController.destroy);

module.exports = router;