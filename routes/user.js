const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const ControllerUser = require("../controllers/controllerUser");

router.get("/", ControllerUser.userFeeds);
router.get("/account", ControllerUser.account);
router.get("/account/:id", ControllerUser.accountUpdate)
router.post("/account/:id", ControllerUser.accountUpdatePost)
router.get("/viewPost/:id", ControllerUser.viewPost);
router.get("/add", ControllerUser.add);
router.post("/add", ControllerUser.addPost);
router.get("/like/:PostId/:TagId/:UserId", ControllerUser.like);
router.get("/tags", ControllerUser.userTags);
router.get("/post/add/:TagId", ControllerUser.userAddPost);
router.post("/post/add/", ControllerUser.userAddPostPost);
router.get("/:sort", ControllerUser.userFeeds);





module.exports = router;
