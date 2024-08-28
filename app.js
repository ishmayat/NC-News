const express = require("express");
const app = express();
const {
  getAllTopics,
  getArticleById,
  getAllArticles,
  getCommentsByArticleId,
} = require("./controllers");
const allEndpoints = require("./endpoints.json");

app.use(express.json());

//Endpoints
app.get("/api", (req, res) => {
  res.status(200).send(allEndpoints);
});

app.get("/api/topics", getAllTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

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

app.use((err, req, res, next) => {
  // handle all psql errors here
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
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
