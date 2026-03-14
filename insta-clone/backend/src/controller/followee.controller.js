const express = require('express');

const followerModel = require("../model/follower.model");

const userModel = require("../model/user.model")


async function followUserController(req, res) {
    
    const follower = req.user.username;

    const following = req.params.username;

    const isUserExist = await userModel.findOne({
        username: following
    })

    if(!isUserExist) {
        return res.status(200).json({
            message: "user does not exists"
        })
    }

    const isfollowUserExist = await followerModel.findOne({
        follower: follower,
        following: following
    })

if(isfollowUserExist) {
    return res.status(200).json({
        message: "you are already following this user"
    })
}

    if (follower === following) {
        return res.status(200).json({
            message: "you cannot follow yourself"
        })
    }

    
    
    const followRecord = await followerModel.create({
        follower: follower,
        following : following
    }) 

    if(followRecord.status === "pending") {
        return res.status(200).json({
            message: `follow request sent to ${following}`,
            followRecord
        })
    }
     return res.status(201).json({
        message: `you are now following ${following}`,
        followRecord
    })
}

async function unfollowUserController(req, res) {
    const follower = req.user.username;
    const following = req.params.username;


    const isUserfollowing = await followerModel.findOne({
        follower: follower,
        following: following    
    })

    if(!isUserfollowing) {
        return res.status(200).json({
            message: "you are not following this user"
        })
    }

    await followerModel.findByIdAndDelete(isUserfollowing._id);

    res.status(200).json({
        message: `you have unfollowed ${following}`
    })
}

async function acceptFollowRequestController(req, res) {
    const username = req.user.username;

    const followid = req.params.followid;

    const status = req.body.status;
    
    const followRecord = await followerModel.findById(followid);
    
    if(!followRecord) {
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    followRecord.status = status;
    await followRecord.save();

    return res.status(200).json({
        message: `follow request has been ${status}`,
        followRecord
    })
}

async function getFollowersController(req, res) {
    const username = req.user.username;


    const followerRecord = await followerModel.findOne({ follower: username });
    
    if (followerRecord.status === "pending") {
        return res.status(200).json({
            message: "your request is pending"
        })
    }
    else if (followerRecord.status === "accepted") {
        return res.status(200).json({
            message: "your request has been accepted",
            followers: followerRecord.follower,
            following: followerRecord.following
        })
    }
    else {
        return res.status(200).json({
            message: "your request has been rejected"
        })
    }
        
    }

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    getFollowersController
}