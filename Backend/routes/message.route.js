const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middlewares/auth.middleware");
const messageController = require("../controllers/message.controller");

router.get("/users", protectedRoute, messageController.getUsers);
router.get("/:id", protectedRoute, messageController.getMessages);
router.post("/send/:id", protectedRoute, messageController.sendMessages);

module.exports = router;