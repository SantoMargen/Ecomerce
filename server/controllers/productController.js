const { Product, OrderDetail, Order, Category, User } = require("../models");
class ControllerProduct {
  static async getProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "AuthorId", "CategoryId"],
        },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  static async productId(req, res, next) {
    try {
      const id = Number(req.params.productId);

      if (!id) {
        throw { name: "PRODUCT_ID_NOTFOUND" };
      }
      const product = await Product.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });
      if (!product) {
        throw { name: "PRODUCt_NOTFOUND" };
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const { name, imgUrl, price, CategoryId, AuthorId, description } =
        req.body;
      const payload = {
        name,
        imgUrl,
        price,
        CategoryId,
        AuthorId,
        description,
      };
      const newProduct = await Product.create(payload);
      res.status(201).json({
        id: newProduct.id,
        name: newProduct.name,
        imgUrl: newProduct.imgUrl,
        price: newProduct.price,
        CategoryId: newProduct.CategoryId,
        AuthorId: newProduct.AuthorId,
        description: newProduct.description,
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const productId = Number(req.params.productId);
      const { name, imgUrl, price, CategoryId, AuthorId, description } =
        req.body;
      if (!productId) {
        throw { name: "PRODUCT_ID_NOTFOUND" };
      }
      const product = await Product.findOne({ where: { id: productId } });
      if (!product) {
        throw { name: "PRODUCt_NOTFOUND" };
      }
      if (
        !name ||
        !imgUrl ||
        !price ||
        !CategoryId ||
        !AuthorId ||
        !description
      ) {
        throw { name: "EMPTY_DATA" };
      }
      const payload = {
        name,
        imgUrl,
        price,
        CategoryId,
        AuthorId,
        description,
      };
      const updateProduct = await Product.update(payload, {
        where: { id: productId },
        returning: true,
      });
      const response = updateProduct[1][0];
      res.status(200).json({ product: response });
    } catch (err) {
      next(err);
    }
  }
  static async checkoutProduct(req, res, next) {
    try {
      let totalPrice = 0;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerProduct;
