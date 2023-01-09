SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

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

/* Get Specific Gig with freelancer and his profile details */
select g.title,g.details, g.category, g.posting_date, g.gig_rating, g.gig_id,g.freelancer_id, g.starting_rate, group_concat(gi.image) as gig_images , f.username , p.profile_picture , p.level, p.industry_name from gigs_images gi inner join gigs g on g.gig_id = gi.gig_id inner join freelancer f on g.freelancer_id= f.freelancer_id inner join profile p on f.freelancer_id = p.profile_id and g.gig_id= "uqR39roCWa7P";

/* 
	'%word' - return results that the value ends with the letters: "word".
	'word%' - return results that begin with the letters: "word".
	 %word% - return results that include the letters: "word" anywhere.
*/

select g.title,g.details,g.category,g.posting_date,g.gig_rating,g.gig_id,g.freelancer_id, g.starting_rate,group_concat(gi.image) as gig_images , g.starting_rate , f.username, p.profile_picture from gigs_images gi inner join gigs g on g.gig_id=gi.gig_id inner join freelancer f on g.freelancer_id = f.freelancer_id inner join profile p on f.freelancer_id = p.profile_id where g.category="Web Development" and g.title LIKE '%C+%' group by g.gig_id order by g.starting_rate ASC , g.gig_rating DESC;