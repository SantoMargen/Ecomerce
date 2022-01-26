const authenticationRegisterAdmin = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== "SuperAdmin") {
      throw { name: "NOT_PERMISSION_REGIS_ADMIN" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticationRegisterAdmin;
