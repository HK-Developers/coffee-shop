const jwt = require("jsonwebtoken");
const { RoleModel } = require("./models/User");

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  const Admin = await RoleModel.findOne({ name: "Administrator" });
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      }
      if (decoded.role === Admin._id) {
        req.userData = decoded;
        return next();
      }
      return res.json({
        success: false,
        message: "You are not administrator",
      });
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
  return 0;
};

module.exports = authorization;
