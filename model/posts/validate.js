const mongoose = require("mongoose");

module.exports = async function validator(val) {
  const Post = mongoose.model("Post");
  try {
    const post = await Post.findById(val).lean().exec();
    return Boolean(post);
  } catch (ex) {
    return false;
  }
};
