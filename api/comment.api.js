const Joi = require("joi");
const namespace = require("hapijs-namespace");
const { commentControllers } = require("../controller");

module.exports = (server, prefix) => {
  namespace(server, prefix, [
    {
      method: "Post",
      path: "/comment/{postId}",
      config: {
        description: "create a comment",
        tags: ["api", "blogPost"],
        validate: {
          params: Joi.object({
            postId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("post id"),
          }),
          payload: Joi.object({
            text: Joi.string().required(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: commentControllers.create,
      },
    },
    {
      method: "Get",
      path: "/get-comment/{commentId}",
      config: {
        description: "get a comment",
        tags: ["api", "comment"],
        validate: {
          params: Joi.object({
            commentId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("post id"),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: commentControllers.getById,
      },
    },
    {
      method: "Put",
      path: "/update-comment/{commentId}",
      config: {
        description: "update a comment",
        tags: ["api", "comment"],
        validate: {
          params: Joi.object({
            commentId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("post id"),
          }),
          payload: Joi.object({
            text: Joi.string().optional(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: commentControllers.updateComment,
      },
    },
    {
      method: "Delete",
      path: "/delete-comment/{commentId}",
      config: {
        description: "delete post",
        tags: ["api", "comment"],
        validate: {
          params: Joi.object({
            commentId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("comment id"),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: commentControllers.deleteComment,
      },
    },
  ]);
};
