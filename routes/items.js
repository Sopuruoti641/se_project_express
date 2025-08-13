const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
  clothingItemValidation,
  idValidation,
} = require("../middleware/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", authMiddleware, clothingItemValidation, createItem);
router.delete("/:itemId", authMiddleware, idValidation, deleteItem);
router.put("/:itemId/likes", authMiddleware, idValidation, likeItem);
router.delete(
  "/:itemId/likes",
  authMiddleware,
  clothingItemValidation,
  dislikeItem
);

module.exports = router;
