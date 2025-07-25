const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ERROR = require("./errorStatus");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, avatar }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(ERROR.CREATED).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(ERROR.CONFLICT)
          .send({ message: "Email already exists." });
      }
      if (err.name === "ValidationError") {
        return res.status(ERROR.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const getCurrentUser = (req, res) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) =>
      user
        ? res.send(user)
        : res.status(ERROR.NOT_FOUND).send({ message: "User not found" })
    )
    .catch((err) =>
      res.status(ERROR.INTERNAL_SERVER_ERROR).send({ message: err.message })
    );

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR.BAD_REQUEST)
      .send({ message: "Email and password are required." });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({
        token,
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "Incorrect email or password") {
        return res
          .status(ERROR.UNAUTHORIZED)
          .send({ message: "Incorrect email or password" });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(ERROR.NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

module.exports = { createUser, getCurrentUser, login, updateUser };

// const getUsers = (req, res) => {
//   User.find({})
//     .then((user) => res.status(ERROR.OK).send(user))
//     .catch((err) => {
//       console.log(err);
//       return res
//         .status(ERROR.INTERNAL_SERVER_ERROR)
//         .send({ message: err.message });
//     });
// };

// const login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(ERROR.BAD_REQUEST)
//       .send({ message: "Email and password are required." });
//   }

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
//         expiresIn: "7d",
//       });
//       return res.send({ token });
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err.message === "Incorrect email or password") {
//         return res
//           .status(ERROR.UNAUTHORIZED)
//           .send({ message: "Incorrect email or password" });
//       }
//       return res
//         .status(ERROR.INTERNAL_SERVER_ERROR)
//         .send({ message: "An error has occurred on the server." });
//     });
// };
