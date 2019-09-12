const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      }
      req.userData = decoded;
      return next();
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
  return 0;
};

module.exports = Authentication;
