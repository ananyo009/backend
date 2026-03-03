const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already exists"],
        required:[true , "username is required "]
    },
    email: {
        type: String,
        unique: [true, "email already exists"],
        required:[true , "email is required "]
    },
        password: {
            type: String,
            required:[true , "password is required "]
    },
    bio: String,
    Profileimage: {
        type: String,
        default:"https://ik.imagekit.io/Ananyo09/default.webp"
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;