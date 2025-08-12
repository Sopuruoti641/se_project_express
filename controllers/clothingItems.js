const Item = require("../models/clothingItems");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
// const UnauthorizedError = require("../errors/unauthorized-err");
const ForbiddenError = require("../errors/forbidden-err");

const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next); // pass to centralized error handler
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data provided."));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  Item.findById(req.params.itemId)
    .orFail(() => new NotFoundError("Item not found."))
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        throw new ForbiddenError("You can only delete your own items.");
      }
      return item.deleteOne();
    })
    .then(() => res.send({ message: "Item successfully deleted" }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format."));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found.");
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format."));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found.");
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format."));
      }
      return next(err);
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
