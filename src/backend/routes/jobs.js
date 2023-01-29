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
    } = req.body;

    console.log(starting_date);

    if (req.files === undefined) {
      res.status(400).send({
        error: "Kindly Upload Some Attachments",
      });
    } else if (req.files) {
      console.log(req.files);
      let generated_jobID = randtoken.uid(12);
      let query = `INSERT into jobs (job_id,`;

      if (userType === "client") {
        query += `client_id,title,description,category,starting_date,ending_date,starting_amount) VALUES ("${generated_jobID}","${userID}","${title}","${description}","${category}","${starting_date}","${ending_date}","${starting_amount}");`;
      } else if (userType === "company_client") {
        query += `company_client_id,title,description,category,starting_date,ending_date,starting_amount) VALUES ("${generated_jobID}","${userID}","${title}","${description}","${category}","${starting_date}","${ending_date}","${starting_amount}");`;
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

router.get("/all", (req, res) => {
  db.query(
    `select j.job_id , j.description , j.title, j.category, j.starting_date , j.ending_date, j.starting_amount , p.profile_picture from jobs j inner join profile p on j.client_id = p.profile_id or j.company_client_id = p.profile_id`,
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
