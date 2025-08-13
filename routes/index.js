const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("../models/clothingItems");
const { createUser, login } = require("../controllers/users");
const {
  loginValidation,
  userInfoValidation,
} = require("../middleware/validation");

router.use("/users", userRouter);
router.use("/items", clothingItems);
router.post("/signin", loginValidation, login);
router.post("/signup", userInfoValidation, createUser);

const NotFoundError = require("../errors/not-found-err");

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});
module.exports = router;
