const Comment = require("../models/Comment");

class CommentService {
  async createComment(userId, postId, commentText) {
    const comment = new Comment({ userId, postId, commentText });
    await comment.save();
    return comment;
  }

  // Получение комментариев для конкретного поста
  async getCommentsByPostId(postId) {
    return Comment.find({ postId })
      .populate("userId", "username")
      .sort({ createdAt: -1 }); // Сортировка по дате создания (новые сверху)
  }

  async updateComment(commentId, userId, commentText) {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, userId },
      { commentText },
      { new: true }
    );

    if (!comment) {
      throw new Error("Comment not found or not authorized to update");
    }

    return comment;
  }

  async deleteComment(commentId, userId) {
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      userId,
    });

    if (!comment) {
      throw new Error("Comment not found or not authorized to delete");
    }

    return comment;
  }
}

module.exports = new CommentService();
