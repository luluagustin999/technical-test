const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, "secretketjwt");
      if (decoded) {
        req.user = decoded.user;
        req.admin = decoded.admin;
        next();
      }
    } catch (err) {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  },
};
