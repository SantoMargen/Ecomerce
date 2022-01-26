const errorHandler = (err, req, res, next) => {
  console.log(err.name);

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "USERAME_REQUIRED":
    case "PASSWORD_REQUIRED":
      res.status(400).json({ message: "Username/Password id Required" });
      break;
    case "USER_NOTFOUND":
      res.status(401).json({ message: " Invalid Username/Password" });
      break;
    case "ID_NOTFOUND":
    case "NOTFOUND_USER":
      res.status(401).json({ message: "user Not found" });
      break;
    case "PRODUCT_ID_NOTFOUND":
    case "PRODUCt_NOTFOUND":
      res.status(401).json({ message: "Product Not found" });
      break;
    case "AUTHENTICATED":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Access Token" });
      break;
    case "EMPTY":
    case "EMPTY_DATA":
      res.status(400).json({ message: "Data can't be empty" });
      break;
    case "ADMIN_ACCESS":
      res.status(403).json({ message: "Only Admin can access" });
      break;
    case "NOT_PERMISSION_REGIS_ADMIN":
      res.status(403).json({ message: "Only SuperAdmin can access" });
      break;
    default:
      res.status(500).json({ message: "internal server error" });
      break;
  }
};

module.exports = errorHandler;
