"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Product, { foreignKey: "ProductId" });
      OrderDetail.belongsTo(models.Order, { foreignKey: "OrderId" });
    }
  }
  OrderDetail.init(
    {
      OrderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      totalPrice: {
        type: DataTypes.INTEGER,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
