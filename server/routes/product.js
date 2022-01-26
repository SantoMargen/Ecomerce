const express = require("express");
const ControllerProduct = require("../controllers/productController");
const authentication = require("../middlewares/authentication");
const authenticationAdmin = require("../middlewares/authenticationAdmin");
const router = express.Router();

router.get("/products", ControllerProduct.getProduct);
router.get("/products/:productId", ControllerProduct.productId);
router.post(
  "/addProducts",
  authentication,
  authenticationAdmin,
  ControllerProduct.addProduct
);
router.patch(
  "/updateProducts/:productId",
  authentication,
  authenticationAdmin,
  ControllerProduct.updateProduct
);

module.exports = router;
