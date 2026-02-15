const mongoose = require("mongoose");

function connecttoDB() {
    mongoose.connect(process.env.MOMMY).then(() => {
        console.log("database is connected")
    })
}


module.exports = connecttoDB