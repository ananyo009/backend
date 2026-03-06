const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: "",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user is required"]
    }
})


const postModel = mongoose.model("post", postSchema)

module.exports = postModel;