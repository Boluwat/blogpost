const { error } = require("../utils/error");
const constants = require("../utils/constants");
const { verify } = require("../utils/token");

const create = async (request) => {
  const post = request.payload;
  const { user } = await verify(request.auth.credentials.token);
  const response = await request.server.app.services.posts.create(post, user);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const getById = async (request) => {
  const { postId } = request.params;
  const response = await request.server.app.services.posts.getById(postId);
  if (response.error) {
    return error(404, response.error);
  }
  return response;
};

const getAll = async (request) => {
  const { query } = request;
  const response = await request.server.app.services.posts.getAll(query);
  if (response.error) {
    return error(404, response.error);
  }
  return response;
};

const updatePost = async (request) => {
  const { postId } = request.params;
  const { payload } = request;
  const user = await verify(request.auth.credentials.token);
  if (Object.keys(payload).length === 0 && payload.constructor === Object) {
    return error(400, constants.EMPTY_PAYLOAD);
  }
  const response = await request.server.app.services.posts.updatePost(
    postId,
    payload,
    user
  );
  if (response.error) {
    return error(404, response.error);
  }
  return response;
};

const deletePost = async (request) => {
  const { id } = request.params;
  const user = await verify(request.auth.credentials.token);
  const response = await request.server.app.services.posts.getAll(id, user);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const likePost = async (request) => {
  const { postId } = request.params;
  const response = await request.server.app.services.posts.likePost(postId);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

module.exports = {
  create,
  getAll,
  getById,
  deletePost,
  updatePost,
  likePost
};
