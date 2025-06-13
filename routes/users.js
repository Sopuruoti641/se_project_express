const router = require("express").Router();

const {
  getUsers,
  createUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
