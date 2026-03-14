const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
    follower: {
        type: String,
        // ref: "User",
        // required: [true , "Follower is required"]
    },
    following: {
        type: String,
        // ref: "User",
        // required: [true , "Following is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "Status must be either pending, accepted, or rejected"
        }
    }
}, {
    timestamps: true
})

followerSchema.index({ follower: 1, following: 1 }, { unique: true })

const followerModel = mongoose.model("Follower", followerSchema);

module.exports = followerModel;