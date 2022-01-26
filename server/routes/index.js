const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const user = require("./user");
const product = require("./product");
const order = require("./order");

router.use("/", user);
router.use("/", product);
router.use("/", order);

router.use(errorHandler);
module.exports = router;
