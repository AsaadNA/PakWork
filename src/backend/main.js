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
const moment = require("moment");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth");

const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile");
const uploadRoutes = require("./routes/upload");
const adminRoutes = require("./routes/admin");
const gigsRoutes = require("./routes/gigs");
const searchRoutes = require("./routes/search");
const jobsRoutes = require("./routes/jobs");
const requestRoutes = require("./routes/requests");
const orderRoutes = require("./routes/orders");
const chatRoutes = require("./routes/chat");

/*
  One thing to note is that u cannot have
  multiple instances of same user in different 
  browser since under on username one socket id is stored
*/

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
app.use("/api/v1/orders/", orderRoutes);
app.use("/api/v1/chat/", chatRoutes);

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

var people = {}; //list of all users connected

//This is implemented here because we need some
//stuff for socket etc
//When ever a message is posted it goes through the database
//When data is stored in the db then only the emits take place
app.post("/api/v1/chat/", auth, (req, res) => {
  const { message, to } = req.body;
  const { username } = res.locals;
  let message_id = randtoken.uid(10);
  let dateNow = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  db.query(
    `INSERT INTO messages (message_id,sender,reciever,timestamp,message) VALUES ("${message_id}" , "${username}" , "${to}" , "${dateNow}" , "${message}");`,
    (er, re) => {
      if (er) {
        console.log(er.message);
      } else if (re) {
        if (people[to] === undefined) {
          res.sendStatus(200); //if the user is not connected to the socket pool it will just sendback a 200
        } else {
          people[to].emit("private_message", {
            message_id: message_id,
            to,
            username,
            message,
          });

          res.sendStatus(200);
        }
      }
    }
  );
});

io.use((socket, next) => {
  let { token } = socket.handshake.query;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, d) => {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = d;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connect", (socket) => {
  //
  //TODO: IMPLEMENT CC HERE
  //

  const { username } = socket.decoded.data;

  //Logs Connect & Disconnect of the client
  console.log(`${username} : ${socket.id} Connected !`);
  socket.on("disconnect", function () {
    delete people[username];
    console.log(`${username} : ${socket.id} Disconnected !`);
  });

  //Add User to the list of connected people
  people[username] = socket;

  socket.on("window_open_change_reciever_status", (data) => {
    const { sender, reciever, message_id } = data;
    db.query(
      `UPDATE messages SET reciever_status=1 WHERE sender="${sender}" and reciever="${reciever}" and message_id="${message_id}"`,
      (e, r) => {
        if (e) {
          console.log(e.message);
        }
      }
    );
  });

  //Changing Order Status to Overdue
  socket.on("change_order_status_to_overdue", (data) => {
    const { orderID } = data;
    db.query(
      `UPDATE orders SET order_status="Overdue" WHERE order_id="${orderID}"`,
      (er, re) => {
        if (er) {
          console.log(er.message);
        }
      }
    );
  });

  //Move Job to Order Managment
  //We Are Not Deleting Job Attached Files because we will
  //use it for Order Details
  socket.on("move_job_to_order", (data) => {
    const { jobID } = data;
    db.query(`SELECT * FROM jobs WHERE job_id="${jobID}"`, (e, re) => {
      if (e) {
        console.log(e.message);
      } else if (re.length > 0) {
        db.query(`DELETE from bids where job_id="${jobID}"`, (e, r) => {
          if (e) {
            console.log(e.message);
          } else if (r) {
            db.query(`DELETE from jobs where job_id="${jobID}"`, (e, r) => {
              if (e) {
                console.log(e.message);
              } else if (r) {
                let final_ending_date = moment(
                  re[0].ending_date,
                  "YYYY-MM-DD HH:mm:ss"
                )
                  .add(re[0].duration, "days")
                  .format("YYYY-MM-DD HH:mm:ss");

                //TODO: Differentiate CC & C here

                db.query(
                  `INSERT INTO orders (order_id,client_id,description,ending_date,amount,category,title,freelancer_username) 
                  VALUES ("${re[0].job_id}" , "${re[0].client_id}" , "${re[0].description}" , "${final_ending_date}" , "${re[0].starting_amount}" , "${re[0].category}" , "${re[0].title}" , "${re[0].current_highest_bidder}");`,
                  (err, result) => {
                    if (err) {
                      console.log(err.message);
                    } else if (result) {
                      console.log("Inserted to orders " + re[0].job_id);
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  });

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
