const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const auth = require("../middleware/auth");
const itemsRouter = require("./items");
const usersRouter = require("./users");
const { createUser, login } = require("../controllers/users");

// Public routes (no auth)
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

// Protected routes
router.use(auth);

router.use("/items", itemsRouter);
router.use("/users", usersRouter);

module.exports = router;
