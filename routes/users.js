const express = require("express");
const user = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", user.signUp);
router.post("/signin", user.login);
router.post("/signin/new_token", user.refreshToken);
router.get("/logout", user.protect, user.logout);
router.get("/info", user.protect, user.getMe);
// router.put("/update-me", protect, updateMe);
// router.put("/update-my-password", protect, updateMyPassword);
// router.delete("/delete-me", protect, deleteMe);

module.exports = router;
