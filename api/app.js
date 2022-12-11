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
app.patch("/lists/:id", (req, res) => {
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

// Delete List
app.delete("/lists/:id", (req, res) => {
  List.findOneAndRemove({
    _id: req.params.id,
  }).then((removedList) => {
    res.send(removedList).sendStatus(200);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/lists/:listId/tasks", (req, res) => {
  // We want to return all tasks that belong to a specific list
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((task) => res.send(task));
});

// Patch task
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId, _listId: req.params.listId },
    { $set: req.body }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.post("/lists/:listId/tasks", (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });

  newTask.save().then((task) => {
    res.send(task);
  });
});

// Delete
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((task) => res.send(task));
});

app.listen(3000, () => console.log("server is listening on port 3000"));
