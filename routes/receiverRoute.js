const express = require("express");
const router = express.Router();

const receiverController = require("../controller/receiverController")

router.post("/register", receiverController.register);
router.post("/login", receiverController.login);

router.post("/request",receiverController.request)

module.exports = router;