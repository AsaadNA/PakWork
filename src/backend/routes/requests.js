const router = require("express").Router();
const auth = require("../middlewares/auth");
const randtoken = require("rand-token");
const async = require("async");

const db = require("../configs/database");

//Delete a specific offer
router.delete("/offers/:requestOfferID", auth, (req, res) => {
  const { requestOfferID } = req.params;
  db.query(
    `DELETE from requests_offers where request_offer_id="${requestOfferID}";`,
    (e, r) => {
      if (e) {
        res.status(400).send({ error: e.message });
      } else if (r) {
        res.status(200).send({ message: "Deleted Offer" });
      } else {
        res.status(400).send({ error: e.message });
      }
    }
  );
});

//get offers for a specific request
router.get("/offers/:requestID", auth, (req, res) => {
  const { requestID } = req.params;
  db.query(
    `select ro.request_offer_id ,ro.title , ro.description, ro.amount, f.username , p.profile_picture from requests_offers ro inner join requests r on ro.request_id = r.request_id inner join freelancer f on f.freelancer_id=ro.freelancer_id inner join profile p on f.freelancer_id = p.profile_id where r.request_id="${requestID}";`,
    (e, r) => {
      if (e) {
        res.status(400).send({ error: e.message });
      } else if (r.length > 0) {
        res.status(200).send(r);
      } else {
        res.status(400).send({ error: "Could not find any offers" });
      }
    }
  );
});

router.get("/", auth, (req, res) => {
  const { userID } = res.locals;
  db.query(
    `SELECT * from requests where client_id="${userID}" or company_client_id="${userID}";`,
    (e, r) => {
      if (e) {
        res.status(400).send({ error: e.message });
      } else if (r.length > 0) {
        res.status(200).send(r);
      } else {
        res.status(400).send({ error: "Could not find any requests" });
      }
    }
  );
});

//This basically fetches all the requests from the database
//but it also fetches requests that the logged in freelancer
//made offers to.
router.get("/freelancer", auth, (req, res) => {
  const { userID } = res.locals;
  //Get all requests that have been sent by the freelancer
  db.query(
    `select request_id from requests_offers where freelancer_id="${userID}" and is_accepted=0;`,
    (e, r) => {
      if (e) {
        //
      } else if (r.length > 0 || r.length <= 0) {
        //This will also sent whether if the freelancer has already sent an offer
        //to the request or not
        db.query(
          `select r.duration,  r.request_id , r.title, r.description , r.posting_date , r.budget, p.profile_picture from requests r inner join profile p on r.client_id = p.profile_id or r.company_client_id = p.profile_id`,
          (e, rr) => {
            if (e) {
              res.status(400).send({ err: e.message });
            } else if (rr.length > 0) {
              let offersSentTo = JSON.parse(JSON.stringify(r)).map((result) => {
                return result.request_id;
              });
              let allOffers = JSON.parse(JSON.stringify(rr)).map((result) => {
                return {
                  budget: result.budget,
                  description: result.description,
                  posting_date: result.posting_date,
                  profile_picture: result.profile_picture,
                  request_id: result.request_id,
                  title: result.title,
                  duration: result.duration,
                  already_sent: Object.values(offersSentTo).includes(
                    result.request_id
                  ),
                };
              });
              res.status(200).send(allOffers);
            } else {
              res.status(400).send({ error: "Could not find any requests" });
            }
          }
        );
      } else {
        //
      }
    }
  );
});

/*
    [FRONTND] 1. Check if freelancer already has sent an offer to the certain requestID
    [BACKEND] 2. Check if offers by freelancer does not exceed by 5

*/

router.post("/offer/", auth, (req, res) => {
  const { requestID, title, description, amount } = req.body;
  const { userID } = res.locals;

  db.query(
    `select COUNT(freelancer_id) as offer_count from requests_offers WHERE is_accepted=0 and freelancer_id="${userID}";`,
    (e, r) => {
      if (e) {
        res.status(400).send({ error: e.message });
      } else if (r.length > 0) {
        //limit exceeded for offers
        if (r[0]["offer_count"] >= 3) {
          res
            .status(400)
            .send({ error: "Limit Has Been Exceeded For Sending Offers" });
        } else {
          const requestOfferID = randtoken.uid(12);
          db.query(
            `INSERT INTO requests_offers (request_offer_id,request_id,freelancer_id,title,description,amount) VALUES ("${requestOfferID}","${requestID}","${userID}","${title}","${description}","${amount}");`,
            (e, r) => {
              if (e) {
                res.status(400).send({ error: e.message });
              } else if (r) {
                res.status(200).send({ message: "Offer has been sent" });
              } else {
                res.status(400).send({ error: "Could not send offer" });
              }
            }
          );
        }
      } else {
        res.status(400).send({ error: "Offer limit exceeded" });
      }
    }
  );
});

router.delete("/:requestID", auth, (req, res) => {
  const { requestID } = req.params;

  db.query(
    `DELETE FROM requests_offers WHERE request_id="${requestID}"`,
    (e, r) => {
      if (e) {
        console.log(e.message);
      } else if (r) {
        db.query(
          `DELETE FROM requests WHERE request_id="${requestID}"`,
          (ee, rr) => {
            if (ee) {
              console.log(ee.message);
            } else if (rr) {
              res.sendStatus(200);
            } else {
              console.log("Could not delete request");
            }
          }
        );
      } else {
        console.log("Could not delete offers");
      }
    }
  );
});

router.post("/", auth, (req, res) => {
  const { title, description, budget, duration } = req.body;
  const { userID, userType } = res.locals;

  let requestID = randtoken.uid(12);
  let query = `INSERT INTO requests (request_id,title,description,budget,duration,`;

  if (userType === "client") {
    query += `client_id) VALUES ("${requestID}","${title}" , "${description}" , "${budget}" , ${duration} , "${userID}");`;
  } else {
    query += `company_client_id) VALUES ("${requestID}","${title}" , "${description}" , "${budget}" , ${duration} , "${userID}");`;
  }

  db.query(query, (e, r) => {
    if (e) {
      console.log(e.message);
      res.status(400).send({
        error: e.message,
      });
    } else if (r) {
      res.status(200).send({
        message: "Created Request",
      });
    } else {
      console.log("FUCJ");
      res.status(400).send({
        error: "Could not create Request",
      });
    }
  });
});

router.put("/", auth, (req, res) => {
  const { title, description, budget, request_id } = req.body;
  db.query(
    `UPDATE requests SET title="${title}" , description="${description}" , budget="${budget}" WHERE request_id="${request_id}"`,
    (e, r) => {
      if (e) {
        console.log(e.message);
      } else if (r) {
        res.status(200).send({ message: "Request Updated" });
      } else {
        console.log("Could not update request");
      }
    }
  );
});

/*

  1. When client accepts offer
    2. Insert offer into orders
    3. Delete all the other offers
    4. Delete Job Itself

*/

const moment = require("moment");

//For accepting a specific offer for a request
router.put("/offer/accept/", auth, (req, res) => {
  //This gets the offer data to the request
  const { amount, username } = req.body.offerData;
  const { requestID } = req.body; //request id for getting duration

  //Find the duration for the order
  //The info for order will be same as the request
  db.query(
    `SELECT title,description,duration from requests WHERE request_id="${requestID}"`,
    (er, ree) => {
      if (er) {
        console.log(er.message);
        res.sendStatus(400);
      } else if (ree.length > 0) {
        //Insert the data into orders
        let duration = ree[0].duration;
        let ending_date = moment(new Date(), "YYYY-MM-DD HH:mm:ss")
          .add(duration, "days")
          .format("YYYY-MM-DD HH:mm:ss");
        let orderID = randtoken.uid(10);

        //TODO: Differentiate CC & C here

        db.query(
          `INSERT INTO orders (order_id,client_id,description,ending_date,amount,title,freelancer_username) 
        VALUES ("${orderID}" , "${res.locals.userID}" , "${ree[0].description}" , "${ending_date}" , "${amount}" , "${ree[0].title}" , "${username}");`,
          (er, re) => {
            if (er) {
              console.log(er.message);
              res.sendStatus(400);
            } else if (re) {
              //Delete Other offers
              db.query(
                `DELETE from requests_offers WHERE request_id="${requestID}"`,
                (er, re) => {
                  if (er) {
                    console.log(er.message);
                    res.sendStatus(400);
                  } else if (re) {
                    //Delete Request itself
                    db.query(
                      `DELETE from requests WHERE request_id="${requestID}"`,
                      (er, re) => {
                        if (er) {
                          console.log(er.message);
                          res.sendStatus(400);
                        } else if (re) {
                          res.sendStatus(200);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
