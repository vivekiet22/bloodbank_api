const express = require("express");
const router = express.Router();

const hospitalController = require("../controller/hospitalController")

// router.use();

router.post("/register", hospitalController.register);
router.post("/login", hospitalController.login);

router.put("/update",hospitalController.protect,hospitalController.protect,hospitalController.update)


router.put("/delete",hospitalController.protect,hospitalController.delete)

router.get("/getblood",hospitalController.protect,hospitalController.getblood)

router.get("/getreceiver",hospitalController.protect,hospitalController.getreceiver)


router.get("/getall",hospitalController.getAllInfo)

module.exports = router;