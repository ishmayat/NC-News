const {
  fetchAllTopics,
  fetchArticleById,
  fetchAllArticles,
} = require("./models");

const getAllTopics = (req, res) => {
  fetchAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const getAllArticles = (req, res, next) => {
  const { topic } = req.query;
  //console.log("Topic:", topic);
  fetchAllArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllTopics, getArticleById, getAllArticles };
