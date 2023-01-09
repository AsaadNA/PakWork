const router = require("express").Router();
const db = require("../configs/database");

//With Filters
router.get("/gigs/:searchText/filter" , (req,res) => {
    const {searchText} = req.params;
    const {GigCategory,SortByPrice,SortByRating} = req.query;

    let query = ``;
    if(GigCategory === "Show All") {
        query = `select g.title,g.starting_rate,g.details,g.category,g.posting_date,g.gig_rating,g.gig_id,g.freelancer_id, group_concat(gi.image) as gig_images , f.username , p.profile_picture from gigs_images gi inner join gigs g on g.gig_id=gi.gig_id inner join freelancer f on g.freelancer_id=f.freelancer_id inner join profile p on f.freelancer_id = p.profile_id  where g.title  LIKE '%${searchText}%' group by g.gig_id order by g.starting_rate ${SortByPrice} , g.gig_rating ${SortByRating};`
    } else {
        query = `select g.title,g.details,g.category,g.posting_date,g.gig_rating,g.gig_id,g.freelancer_id, g.starting_rate,group_concat(gi.image) as gig_images , f.username , p.profile_picture  , g.starting_rate from gigs_images gi inner join gigs g on g.gig_id=gi.gig_id inner join freelancer f on g.freelancer_id=f.freelancer_id inner join profile p on f.freelancer_id = p.profile_id where g.category="${GigCategory}" and g.title LIKE '%${searchText}%' group by g.gig_id order by g.starting_rate ${SortByPrice}, g.gig_rating ${SortByRating};`
    }

    db.query(query, (err,data) => {
        if(err) {
            res.status(400).send({error:err.message});
        } else if(data.length > 0) {
            res.status(200).send(data);
        } else {
            res.status(400).send({error: "Could not find related result :("});
        }
    })
});

//Without Filters
router.get("/gigs/:searchText" , (req,res) => {
    const {searchText} = req.params;
    db.query(`select g.title,g.starting_rate,g.details,g.category,g.posting_date,g.gig_rating,g.gig_id,g.freelancer_id, group_concat(gi.image) as gig_images , f.username, p.profile_picture from gigs_images gi inner join gigs g on g.gig_id=gi.gig_id inner join freelancer f on g.freelancer_id=f.freelancer_id inner join profile p on f.freelancer_id = p.profile_id  where g.title  LIKE '%${searchText}%' group by g.gig_id;` , (err,data) => {
        if(err) {
            res.status(400).send({error:err.message});
        } else if(data.length > 0) {
            res.status(200).send(data);
        } else {
            res.status(400).send({error: "Could not find related result :("});
        }
    })
});

module.exports = router;