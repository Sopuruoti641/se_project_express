const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const ERROR = require("../controllers/errorStatus");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(ERROR.UNAUTHORIZED).send({ message: "Invalid token" });
  }

  req.user = payload;
  return next();
};
