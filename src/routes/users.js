const express = require('express')
const auth = require('../middlewares/auth')
const usersController = require("../controllers").User;
const router = new express.Router()

router.get("/api/v1/token", usersController.testToken);
router.get("/api/v1/users", auth, usersController.list);
router.post("/api/v1/users/login", usersController.login);
router.post("/api/v1/users/register", usersController.register);
router.get("/api/v1/users/me", auth, usersController.me);
router.get("/api/v1/users/:id", auth, usersController.retrieve);
router.post("/api/v1/users", auth, usersController.create);
router.put("/api/v1/users/:id", auth, usersController.update);
router.delete("/api/v1/users/:id", auth, usersController.destroy);

module.exports = router;