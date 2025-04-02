const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.put("/update-profile", protectedRoute, userController.updateProfile);

router.get("/check", protectedRoute, userController.checkAuth);

// router.get("/search", protectedRoute, userController.searchUser);

// router.post(
//   "/friend-request",
//   protectedRoute,
//   userController.sendFriendRequest
// );

module.exports = router;
