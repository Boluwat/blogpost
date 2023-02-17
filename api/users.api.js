const Joi = require("joi");
const namespace = require("hapijs-namespace");
const { userController } = require("../controller");

module.exports = (server, prefix) => {
  namespace(server, prefix, [
    {
      method: "Post",
      path: "/signUp",
      config: {
        description: "sign up",
        tags: ["api", "user"],
        validate: {
          payload: Joi.object({
            email: Joi.string()
              .required()
              .lowercase()
              .trim()
              .email()
              .prefs({ convert: true }),
            userName: Joi.string()
              .required()
              .lowercase()
              .prefs({ convert: true }),
            password: Joi.string().required(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: userController.signUpUser,
      },
    },
    {
      method: "Post",
      path: "/login",
      config: {
        description: "sign-in",
        tags: ["api", "user"],
        validate: {
          payload: Joi.object({
            userName: Joi.string()
              .required()
              .lowercase()
              .prefs({ convert: true }),
            password: Joi.string().required(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: userController.userLogin,
      },
    },
  ]);
};
