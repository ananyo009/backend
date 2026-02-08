// server create karna
// server ko config karna

const express = require("express");

const app = express();//creates the server

app.use(express.json());

const notes =[]

app.post("/notes", (req, res) => {
    // console.log(req.body)
    notes.push(req.body);
    res.send("notes created")
})

app.delete("/notes/:index", (req, res) => {
    
    delete notes[req.params.index]


    res.send("notes delted at index",req.params.index)

})

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description
    notes[req.params.index].title = req.body.title

    res.send("notes updated successfully")
})

app.get("/notes", (req, res) => {
    res.send(notes)
})


module.exports = app;