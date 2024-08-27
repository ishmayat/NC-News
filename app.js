const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers");
const allEndpoints = require("./endpoints.json");

app.use(express.json());

//Endpoints
app.get("/api", (req, res) => {
  res.status(200).send(allEndpoints);
});

app.get("/api/topics", getAllTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route/endpoint not found" });
});

// Error Handling
app.use((err, req, res, next) => {
  if (err.msg === "Not Found") {
    res.status(404).send({ msg: err.msg });
  } else {
    next(err);
  }
});

// Last resort error handling
app.use((err, req, res) => {
  res.status(500).send({
    msg: "Internal Server Error",
  });
});

module.exports = app;
