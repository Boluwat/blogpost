const logger = require("../utils/logger");
const constants = require("../utils/constants");
const { hashManager } = require("../utils/bcrypt");
const { sign } = require("../utils/token");
const { User } = require("../model/users");

async function checkIfUserExist(payload) {
  const userExist = await User.findOne({
    $or: [{ email: payload.email }, { userName: payload.userName }],
  });
  return userExist;
}

async function getResponse(user) {
  user = user.toObject();
  const option = {};
  delete user.password;

  return {
    user,
    token: await sign({
      user: user._id,
      ...option,
      email: user.email,
      userName: user.userName,
    }),
  };
}

module.exports = {
  userService() {
    return {
      async signUpUser(payload) {
        try {
          const validate = await checkIfUserExist(payload);
          if (!validate) {
            payload.password = await hashManager().hash(payload.password);
            const newUser = await User.create(payload);
            return {
              msg: constants.SUCCESS,
              userId: newUser._id,
            };
          }
          return { error: constants.DUPLICATE_USER };
        } catch (ex) {
          logger.log({
            level: "error",
            message: ex,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async userLogin(payload) {
        try {
          const user = await User.findOne({
            userName: payload.userName,
          });
          if (!user) return { error: constants.NOT_FOUND };
          const validatePassword = await hashManager().compare(
            payload.password,
            user.password
          );
          if (!validatePassword) return { error: constants.INVALID_USER };
          return {
            user: await getResponse(user),
          };
        } catch (error) {
          logger.log({
            level: "error",
            message: error,
          });
          return {error: constants.GONE_BAD}
        }
      },
    };
  },
};
