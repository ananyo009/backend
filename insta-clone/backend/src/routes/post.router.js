const express = require("express");
const postRouter = express.Router();
const postConroller = require("../controller/post.controller")

const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()});


postRouter.post("/", upload.single("photo"), postConroller.createPostController)

module.exports = postRouter;