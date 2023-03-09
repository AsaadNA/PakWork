const mysql = require("mysql");
const dotenv = require("dotenv");
const logger = require("./logger");

dotenv.config();

config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

let connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) {
    logger.error("Error connecting to database: " + err.message);
  } else {
    logger.info("MySQL Database connected successfully");
  }
});

module.exports = connection;
