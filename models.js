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

const fetchAllArticles = (data) => {
  let query = `SELECT 
        author, 
        title,
        article_id,
        topic,
        created_at,
        votes,
        article_img_url,
        (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count
        FROM articles`;

  if (data) {
    query += ` WHERE topic = $1 ORDER BY created_at DESC`;
    return db.query(query, [topic]).then((result) => {
      return result.rows.map((article) => {
        delete article.body;
        return article;
      });
    });
  } else {
    return db.query(query).then((result) => {
      return result.rows.map((article) => {
        delete article.body;
        return article;
      });
    });
  }
};

module.exports = { fetchAllTopics, fetchArticleById, fetchAllArticles };
