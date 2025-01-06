const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  description: { type: String },
  avatarUrl: { type: String },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
