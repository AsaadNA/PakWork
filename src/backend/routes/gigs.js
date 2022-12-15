const router = require("express").Router();
const auth = require("../middlewares/auth");
const randtoken = require("rand-token");
const async = require("async");

const db = require("../configs/database");
const multer = require("multer");
const { storageOptionsGigs, imageFilter } = require("../common/storageOptions");

/*
    2 types of endpoints

        1. With Auth (Used in profile dashboard with auth token)
            a. / -> GET POST
            b. /gigID -> GET PUT DELETE 
        2. Without Auth (Used for searches etc or 3rd person view)
            a. /:freelancerID/: Get all Gigs of that user
            b. /:gigID /: Get Specific Gig
*/

router.put("/:gigID/upload" , auth , (req,res) => {
    res.send("Update Gig Pics");
});

router.put("/:gigID" , auth , (req,res) => {
    
});

router.delete("/:gigID" , auth , (req,res) => {
    const {gigID} = req.params;
    db.query(`DELETE from gigs_images where gig_id="${gigID}";` , (e,r) => {
        if(e) {
            res.status(400).send({
                error: e.message
            })
        } else if(r) {
            db.query(`DELETE from gigs where gig_id="${gigID}";` , (e,r) => {
                if(e) {
                    res.status(400).send({
                        error: e.message
                    })
                } else if(r) {
                    res.status(200).send({
                        message: "Gig Deleted"
                    });
                } else {
                    res.status(400).send({
                        error: "Could not delete gig"
                    });
                }
            });
        } else {
            res.status(400).send({
                error: "Could not delete gig images"
            })
        }
    })
})

//Multi-Form Data so images and data on the same form/modal
router.post(
  "/",
  auth,
  multer({ storage: storageOptionsGigs, fileFilter: imageFilter }).array(
    "images",
    5
  ),
  (req, res) => {
    const {userID} = res.locals;
    const {title,details,category,starting_rate} = req.body;

    if(req.files === undefined) {
        res.status(400).send({
            error: "Kindly Upload Gig Images"
        });
    } else if(req.files) { //gig images have been uploaded
        let generated_gigID = randtoken.uid(12);
        db.query(`INSERT into gigs (gig_id,title,details,category,freelancer_id,starting_rate) VALUES ("${generated_gigID}","${title}" , "${details}" , "${category}" , "${userID}" , "${starting_rate}");` , (e,r) => {
            if(e) {
                res.status(400).send({error: "Gig title already exists"});
            } else if(r) {
                async.forEachOfSeries(req.files , (file,idx,cb) => {
                    let imageID = randtoken.uid(10);
                    db.query(`INSERT INTO gigs_images(image_id,gig_id,image) VALUES ("${imageID}" , "${generated_gigID}" , "/images/gigs/${file.filename}");` , (e,r) => {
                        cb();
                    });
                });
                res.status(200).send({message: "Gig Created"});
            } else {
                res.status(400).send({error: "Could not create gig"});
            }
        });
    } else {
        res.status(400).send({
            error: "Could not create gig"
        });
    }
  }
);

router.get("/" , auth , (req,res) => {
    const {userID} = res.locals;
    db.query(`select g.title,g.details, g.category, g.posting_date, g.gig_rating, g.gig_id, g.freelancer_id, g.starting_rate, group_concat(gi.image) as images from gigs_images gi inner join gigs g on g.gig_id = gi.gig_id where g.freelancer_id= "${userID}" group by gi.gig_id;` , (e,r) => {
        if(e) {
            res.status(400).send({error: e.message});
        } else if (r.length > 0)  {
            res.status(200).send(r);
        } else {
            res.status(400).send({error: "Could not find any gigs"});
        }
    })
})

module.exports = router;
