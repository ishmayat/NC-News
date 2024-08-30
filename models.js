const db = require("./db/connection");

const fetchAllTopics = (sort_by = "slug") => {
  const validSortQueries = ["slug", "description"];

  if (!validSortQueries.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by query" });
  }

  return db.query(`SELECT * FROM topics`).then((result) => {
    return result.rows;
  });
};

const fetchArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Not Found" });
      }
      return rows[0];
    });
};

const fetchAllArticles = (topic, sort_by, order) => {
  const validSortBy = [
    "article_id",
    "title",
    "author",
    "created_at",
    "article_img_url",
    "comment_count",
    "votes",
  ];
  const validOrderBy = ["ASC", "DESC"];

  const queryValues = [];
  let queryStr = `
   SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at,
           articles.votes,
    articles.article_img_url,
           COUNT(*) AS comment_count FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`;

  if (topic) {
    queryValues.push(topic);
    queryStr += " WHERE topic = $1";
  }
  if (!sort_by || !validSortBy.includes(sort_by)) {
    sort_by = "created_at";
  }
  if (!order || !validOrderBy.includes(order)) {
    order = "ASC";
  }
  return db
    .query(
      `${queryStr}
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}
    `,
      queryValues
    )
    .then((response) => {
      return response.rows;
    });
};

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT 
        comment_id, 
        votes,
        created_at,
        author,
        body,
        article_id
        FROM comments WHERE article_id = $1
        ORDER BY created_at DESC`,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ msg: "Not Found" });
      }
      return result.rows;
    });
};

const insertCommentsByArticleId = (comments) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`,
      [comments.username, comments.body, comments.article_id]
    )
    .then((result) => {
      return result.rows[0].body;
    });
};

const updateArticleByArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id =$2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

const removeCommentByCommentId = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ msg: "Not Found" });
      }
      return result.rows[0];
    });
};

const fetchAllUsers = () => {
  return db
    .query(
      `SELECT 
        username, 
        name,
        avatar_url
        FROM users
        ORDER BY username DESC`
    )
    .then((result) => {
      return result.rows.map((users) => {
        return users;
      });
    });
};

module.exports = {
  fetchAllTopics,
  fetchArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertCommentsByArticleId,
  updateArticleByArticleId,
  removeCommentByCommentId,
  fetchAllUsers,
};
