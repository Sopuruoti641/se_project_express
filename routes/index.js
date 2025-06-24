const router = require("express").Router();
const ERROR = require("../controllers/errorStatus");
const auth = require("../middleware/auth");
const { createUser, login } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", require("../routes/users"));
router.use("/items", require("./items"));

router.use((req, res) => {
  res.status(ERROR.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
