const UserService = require("../user/user.service");
const AuthService = require("./auth.service");

const AuthMiddleware = {
  verifyAccessToken: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({
          error: "No authorization header found",
        });
      }
      const [bearer, token] = authorization.split(" ");
      if (!bearer || !bearer.length || !token || !token.length) {
        return res.status(401).json({
          error: "Not a valid access token",
        });
      }
      const data = await AuthService.verifyAccessToken(token);
      req._id = data._id;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        error: err.message,
      });
    }
  },

  verifyBuyerRole: async (req, res, next) => {
    try {
      const { role } = await UserService.getUserData(req._id);
      if (role !== "BUYER") {
        return res.status(401).json({
          error: "User is not a buyer",
        });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message,
      });
    }
  },

  verifyAdminRole: async (req, res, next) => {
    try {
      const { role } = await UserService.getUserData(req._id);
      if (role !== "ADMIN") {
        return res.status(401).json({
          error: "User is not an admin",
        });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message,
      });
    }
  },
};

module.exports = AuthMiddleware;
