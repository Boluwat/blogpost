const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { strict: "throw", timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
