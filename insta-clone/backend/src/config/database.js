const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        family: 4
    })
    console.log("connected to database");
}

module.exports = connectDB;