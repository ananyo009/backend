const express = require('express');
const indentifyUser = require('../middleware/post.middleware');
const FolloweeRouter = express.Router();

const followerController = require("../controller/followee.controller")

FolloweeRouter.post("/follow/:username", indentifyUser, followerController.followUserController)

FolloweeRouter.post("/unfollow/:username", indentifyUser, followerController.unfollowUserController)


FolloweeRouter.post("/status/:followid", indentifyUser, followerController.acceptFollowRequestController)

FolloweeRouter.get("/following", indentifyUser, followerController.getFollowersController)


module.exports = FolloweeRouter;