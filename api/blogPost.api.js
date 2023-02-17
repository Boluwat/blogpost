const Joi = require("joi");
const namespace = require("hapijs-namespace");
const { blogPostControllers } = require("../controller");

module.exports = (server, prefix) => {
  namespace(server, prefix, [
    {
      method: "Post",
      path: "/blogPost",
      config: {
        description: "create a post",
        tags: ["api", "blogPost"],
        auth: "simple",
        payload: {
          output: "stream",
          parse: true,
          allow: "multipart/form-data",
          maxBytes: 2 * 1000 * 1000,
          multipart: true,
        },
        validate: {
          payload: Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            caption: Joi.string().optional(),
            image: Joi.optional(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: blogPostControllers.create,
      },
    },
    {
      method: "Get",
      path: "/get-post/{postId}",
      config: {
        description: "get a post",
        tags: ["api", "post"],
        validate: {
          params: Joi.object({
            postId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("post id"),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: blogPostControllers.getById,
      },
    },
    {
      method: "Put",
      path: "/update-post/{postId}",
      config: {
        description: "update a post",
        tags: ["api", "post"],
        auth: 'simple',
        payload: {
          output: "stream",
          parse: true,
          allow: "multipart/form-data",
          maxBytes: 2 * 1000 * 1000,
          multipart: true,
        },
        validate: {
          params: Joi.object({
            postId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("post id"),
          }),
          payload: Joi.object({
            title: Joi.string().optional(),
            text: Joi.string().optional(),
            caption: Joi.string().optional(),
            image: Joi.optional(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: blogPostControllers.updatePost,
      },
    },
    {
      method: "Delete",
      path: "/delete-post/{postId}",
      config: {
        description: "delete post",
        tags: ["api", "post"],
        validate: {
          params: Joi.object({
            postId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("post id"),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: blogPostControllers.deletePost,
      },
    },
    {
      method: "Put",
      path: "/like-post/{postId}",
      config: {
        description: "like a post",
        tags: ["api", "post"],
        validate: {
          params: Joi.object({
            postId: Joi.string()
              .required()
              .min(24)
              .max(24)
              .description("post id"),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: blogPostControllers.likePost,
      },
    },
  ]);
};
