SET SQL_SAFE_UPDATES = 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

INSERT INTO `pakwork`.`company_client`
(`company_client_id`,
`email`,
`password`,
`company_name`,
`company_website`,
`industry_name`,
`employeed_range`,
`registration_date`,
`phone_number`)
VALUES
("821929819",
"funneltechie@gmail.com",
"123",
"Funnel Techi",
"wwww.funnel.com",
"IT",
"100-200",
null,
"03002119675");

select * from company_client;

select username,password from freelancer where email="funneltechie@gmail.com" UNION select email as email,company_name from company_client where email="funneltechie@gmail.com";

