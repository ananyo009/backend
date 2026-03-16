const mongoose = require("mongoose");

mongoose.set("strictPopulate", false);

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
        ref: "user",
        required: [true, "user is required"]
    }
})


const postModel = mongoose.model("post", postSchema)

module.exports = postModel;