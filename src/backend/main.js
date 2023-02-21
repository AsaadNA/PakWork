const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const logger = require("./configs/logger"); //Different stuff logger
const morgan = require("morgan"); //HTTP Logger
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./configs/database");
const socketio = require("socket.io");
const randtoken = require("rand-token");

const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile");
const uploadRoutes = require("./routes/upload");
const adminRoutes = require("./routes/admin");
const gigsRoutes = require("./routes/gigs");
const searchRoutes = require("./routes/search");
const jobsRoutes = require("./routes/jobs");
const requestRoutes = require("./routes/requests");

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
//app.use(morgan("dev"));

app.use(express.static(__dirname + "/resources/"));

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/profile/", profileRoutes);
app.use("/api/v1/upload/", uploadRoutes);
app.use("/api/v1/admin/", adminRoutes);
app.use("/api/v1/gigs/", gigsRoutes);
app.use("/api/v1/search/", searchRoutes);
app.use("/api/v1/jobs/", jobsRoutes);
app.use("/api/v1/requests/", requestRoutes);

app.get("*", (req, res) => {
  res.send("Wrong endpoint buddy");
});

const server = app.listen(process.env.MAIN_SERVER_PORT, (err) => {
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

const io = socketio(server);

io.on("connection", (socket) => {
  console.log(`Client Connected ${socket.id}`);

  //SINCE WE ARE ALSO KEEEPING TRACK OF THE STARTING_AMOUNT IN JOBS
  //WE NEED TO ALSO UPDATE IT.. IF A USER BASICALLY REFRESHES THE PAGE

  socket.on("bid", (data) => {
    db.query(`SELECT * from bids WHERE job_id="${data.jobID}"`, (e, r) => {
      if (e) {
        console.log(e.message);
      }

      //UPDATING BID AFTERWARDS
      else if (r.length > 0) {
        //Check if incoming bid is greater than stored bid
        db.query(
          `SELECT amount from bids WHERE job_id="${data.jobID}"`,
          (e, r) => {
            if (e) {
              console.log(e.message);
            } else if (r.length > 0) {
              if (data.amount > r[0]["amount"]) {
                db.query(
                  `UPDATE jobs SET current_highest_bidder="${data.username}" ,starting_amount=${data.amount} WHERE job_id="${data.jobID}";`,
                  (er, re) => {
                    if (er) {
                      console.log(er.message);
                    } else if (re) {
                      db.query(
                        `UPDATE bids SET username="${data.username}" , amount=${data.amount} WHERE job_id="${data.jobID}"`,
                        (err, ress) => {
                          if (err) {
                            console.log(err.message);
                          } else if (ress) {
                            socket.emit("bid", data);
                            socket.broadcast.emit("bid", data);
                          } else {
                            console.log("erroro cc");
                          }
                        }
                      );
                    } else {
                      console.log("error");
                    }
                  }
                );
              } else {
                socket.emit("invalid_bid", {
                  msg: "Amount should is < than Current Bid",
                });
              }
            } else {
              console.log("Some error occured");
            }
          }
        );
      }

      //FIRST BID
      else if (r.length <= 0) {
        let bidID = randtoken.uid(10);
        db.query(
          `SELECT starting_amount from jobs where job_id="${data.jobID}"`,
          (e, r) => {
            if (e) {
              console.log(e.message);
            } else if (r) {
              if (data.amount > r[0]["starting_amount"]) {
                db.query(
                  `INSERT INTO bids (bid_id,job_id,amount,username) VALUES ("${bidID}","${data.jobID}",${data.amount},"${data.username}");`,
                  (e, r) => {
                    if (e) {
                      console.log(e.message);
                    } else if (r) {
                      db.query(
                        `UPDATE jobs SET current_highest_bidder="${data.username}" ,starting_amount=${data.amount} WHERE job_id="${data.jobID}";`,
                        (er, re) => {
                          if (er) {
                            console.log(er.message);
                          } else if (re) {
                            socket.emit("bid", data);
                            socket.broadcast.emit("bid", data);
                          } else {
                            console.log("error");
                          }
                        }
                      );
                    } else {
                      console.log("Some other error occured");
                    }
                  }
                );
              } else {
                socket.emit("invalid_bid", {
                  msg: "Amount should be > Starting Amount",
                });
              }
            } else {
              console.log("error occured");
            }
          }
        );
      } else {
        console.log("Some other error occured");
      }
    });
  });
});
