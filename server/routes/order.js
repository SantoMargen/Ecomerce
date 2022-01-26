const express = require("express");
const ControllerOrder = require("../controllers/order");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/checkout", authentication, ControllerOrder.checkout);

module.exports = router;
