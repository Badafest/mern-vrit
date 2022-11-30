const checkValidBody = (req, res, next) => {
  try {
    const user = req.body;
    if (user?.username?.length > 0 && user?.password?.length > 0) {
      next();
    } else {
      throw new Error("Username and Password are required");
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { checkValidBody };
