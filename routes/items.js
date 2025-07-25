const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const auth = require("../middleware/auth");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.use(auth);

router.post(
  "/",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
      imageUrl: Joi.string().uri().required(),
    }),
  }),
  createItem
);

router.delete(
  "/:itemId",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteItem
);

router.put(
  "/:itemId/likes",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeItem
);

router.delete(
  "/:itemId/likes",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().length(24).hex().required(),
    }),
  }),
  dislikeItem
);

module.exports = router;
