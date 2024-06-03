const express = require("express");
const user = require("../controllers/authControllers");
const file = require("../controllers/fileControllers");

const router = express.Router();

router.post("/signup", user.signUp);
router.post("/signin", user.login);
router.post("/signin/new_token", user.refreshToken);

router.use(user.protect);
router.get("/logout", user.logout);
router.get("/info", user.getMe);

router.get("/file/list", file.getAllFiles);
router.get("/file/:uuid", file.getFile);
router.get("/file/download/:uuid", file.downloadFile);
router.post("/file/upload", file.uploadFile, file.addBrand);
router.put("/file/update/:uuid", file.uploadFile, file.updateFile);
router.delete("/file/delete/:uuid", file.deleteFile);

module.exports = router;
