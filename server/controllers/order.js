const { Product, OrderDetail, Order, Category, User } = require("../models");

class ControllerOrder {
  static async checkout(req, res, next) {
    try {
      let totalPrice = 0;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerOrder;
