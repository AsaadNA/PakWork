const express = require("express");
const dotenv = require("dotenv");
const logger = require("./configs/logger"); //Different stuff logger
const morgan = require("morgan"); //HTTP Logger
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile");
const uploadRoutes = require("./routes/upload");
const verficationRoutes = require("./routes/verification");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(__dirname + "/resources/"));

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/profile/", profileRoutes);
app.use("/api/v1/upload/", uploadRoutes);
app.use("/api/v1/verification/", verficationRoutes);

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
