const { error } = require("../utils/error");
const constants = require("../utils/constants");

const signUpUser = async (request) => {
  const user = request.payload;
  const response = await request.server.app.services.users.signUpUser(user);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const userLogin = async (request) => {
  const user = request.payload;
  const response = await request.server.app.services.users.userLogin(user);
  if (response.error) {
    return error(404, response.error);
  }
  return response;
};

module.exports = {
  signUpUser,
  userLogin,
};
