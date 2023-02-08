const express = require("express");
const router = express.Router();

const hospitalController = require("../controller/hospitalController")

router.post("/register", hospitalController.register);
router.post("/login", hospitalController.login);

router.put("/update",hospitalController.update)


router.put("/delete",hospitalController.delete)

router.get("/getblood",hospitalController.getblood)

router.get("/getreceiver",hospitalController.getreceiver)


router.get("/getall",hospitalController.getAllInfo)

module.exports = router;