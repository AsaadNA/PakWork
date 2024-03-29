const router = require("express").Router();
const auth = require("../middlewares/auth");
const randtoken = require("rand-token");
const async = require("async");
const db = require("../configs/database");
const multer = require("multer");
const { storageOptionsPDFs, pdfFilter } = require("../common/storageOptions");

router.post(
  "/",
  auth,
  multer({ storage: storageOptionsPDFs, fileFilter: pdfFilter }).array(
    "files",
    5
  ),
  (req, res) => {
    const { userID, userType } = res.locals;
    const {
      title,
      description,
      category,
      starting_amount,
      starting_date,
      ending_date,
      duration,
    } = req.body;

    if (req.files === undefined) {
      res.status(400).send({
        error: "Kindly Upload Some Attachments",
      });
    } else if (req.files) {
      console.log(req.files);
      let generated_jobID = randtoken.uid(12);
      let query = `INSERT into jobs (job_id,`;

      if (userType === "client") {
        query += `client_id,title,description,category,starting_date,ending_date,starting_amount,duration) VALUES ("${generated_jobID}","${userID}","${title}","${description}","${category}","${starting_date}","${ending_date}","${starting_amount}",${duration});`;
      } else if (userType === "company_client") {
        query += `company_client_id,title,description,category,starting_date,ending_date,starting_amount,duration) VALUES ("${generated_jobID}","${userID}","${title}","${description}","${category}","${starting_date}","${ending_date}","${starting_amount},${duration}");`;
        console.log(query);
      }

      db.query(query, (e, r) => {
        if (e) {
          res.status(400).send({ error: e.message });
        } else if (r) {
          async.forEachOfSeries(req.files, (file, idx, cb) => {
            console.log(file.filename);
            let attached_files_id = randtoken.uid(10);
            db.query(
              `INSERT INTO jobs_attached_files(attached_files_id,job_id,file) VALUES ("${attached_files_id}" , "${generated_jobID}" , "/files/pdfs/${file.filename}");`,
              (e, r) => {
                cb();
              }
            );
          });
          res.status(200).send({ message: "Job Created" });
        } else {
          res.status(400).send({ error: "Could not create job" });
        }
      });
    } else {
      res.status(400).send({
        error: "Could not create job",
      });
    }
  }
);

//Update the JSON Data for the quiz
router.put("/:jobID/quiz", auth, (req, res) => {
  const { jobID } = req.params;
  const { quizData } = req.body;

  var responseJson = JSON.stringify(quizData);

  db.query(
    `UPDATE jobs SET quiz_data=? WHERE job_id="${jobID}"`,
    [responseJson],
    (e, r) => {
      if (e) {
        console.log(e.message);
        res.status(400).send({
          error: e.message,
        });
      } else if (r) {
        res.status(200).send("OK");
      }
    }
  );
});

//Delete the JSON Data for the quiz in the job
//also all the quiztaker for that specific JOB
router.delete("/:jobID/quiz", auth, (req, res) => {
  const { jobID } = req.params;
  db.query(
    `UPDATE jobs SET quiz_data=? WHERE job_id="${jobID}"`,
    [null],
    (e, r) => {
      if (e) {
        console.log(e.message);
        res.status(400).send({
          error: e.message,
        });
      } else if (r) {
        db.query(`DELETE from quiztakers WHERE job_id="${jobID}"`, (e, r) => {
          if (e) {
            console.log(e.message);
          } else if (r) {
            res.status(200).send("OK");
          }
        });
      }
    }
  );
});

router.put(
  "/:jobID",
  auth,
  multer({ storage: storageOptionsPDFs, fileFilter: pdfFilter }).array(
    "files",
    5
  ),
  (req, res) => {
    const { jobID } = req.params;
    const { title, description, category, starting_amount } = req.body;

    db.query(
      `UPDATE jobs SET title="${title}" , description="${description}" , category="${category}" , starting_amount="${starting_amount}" WHERE job_id="${jobID}";`,
      (err, data) => {
        if (err) {
          console.log(err.message);
          res.status(400).send({
            error: e.message,
          });
        } else if (data) {
          if (req.files === undefined || req.files.length === 0) {
            res.status(200).send({
              message: "Job Updated without updating files",
            });
          } else {
            db.query(
              `DELETE from jobs_attached_files where job_id="${jobID}";`,
              (err, r) => {
                if (err) {
                  res.status(400).send({ error: err.message });
                } else if (r) {
                  async.forEachOfSeries(req.files, (file, idx, cb) => {
                    let attached_files_id = randtoken.uid(10);
                    db.query(
                      `INSERT INTO jobs_attached_files(attached_files_id,job_id,file) VALUES ("${attached_files_id}" , "${jobID}" , "/files/pdfs/${file.filename}");`,
                      (e, r) => {
                        cb();
                      }
                    );
                  });
                  res.status(200).send({ message: "Job Updated with files" });
                }
              }
            );
          }
        } else {
          res.status(400).send({ error: "Could not update jobs with files" });
        }
      }
    );
  }
);

router.delete("/:jobID", auth, (req, res) => {
  const { jobID } = req.params;
  db.query(
    `DELETE from jobs_attached_files where job_id="${jobID}";`,
    (e, r) => {
      if (e) {
        res.status(400).send({
          error: e.message,
        });
      } else if (r) {
        db.query(`DELETE from jobs where job_id="${jobID}"`, (e, r) => {
          if (e) {
            res.status(400).send({
              error: e.message,
            });
          } else if (r) {
            res.status(200).send({
              message: "Job Deleted Successfully",
            });
          } else {
            res.status(400).send({
              error: "Could not delete job",
            });
          }
        });
      } else {
        res.status(400).send({
          error: "Could not delete job files",
        });
      }
    }
  );
});

/*
  When u click Post BID .. send a request to backend to check
  if quiz taken or not .. if not then ask to take a quiz
  redirect it if passed then u can bid otherwise the same error
*/

router.get("/:jobID/quiz", auth, (req, res) => {
  const { jobID } = req.params;
  db.query(`SELECT quiz_data from jobs WHERE job_id="${jobID}"`, (e, r) => {
    if (e) {
      console.log(e.message);
    } else if (r.length > 0) {
      res.status(200).send(r[0]["quiz_data"]);
    }
  });
});

//Checking if test needs to be taken or not
router.get("/:userID/:jobID/test-taken", auth, (req, res) => {
  const { userID, jobID } = req.params;
  db.query(`SELECT quiz_data from jobs where job_id="${jobID}"`, (e, r) => {
    if (e) {
      console.log(e.message);
      res.status(400).send({ error: e.message });
    } else if (r[0]["quiz_data"] === null) {
      res.status(200).send("NOT ASSIGNED");
    } else {
      db.query(
        `SELECT * from quiztakers WHERE job_id="${jobID}" and freelancer_id="${userID}"`,
        (e, r) => {
          if (e) {
            console.log(e.message);
            res.status(400).send({ error: e.message });
          } else if (r.length > 0) {
            res.status(200).send("TAKEN");
          } else {
            res.status(200).send("NOT TAKEN");
          }
        }
      );
    }
  });
});

//Change freelancer quiz taken status
router.put("/:jobID/quiz-passed", (req, res) => {
  const { jobID } = req.params;
  const { freelancerID } = req.body;

  let generatedID = randtoken.uid(12);
  db.query(
    `INSERT INTO quiztakers (quiztaker_id,job_id,freelancer_id) VALUES ("${generatedID}","${jobID}" , "${freelancerID}");`,
    (e, r) => {
      if (e) {
        console.log(e.message);
      } else if (r) {
        res.status(200).send("OK");
      }
    }
  );
});

//Get all jobs for the JobResult component
router.get("/all", (req, res) => {
  db.query(
    `select j.job_id , j.quiz_data , j.description , j.title, j.category,j.duration, j.starting_date , j.ending_date, j.starting_amount, j.current_highest_bidder , p.profile_picture from jobs j inner join profile p on j.client_id = p.profile_id or j.company_client_id = p.profile_id`,
    (e, r) => {
      if (e) {
        res.status(400).send({ error: e.message });
      } else if (r.length > 0) {
        res.status(200).send(r);
      } else {
        res.status(400).send({ error: "Could not find any jobs" });
      }
    }
  );
});

router.get("/", auth, (req, res) => {
  const { userID, userType } = res.locals;
  let query = ``;
  if (userType === "client") {
    query = `select * from jobs where client_id="${userID}";`;
  } else if (userType === "company_client") {
    query = `select * from jobs where company_client_id="${userID}";`;
  }

  db.query(query, (err, data) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else if (data.length > 0) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ error: "Could not find any jobs for client" });
    }
  });
});

module.exports = router;

/*


  1. Find all the jobs whose test are taken
  2. Find all the jobs whose test are not taken
  3. Update the all jobs according to the above two
  //Update stuff related to quiz
        let data = JSON.parse(JSON.stringify(r));
        let updatedData = data.map((d) => {
          if (d["quiz_data"] !== null) {
            d["quiz_assigned"] = true;
            d["quiz_taken"] = false;
            d["quiz_data"] = null;
          } else {
            d["quiz_assigned"] = false;
          }

          return d;
        });

        res.status(200).send(updatedData);
*/
