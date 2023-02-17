const { error } = require("../utils/error");
const constants = require("../utils/constants");

const create = async (request) => {
  const comment = request.payload;
  const { postId } = request.params;
  const response = await request.server.app.services.comments.create(
    comment,
    postId
  );
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const getById = async (request) => {
  const { commentId } = request.params;
  const response = await request.server.app.services.comments.getById(
    commentId
  );
  if (response.error) {
    return error(404, response.error);
  }
  return response;
};

// const getAll = async (request) => {
//   const { query } = request;
//   const response = await request.server.app.services.posts.getAll(query);
//   if (response.error) {
//     return error(404, response.error);
//   }
//   return response;
// };

const updateComment = async (request) => {
  const { commentId } = request.params;
  const { payload } = request;
  if (Object.keys(payload).length === 0 && payload.constructor === Object) {
    return error(400, constants.EMPTY_PAYLOAD);
  }
  const response = await request.server.app.services.comments.updateComment(
    commentId,
    payload
  );
  if (response.error) {
    return error(404, response.error);
  }
  return response;
};

const deleteComment = async (request) => {
  const { id } = request.params;
  const response = await request.server.app.services.comments.deleteComment(id);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

module.exports = {
  create,
  getById,
  deleteComment,
  updateComment,
};
