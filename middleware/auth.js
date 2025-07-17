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

export const register = ({ name, avatar, email, password }) => {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => res.json());
};

export const login = ({ email, password }) => {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const checkToken = (token) => {
  return fetch("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
