const mongoose = require("mongoose");

module.exports = async function validator(val) {
  const User = mongoose.model("User");
  try {
    const user = await User.findById(val).lean().exec();
    return Boolean(user);
  } catch (ex) {
    return false;
  }
};
