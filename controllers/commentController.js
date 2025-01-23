const commentService = require("../services/commentService");

class CommentController {
  // Создание комментария
  async createComment(req, res) {
    try {
      const { postId, commentText } = req.body;
      const userId = req.user._id; // ID пользователя из middleware
      const comment = await commentService.createComment(
        userId,
        postId,
        commentText
      );
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Получение комментариев для поста
  async getComments(req, res) {
    try {
      const { postId } = req.params;
      const comments = await commentService.getCommentsByPostId(postId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Обновление комментария
  async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { commentText } = req.body;
      const userId = req.user._id;
      const updatedComment = await commentService.updateComment(
        commentId,
        userId,
        commentText
      );
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Удаление комментария
  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user._id;
      await commentService.deleteComment(commentId, userId);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CommentController();
