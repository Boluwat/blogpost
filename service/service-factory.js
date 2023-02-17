const { userService, postService, commentService } = require(".");

const createServices = () => ({
  users: userService(),
  posts: postService(),
  comments: commentService(),
});

module.exports = {
  createServices,
};
