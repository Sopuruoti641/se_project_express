const Item = require("../models/clothingItems");
const ERROR = require("./errorStatus");

const DEFAULT_SERVER_ERROR = "An error has occurred on the server.";

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(ERROR.OK).send(items))
    .catch(() => {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(ERROR.CREATED).send(item))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR.BAD_REQUEST)
          .send({ message: "Invalid item data provided." });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR });
    });
};

const deleteItem = (req, res) => {
  Item.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(ERROR.FORBIDDEN)
          .send({ message: "You can only delete your own items." });
      }

      return item
        .deleteOne()
        .then(() =>
          res
            .status(ERROR.OK)
            .send({ message: "Item successfully deleted", item })
        );
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR.NOT_FOUND).send({ message: "Item not found." });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR.BAD_REQUEST)
          .send({ message: "Invalid item ID format." });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR });
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
      if (err.name === "CastError") {
        return res
          .status(ERROR.BAD_REQUEST)
          .send({ message: "Invalid item ID format." });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR });
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
      if (err.name === "CastError") {
        return res
          .status(ERROR.BAD_REQUEST)
          .send({ message: "Invalid item ID format." });
      }
      return res
        .status(ERROR.INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
