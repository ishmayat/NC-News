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

module.exports = { fetchAllTopics };
