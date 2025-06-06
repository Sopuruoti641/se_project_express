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

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { imageURL } = req.params;

  console.log(userId, imageURL);
  User.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(ERROR.OK).send({ data: item }))
    .catch((err) => {
      res.status(ERROR.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  console.log(userId);
  User.findByIdAndDelete(userId)
    .orFail()
    .then((user) => res.status(ERROR.NO_CONTENT).send(user))
    .catch((err) => {
      res.status(ERROR.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser, updateUser, deleteUser };
