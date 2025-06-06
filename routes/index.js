const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./items");
const ERROR = require("../controllers/errorStatus");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(ERROR.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
