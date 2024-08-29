const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
const pathToFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({ path: pathToFile });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const pgConfig = {};
if (ENV === "production") {
  pgConfig.connectionString = process.env.DATABASE_URL;
  pgConfig.max = 2;
}
module.exports = new Pool(pgConfig);
