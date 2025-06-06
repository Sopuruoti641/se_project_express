const Item = require("../models/clothingItems");
const ERROR = require("./errorStatus");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(ERROR.OK).send(items))
    .catch((err) => {
      console.error(err);
      res.status(ERROR.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl })
    .then((item) => res.status(ERROR.CREATED).send(item))
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

module.exports = { getItems, createItem };
