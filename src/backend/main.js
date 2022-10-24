const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./configs/logger");

const authRoutes = require("./routes/auth.js");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth/", authRoutes);

app.listen(process.env.MAIN_SERVER_PORT, (err) => {
  if (err) {
    logger.error(err.message);
  } else {
    logger.info("Connected to the MAIN server");
  }
});
