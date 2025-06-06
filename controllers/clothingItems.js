const Item = require("../models/clothingItems");
const ERROR = require("./errorStatus");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(ERROR.OK).send(items))
    .catch((err) => {
      res.status(ERROR.INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl })
    .then((item) => res.status(ERROR.CREATED).send(item))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(ERROR.BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  Item.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(ERROR.BAD_REQUEST)
          .send({ message: "You can only delete your own items." });
      }
      return item.deleteOne().then(() => res.status(ERROR.NO_CONTENT).send());
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR.NOT_FOUND).send({ message: "Item not found." });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(ERROR.NOT_FOUND).send({ message: "Item not found." });
      }
      return res.status(ERROR.OK).send(item);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(ERROR.NOT_FOUND).send({ message: "Item not found." });
      }
      return res.status(ERROR.OK).send(item);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
