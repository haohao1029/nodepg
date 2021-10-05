const express = require('express')
const auth = require('../middlewares/auth')
const accountsController = require("../controllers").Account;
const router = new express.Router()

router.get("/api/v1/accounts", auth, accountsController.list);
router.get("/api/v1/accounts/:id", auth, accountsController.retrieve);
router.post("/api/v1/accounts", auth, accountsController.create);
router.put("/api/v1/accounts/:id", auth, accountsController.update);
router.delete("/api/v1/accounts/:id", auth, accountsController.destroy);

module.exports = router;