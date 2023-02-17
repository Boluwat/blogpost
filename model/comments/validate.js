const mongoose = require("mongoose");

module.exports = async function validator(val) {
  const Comment = mongoose.model("Comment");
  try {
    const comment = await Comment.findById(val).lean().exec();
    return Boolean(comment);
  } catch (ex) {
    return false;
  }
};
