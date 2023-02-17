const mongoose = require("mongoose");
const validateUser = require("../users/validate");

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    caption: {
      type: String,
    },
    imageUrls: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      validate: validateUser,
    },
    likes: {
      type: Number,
      default: 0,
    },
    // usersWhoLike: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   sparse: true,
    //   index: true,
    //   validate: validateUser,
    // },
  },
  { strict: "throw", timestamps: true }
);

const Post = mongoose.model("Post", blogPostSchema);
module.exports = {
  Post,
};
