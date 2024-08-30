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

// const fetchAllArticles = (topic) => {
//   let query = `SELECT
//         author,
//         title,
//         article_id,
//         topic,
//         created_at,
//         votes,
//         article_img_url,
//         CAST(COUNT(*) AS INTEGER) AS comment_count
//         FROM articles
//         WHERE body IS NULL
//         ORDER BY created_at DESC`;

//   return db.query(query).then((result) => {
//     return result.rows;
//   });
// };

const fetchAllArticles = (topic, sort_by, order) => {
  let sortByWhitelist = [
    "article_id",
    "title",
    "author",
    "created_at",
    "article_img_url",
    "comment_count",
    "votes",
    undefined,
  ];
  let orderByWhitelist = ["ASC", "DESC", undefined];

  const queryValues = [];
  let queryStr = `
      SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at,
          articles.votes, articles.article_img_url,
          (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id)::INT
          AS comment_count
          FROM articles
          LEFT JOIN comments
          ON articles.article_id = comments.comment_id
      `;
  if (topic) {
    queryValues.push(topic);
    queryStr += "WHERE topic = $1";
  }
  if (!sort_by) {
    sort_by = "created_at";
  }
  if (!order) {
    order = "ASC";
  }
  if (!sortByWhitelist.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid Sort Term" });
  }
  if (!orderByWhitelist.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid Order Term" });
  }
  return db
    .query(
      `
          ${queryStr}
          GROUP BY articles.article_id
          ORDER BY ${sort_by} ${order}
          `,
      queryValues
    )
    .then((response) => {
      if (response.rows.body !== undefined) {
        return Promise.reject({
          status: 401,
          msg: "body should not be included",
        });
      } else {
        return response.rows;
      }
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

module.exports = {
  fetchAllTopics,
  fetchArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertCommentsByArticleId,
  updateArticleByArticleId,
};
