const Router = require("express");
const router = new Router();
const DeliveryController = require("../controllers/delivery.controller");

router.post("/delivery", DeliveryController.createDelivery);
router.get("/delivery", DeliveryController.getDeliveries);
router.get("/delivery/:id", DeliveryController.getOneDelivery);
router.put("/delivery", DeliveryController.updateDelivery);
router.delete("/delivery/:id", DeliveryController.deleteDelivery);

module.exports = router;
