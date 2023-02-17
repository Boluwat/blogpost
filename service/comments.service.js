const logger = require("../utils/logger");
const constants = require("../utils/constants");
const { Comment } = require("../model/comments");
// const { Post } = require("../model/posts");
const { isValidObjectId } = require("mongoose");

module.exports = {
  commentService() {
    const { postService } = require(".");
    return {
      async create(payload, postId) {
        try {
          // const {post} = await postService().getById(postId);
          // console.log(post)
          payload.post =postId
          const comments = await Comment.create(payload);
          if (!comments) return { error: constants.GONE_BAD };
          return {
            msg: constants.SUCCESS,
            commentId: comments._id,
          };
        } catch (error) {
          logger.log({
            level: "error",
            message: error,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async getById(commentId) {
        if (!isValidObjectId(commentId)) return { error: constants.NOT_FOUND };
        const comments = await Post.findOne({
          _id: commentId,
        }).populate("post", "title");
        return comments;
      },
      //   async getAll({ offset = 0, limit = 100, title } = {}) {
      //     try {
      //       const query = {};
      //       if (title) {
      //         query.title = title;
      //       }
      //       const value = await Post.find(query)
      //         .skip(offset)
      //         .sort({ createdAt: 1 })
      //         .limit(limit)
      //         .populate("user", "userName");
      //       return {
      //         value,
      //       };
      //     } catch (error) {
      //       logger.log({
      //         level: "error",
      //         message: error,
      //       });
      //       return { error: constants.GONE_BAD };
      //     }
      //   },
      async updateComment(commentId, payload) {
        try {
          if (!isValidObjectId(commentId))
            return { error: constants.NOT_FOUND };
          const comment = await Comment.findOneAndUpdate(
            {
              _id: commentId,
            },
            payload,
            { new: true }
          );

          if (!comment) return { error: constants.NOT_FOUND };
          return comment;
        } catch (error) {
          logger.log({
            level: "error",
            message: error,
          });
          return { error: constants.GONE_BAD };
        }
      },
      async deleteComment(commentId) {
        if (!isValidObjectId(commentId)) return { error: constants.NOT_FOUND };
        const comment = await Comment.findByIdAndDelete({
          _id: commentId,
        });
        if (comment) {
          return { msg: constants.SUCCESS };
        }
        return { error: constants.NOT_FOUND };
      },
    };
  },
};
