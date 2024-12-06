const mongoose = require("mongoose");

const userFollowersAssignmentSchema = new mongoose.Schema(
  {
    userFollows: {
      // Кто подписывается
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userFollowed: {
      // На кого подписываются
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const UserFollowersAssignment = mongoose.model(
  "UserFollowersAssignment",
  userFollowersAssignmentSchema
);
module.exports = UserFollowersAssignment;
