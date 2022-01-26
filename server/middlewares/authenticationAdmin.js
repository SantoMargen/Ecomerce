const authenticationAdmin = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "Admin") {
      throw { name: "ADMIN_ACCESS" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticationAdmin;
