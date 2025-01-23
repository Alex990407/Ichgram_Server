const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, commentController.createComment);

router.get("/:postId", commentController.getComments);

router.put("/:commentId", authenticate, commentController.updateComment);

router.delete("/:commentId", authenticate, commentController.deleteComment);

module.exports = router;
