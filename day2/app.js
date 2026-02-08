const express = require("express");

const server = express()

server.use(express.json())

const notes = [
    {
        title: "superman",
        decription:"kills lex luthor mf"
    }
]


server.post("/notes", (req, res) => {
    console.log(req.body);
    notes.push(req.body)
    res.send("notes created");
    
})

server.get('/notes', (req, res) => {
    res.send(notes)
})

server.listen(3000, function () {
    console.log("the server is running");
})