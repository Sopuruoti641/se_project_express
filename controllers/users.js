const User = require("../models/user");
const ERROR = require("./errorStatus");

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(ERROR.OK).send(user))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(ERROR.CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(ERROR.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(ERROR.OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR.NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(ERROR.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
