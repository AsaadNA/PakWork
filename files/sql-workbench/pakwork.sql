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
