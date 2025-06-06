const router = require("express").Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/userId", deleteUser);

module.exports = router;
