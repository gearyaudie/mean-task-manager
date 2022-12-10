const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/TaskManager", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Successfuly");
  })
  .catch((e) => {
    console.log("Error while attempting to connect to MongoDB", e);
  });

// To prevent warnings

// mongoose.set("useCreateIndex", true);
// mongoose.set("useFindAndModify", false);

module.exports = { mongoose };
