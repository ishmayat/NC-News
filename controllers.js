const {
  fetchAllTopics,
  fetchArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertCommentsByArticleId,
  updateArticleByArticleId,
  removeCommentByCommentId,
  fetchAllUsers,
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
  fetchAllArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentsByArticleId = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;

  const comments = {
    username,
    body,
    article_id,
  };

  fetchArticleById(article_id)
    .then(() => {
      return insertCommentsByArticleId(comments);
    })
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticleByArticleId = (req, res, next) => {
  const { inc_votes } = req.body;
  const article_id = req.params.article_id;

  fetchArticleById(article_id)
    .then(() => {
      return updateArticleByArticleId(article_id, inc_votes);
    })
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentByCommentId(comment_id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
};

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getAllTopics,
  getArticleById,
  getAllArticles,
  getCommentsByArticleId,
  postCommentsByArticleId,
  patchArticleByArticleId,
  deleteCommentByCommentId,
  getAllUsers,
};
