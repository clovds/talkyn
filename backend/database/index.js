const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "wido",
  password: "asd123",
  database: "talkyn",
  port: 3306,
});

module.exports = db;
