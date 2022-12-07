const UserService = require("../user/user.service");
const AuthHelper = require("./auth.helper");

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
      if (!bearer.length || !token.length) {
        return res.status(401).json({
          error: "Not a valid token",
        });
      }
      const data = await AuthHelper.verifyToken(token);
      if (!data || !data._id) {
        return res.status(401).json({
          error: "Not a valid token",
        });
      }
      req._id = data._id;
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
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
          error: "User is not an ADMIN",
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
