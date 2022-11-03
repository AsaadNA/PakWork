const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const logger = require("./configs/logger"); //Different stuff logger
const morgan = require("morgan"); //HTTP Logger
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile");
const uploadRoutes = require("./routes/upload");
const adminRoutes = require("./routes/admin");

dotenv.config();

const app = express();

app.set("view engine", "vash");

const corsOptions = {
  exposedHeaders: "x-access-token",
};

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "pakwork91289128981",
  })
);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(__dirname + "/resources/"));

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/profile/", profileRoutes);
app.use("/api/v1/upload/", uploadRoutes);
app.use("/api/v1/admin/", adminRoutes);

app.get("*", (req, res) => {
  res.send("Wrong address buddy");
});

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
