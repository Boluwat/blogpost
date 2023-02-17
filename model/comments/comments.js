const mongoose = require("mongoose");
const validateUser = require("../users/validate");
const validatePost = require('../posts/validate')

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
      validate: validatePost,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { strict: "throw", timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = {
  Comment,
};
