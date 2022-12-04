const { verifyToken } = require("./user.helpers");

const isUserLoggedIn = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(400).json({
        error: "User is not logged in",
      });
    }
    const token = auth.split(" ")[1];
    const isTokenValid = await verifyToken(token);
    if (!isTokenValid) {
      return res.status(400).json({
        error: "Not a valid log in",
      });
    }
    req.user = isTokenValid.username;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { isUserLoggedIn };
