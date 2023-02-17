const { userApi, postApi, commentApi } = require("../api");

module.exports = (server) => {
  userApi(server, "/v1/user");
  postApi(server, "/v1/post");
  commentApi(server, "/v1/comment");
};
