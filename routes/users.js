const router = require("express").Router();

const {
  getUsers,
  createUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

const auth = require("../middleware/auth");

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
