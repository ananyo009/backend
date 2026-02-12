const mongoose = require("mongoose")

//format specifier
const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    age:Number
})

//creating model
const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel