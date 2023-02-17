const logger = require("../utils/logger");
const constants = require("../utils/constants");
const { Post } = require("../model/posts");
const { isValidObjectId } = require("mongoose");
const { uploadFile } = require("../utils/cloudinary");

module.exports = {
  postService() {
    return {
      async create(payload, user) {
        try {
          payload.user = user;
          if (payload.image && payload.image.hapi) {
            const imageUrls = await uploadFile({ file: payload.image });
            payload.imageUrls = imageUrls;
            delete payload.image;
          }
          const post = await Post.create(payload);
          if (!post) return { error: constants.GONE_BAD };
          return {
            msg: constants.SUCCESS,
            postId: post._id,
          };
        } catch (error) {
          logger.log({
            level: "error",
            message: error,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async getById(postId) {
        if (!isValidObjectId(postId)) return { error: constants.NOT_FOUND };
        const post = await Post.findOne({
          _id: postId,
        }).populate("user", "userName");
        return post;
      },
      async getAll({ offset = 0, limit = 100, title } = {}) {
        try {
          const query = {};
          if (title) {
            query.title = title;
          }
          const value = await Post.find(query)
            .skip(offset)
            .sort({ createdAt: 1 })
            .limit(limit)
            .populate("user", "userName");
          return {
            value,
          };
        } catch (error) {
          logger.log({
            level: "error",
            message: error,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async updatePost(postId, payload) {
        try {
          if (!isValidObjectId(postId)) return { error: constants.NOT_FOUND };
          if (payload.image && payload.image.hapi) {
            const imageUrls = await uploadFile({ file: payload.image });
            payload.imageUrls = imageUrls;
            delete payload.image;
          }
          const updatePayload = await Post.findOneAndUpdate(
            {
              _id: postId,
            },
            payload,
            { new: true }
          );

          if (!updatePayload) return { error: constants.NOT_FOUND };
          return updatePayload;
        } catch (error) {
          logger.log({
            level: "error",
            message: error,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async deletePost(postId, user) {
        if (!isValidObjectId(postId)) return { error: constants.NOT_FOUND };
        const post = await Post.findByIdAndDelete({
          _id: postId,
          user,
        });
        if (post) {
          return { msg: constants.SUCCESS };
        }
        return { error: constants.NOT_FOUND };
      },
      async likePost(postId) {
        const likes = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $inc: { likes: 1 },
          }
        );
        return likes
      },
    };
  },
};
