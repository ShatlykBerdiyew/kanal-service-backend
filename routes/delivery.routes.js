const Router = require("express");
const router = new Router();
const DeliveryController = require("../controllers/delivery.controller");

router.get("/delivery", DeliveryController.getDeliveries);

module.exports = router;
