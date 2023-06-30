const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const ControllerAgent = require("../controllers/controllerAgent");

router.get("/", ControllerAgent.agentFeeds);
router.get("/account", ControllerAgent.account);
router.get("/account/:id", ControllerAgent.accountUpdate)
router.post("/account/:id", ControllerAgent.accountUpdatePost)
router.get("/viewPost/:id", ControllerAgent.viewPost);
router.get("/deletePost/:id", ControllerAgent.deletePost);
router.get("/tags", ControllerAgent.agentTags);
router.get("/tags/add", ControllerAgent.agentAddTag);
router.post("/tags/add", ControllerAgent.agentAddTagPost);
router.get("/post/add/:TagId", ControllerAgent.agentAddPost);
router.post("/post/add/", ControllerAgent.agentAddPostPost);
router.get("/:sort", ControllerAgent.agentFeeds);
router.get("/like/:PostId/:TagId/:UserId", ControllerAgent.like);

module.exports = router;
