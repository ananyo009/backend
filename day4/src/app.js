const express = require("express");


const app = express()// server create karna

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);

  res.status(201).json({
    message: "note created successfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    note: notes,
  });
});

app.delete("/notes/:gg", (req, res) => {
    delete notes[req.params.gg]

    res.status(200).json({
        "message":"notes deleted successfully"
    })
})

app.patch('/notes/:id', (req, res) => {
    notes[req.params.id].title = req.body.title

    res.status(200).json({
        "message" : "notes updated successfully"
    })
})

app.put('/notes/:id', (req, res) => {
    notes[req.params.id] = req.body

    res.status(200).json({
        "message":"whole note update successfully"
    })
})

module.exports = app;
