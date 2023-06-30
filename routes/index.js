const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const agentRoute = require("./agent");
const Controller = require("../controllers/controller");

router.get("/", Controller.login);
router.post("/", Controller.loginCheck);
router.get("/logout", Controller.logout);
router.get("/register", Controller.register)
router.post("/register", Controller.registerCheck)
router.use("/user", userRoute);
router.use("/agent", agentRoute);

module.exports = router;
