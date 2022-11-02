SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

select f.username , v.image from freelancer f INNER JOIN verification_images v on f.freelancer_id = v.freelancer_id;

/* Get all the freelancer for verification with their userInfo & all the verification images */
select f.username , group_concat(v.image) as images from freelancer f inner join verification_images v on f.freelancer_id = v.freelancer_id where f.is_verified=1 and f.resubmit_verification=0 group by f.freelancer_id;

