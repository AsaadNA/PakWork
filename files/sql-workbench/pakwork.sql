SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;


select f.username , v.image from freelancer f INNER JOIN verification_images v on f.freelancer_id = v.freelancer_id;

/* Get all the freelancer for verification with their userInfo & all the verification images */
select f.username , group_concat(v.image) as images from freelancer f inner join verification_images v on f.freelancer_id = v.freelancer_id where f.is_verified=1 and f.resubmit_verification=0 group by f.freelancer_id;

/* Get The Profile Info From Freelancer & Profile Table for a specific freelancer */
select p.profile_picture,p.level,f.first_name,f.last_name,f.username,f.country,p.year_experience,p.bio,p.linkedin_link,p.github_link,f.is_verified,f.is_active from profile p inner join freelancer f on f.freelancer_id = p.profile_id where p.profile_id="1amXm27IqY11rjGxuBcMpOs9gkPyojoPQMPQUgehMh4kR";
select p.profile_picture,p.level,f.first_name,f.last_name,f.username,f.country,p.year_experience,p.bio,p.linkedin_link,p.github_link,f.is_verified,f.is_active from profile p inner join freelancer f on f.freelancer_id = p.profile_id;

/* Get The Profile Info From Client & Profile Table for a specific client */
select c.first_name,c.last_name,c.username,c.country,p.profile_picture,p.industry_name,p.bio,p.linkedin_link from profile p inner join client c on c.client_id = p.profile_id where p.profile_id="";

/* Get The Profile Info From Company Client & Profile Table for a specific company client */
select c.company_name,c.country,p.industry_name,p.year_experience,p.bio,p.linkedin_link,p.company_website from profile p inner join company_client c on c.company_client_id = p.profile_id;

/* Get all the gigs for specific freelancer with gig images */
select g.title,g.details, g.category, g.posting_date, g.gig_rating, g.gig_id,g.freelancer_id, g.starting_rate, group_concat(gi.image) as images from gigs_images gi inner join gigs g on g.gig_id = gi.gig_id where g.freelancer_id= "eedIJfECuHmzbsT7DHAFCdJEZAMEoowtiFqqXRTJWnHz8" group by gi.gig_id;

/* Get All Orders For a Specific Client */
select o.title , o.freelancer_username , p.profile_picture , o.amount , o.order_status, o.ending_date , orf.file from orders o inner join freelancer f inner join profile p on f.username = o.freelancer_username inner join order_files orf WHERE (o.client_id="j9gh7GlB5d6BDxbHjbJD1T4jVstt6lxVnuWSxBVZnCfKk" and f.freelancer_id = p.profile_id) or orf.order_id = o.order_id;

/* Get All Order for Freelancer Client */
/* Maybe Run Another query for Company Client */
select o.title , c.username , p.profile_picture , o.amount , o.order_status, o.ending_date , ord.file from orders o inner join client c inner join order_files ord inner join profile p on c.client_id = o.client_id WHERE o.freelancer_username="AsaadNA" and c.client_id = p.profile_id;

/* Retrieving chat list for individaul user **/
select sender as users from messages union select reciever from messages where sender="AsaadNA" or reciever="AsaadNA";

/* Retrive latest message */
select * from messages where (sender="AliBut" or reciever="AliBut") and (sender="AsaadNA" or reciever="AsaadNA") ORDER BY timestamp desc limit 1;

/* Retrieve count of unread differentiating the send and reciver count*/
select count(*) as unread from messages where ((sender="AliBut" or reciever="AliBut") and (sender="AsaadNA" or reciever="AsaadNA")) and reciever != "AliBut" and read_status=0;

/* Retrieving messages for 2 people by chat time */
select * from messages where (sender="AsaadNA" or reciever="AsaadNA") and (sender="AliBut" or reciever="AliBut") ORDER BY timestamp asc;
UPDATE  messages set unread=1 where ((sender="AliBut" or reciever="AliBut") and (sender="AsaadNA" or reciever="AsaadNA")) and reciever != "AsaadNA" and read_status=0;

