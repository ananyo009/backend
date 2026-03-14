const express = require("express");
const postRouter = express.Router();
const postConroller = require("../controller/post.controller")

const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() });

const indetifyUser = require("../middleware/post.middleware")


postRouter.post("/", upload.single("photo"), indetifyUser, postConroller.createPostController)

postRouter.get("/", indetifyUser, postConroller.getPostsController)

postRouter.get("/details/:postId", indetifyUser, postConroller.postDetailsController);

postRouter.post("/like/:postId", indetifyUser, postConroller.likePostController)

module.exports = postRouter;