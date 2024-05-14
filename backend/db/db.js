const mysql = require("mysql2/promise");
require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(config);

pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to database as ID " + connection.threadId);
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed: " + err.stack);
  });

module.exports = pool;
