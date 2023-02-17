const cloudinary = require("cloudinary");
const fs = require("fs");
const { Readable } = require("stream");
// const { resolve } = require("path");
const logger = require("./logger");
require("dotenv").config();

function unlink(path) {
  fs.unlink(path, (err) => {
    if (err) {
      logger.log({
        level: "error",
        message: err,
      });
    }
  });
}

const uploadFile = async ({ file, fileDest, fileTittle }) => {
  let filepath = fileDest;
  let filename = fileTittle;
  try {
    return new Promise((resolve) => {
      if (filepath) {
        const readable = new Readable();
        readable._read = () => {};
        readable.push(file);
        readable.push(null);
        file = readable;
      }
      if (!fileDest && file) {
        filename = file.hapi.filename.replace(
          /\//g,
          '-',
        );
        filepath = `uploads/${filename}`;
      }
      filepath = filepath.replace(/\s/g, '');
      const writer = fs.createWriteStream(filepath);
      file.pipe(writer);
      writer.on("finish", async () => {
        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
        });
        await cloudinary.v2.uploader
          .upload(
            filepath,
            { public_id: `${filename}` },
            (error, result) => {
              resolve(result.secure_url);
            }
          )
          .catch((ex) => {
            unlink(filepath);
            logger.log({
              level: "error",
              message: ex,
            });
          });
        unlink(filepath);
      });
    });
  } catch (err) {
    unlink(filepath);
    logger.log({
      level: "error",
      message: err,
    });
  }
};

module.exports = {
  uploadFile,
};
