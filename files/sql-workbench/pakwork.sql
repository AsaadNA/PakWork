SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

INSERT INTO `pakwork`.`freelancer`
(`freelancer_id`,
`first_name`,
`last_name`,
`username`,
`email`,
`password`,
`gender`,
`phone_number`,
`region`,
`country`,
`is_active`,
`is_verified`,
`registration_date`)
VALUES
("1",
"Asaad",
"Abbasi",
"AsaadNA",
"asaad.abbasi@gmail.com",
"1234",
"Male",
"03222666528",
"Asia",
"Pakistan",
0,
0,
NULL);

INSERT INTO `pakwork`.`verification_images`
(`image_id`,
`image`,
`freelancer_id`)
VALUES
("2",
NULL,
"1");

select * from freelancer;
select * from verification_images;
select * from verification_images where freelancer_id="1234";
delete from freelancer where freelancer_id=null;