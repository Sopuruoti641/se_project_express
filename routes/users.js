const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getCurrentUser, updateUser } = require("../controllers/users");

const auth = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);
router.patch(
  "/me",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateUser
);

module.exports = router;
