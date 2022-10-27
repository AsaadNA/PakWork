const express = require("express");
const dotenv = require("dotenv");
const logger = require("./configs/logger"); //Different stuff logger
const morgan = require("morgan"); //HTTP Logger
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.js");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth/", authRoutes);

const authMiddleware = require("./middlewares/auth");

/*
app.get("/secret", authMiddleware, (req, res) => {
  if (res.locals.payload.data.user_type === "freelancer") {
    res.send("freelancer shhee");
  } else {
    res.send("ohh the clients...");
  }
});
*/

app.listen(process.env.MAIN_SERVER_PORT, (err) => {
  if (err) {
    logger.error(err.message);
  } else {
    logger.info("Connected to the MAIN server");
    mongoose.connect(process.env.MONGO_DATABASE, (err) => {
      if (err) {
        logger.error(err.message);
      } else {
        logger.info("MongoDB Connected successfully");
      }
    });
  }
});
