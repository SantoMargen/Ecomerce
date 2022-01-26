const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class ControllerUser {
  static async registerAdmin(req, res, next) {
    try {
      const { name, username, email, password, phoneNumber, address } =
        req.body;
      const payload = {
        name,
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "Admin",
      };
      const newUser = await User.create(payload);
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      });
    } catch (err) {
      next(err);
    }
  }
  static async registeruser(req, res, next) {
    try {
      const { name, username, email, password, phoneNumber, address } =
        req.body;
      const payload = {
        name,
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "Customer",
      };

      const newUser = await User.create(payload);
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginUser(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "USERAME_REQUIRED" };
      }
      if (!password) {
        throw { name: "PASSWORD_REQUIRED" };
      }
      const response = await User.findOne({
        where: { username: username },
      });
      if (!response || !comparePassword(password, response.password)) {
        throw { name: "USER_NOTFOUND" };
      }
      const payload = {
        id: response.id,
        email: response.email,
        username: response.username,
        role: response.role,
      };

      const token = generateToken(payload);
      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
  static async editUser(req, res, next) {
    try {
      const id = Number(req.params.userId);
      const { email, address } = req.body;
      if (!id) {
        throw { name: "ID_NOTFOUND" };
      }
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NOTFOUND_USER" };
      }
      if (!email || !address) {
        throw { name: "EMPTY" };
      }
      const payload = {
        email: email,
        address: address,
      };
      const updateUser = await User.update(payload, {
        where: { id: id },
        returning: true,
      });
      const userUpdate = updateUser[1][0];
      res.status(200).json({
        id: userUpdate.id,
        email: userUpdate.email,
        address: userUpdate.address,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerUser;
