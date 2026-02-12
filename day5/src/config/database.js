const mongoose = require("mongoose");

function connecttoDB() {
  mongoose
    .connect(process.env.Mongo_uri)
    .then(() => {
      console.log("server connect to the database");
    });
}

module.exports = connecttoDB