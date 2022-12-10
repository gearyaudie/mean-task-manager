const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");
const { List, Task } = require("./db/models");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Route handlers

// List routes
// Get Lists: Get all list
app.get("/lists", (req, res) => {
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

// Post Lists: Create new list
app.post("/lists", (req, res) => {
  let title = req.body.title;
  let newList = new List({
    title,
  });

  newList.save().then((listDoc) => {
    res.send(listDoc);
  });
});

// Update List
app.patch("/lists/:id", (req, res) => {});

// Delete List
app.delete("/lists/:id", (req, res) => {});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => console.log("server is listening on port 3000"));
