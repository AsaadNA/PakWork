CREATE DATABASE  IF NOT EXISTS `pakwork` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pakwork`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: pakwork
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `admin_id` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT 'admin',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bids` (
  `bid_id` varchar(100) NOT NULL,
  `job_id` varchar(45) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bid_id`),
  UNIQUE KEY `bid_id_UNIQUE` (`bid_id`),
  KEY `job_id_idx` (`job_id`),
  CONSTRAINT `job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` varchar(45) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `phone_number` varchar(40) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_type` varchar(45) DEFAULT 'client',
  `is_active` tinyint(1) DEFAULT '0',
  `is_verified` tinyint(1) DEFAULT '0',
  `state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_client`
--

DROP TABLE IF EXISTS `company_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_client` (
  `company_client_id` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `phone_number` varchar(40) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT 'company_client',
  `is_active` tinyint(1) DEFAULT '0',
  `is_verified` tinyint(1) DEFAULT '0',
  `country` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`company_client_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  UNIQUE KEY `company_name_UNIQUE` (`company_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `custom_offers`
--

DROP TABLE IF EXISTS `custom_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_offers` (
  `custom_offer_id` varchar(45) NOT NULL,
  `message_id` varchar(45) DEFAULT NULL,
  `gig_id` varchar(45) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `is_accepted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`custom_offer_id`),
  KEY `message_id_idx` (`message_id`),
  KEY `gig_id_idx` (`gig_id`),
  CONSTRAINT `gig_id` FOREIGN KEY (`gig_id`) REFERENCES `gigs` (`gig_id`),
  CONSTRAINT `message_id` FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `freelancer`
--

DROP TABLE IF EXISTS `freelancer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freelancer` (
  `freelancer_id` varchar(45) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone_number` varchar(40) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_type` varchar(45) DEFAULT 'freelancer',
  `state` varchar(45) DEFAULT NULL,
  `resubmit_verification` tinyint(1) DEFAULT '0',
  `resubmit_feedback` varchar(500) DEFAULT ' ',
  `dob` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`freelancer_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gigs`
--

DROP TABLE IF EXISTS `gigs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gigs` (
  `gig_id` varchar(45) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `posting_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `gig_rating` double DEFAULT '0',
  `freelancer_id` varchar(45) DEFAULT NULL,
  `starting_rate` int DEFAULT NULL,
  PRIMARY KEY (`gig_id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `freelancer_id_idx` (`freelancer_id`),
  CONSTRAINT `gigs_freelancer_id` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`freelancer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gigs_images`
--

DROP TABLE IF EXISTS `gigs_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gigs_images` (
  `image_id` varchar(45) NOT NULL,
  `gig_id` varchar(45) DEFAULT NULL,
  `image` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `gigs_images_gig_id_idx` (`gig_id`),
  CONSTRAINT `gigs_images_gig_id` FOREIGN KEY (`gig_id`) REFERENCES `gigs` (`gig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `job_id` varchar(45) NOT NULL,
  `client_id` varchar(45) DEFAULT NULL,
  `company_client_id` varchar(45) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `starting_date` datetime DEFAULT NULL,
  `ending_date` datetime DEFAULT NULL,
  `starting_amount` int DEFAULT NULL,
  `current_highest_bidder` varchar(45) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `quiz_data` json DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `jobs_client_id_idx` (`client_id`),
  KEY `jobs_company_client_id_idx` (`company_client_id`),
  CONSTRAINT `jobs_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `jobs_company_client_id` FOREIGN KEY (`company_client_id`) REFERENCES `company_client` (`company_client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobs_attached_files`
--

DROP TABLE IF EXISTS `jobs_attached_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_attached_files` (
  `attached_files_id` varchar(45) NOT NULL,
  `job_id` varchar(45) DEFAULT NULL,
  `file` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`attached_files_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` varchar(40) NOT NULL,
  `sender` varchar(50) DEFAULT NULL,
  `reciever` varchar(50) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `message` varchar(500) DEFAULT NULL,
  `sender_status` tinyint(1) DEFAULT '1',
  `reciever_status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`message_id`),
  UNIQUE KEY `message_id_UNIQUE` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_files`
--

DROP TABLE IF EXISTS `order_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_files` (
  `file_id` varchar(45) NOT NULL,
  `order_id` varchar(45) DEFAULT NULL,
  `file` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`file_id`),
  KEY `order_files_order_id_idx` (`order_id`),
  CONSTRAINT `order_files_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` varchar(45) NOT NULL,
  `company_client_id` varchar(45) DEFAULT NULL,
  `client_id` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `ending_date` datetime DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `order_status` varchar(45) DEFAULT 'In Progress',
  `category` varchar(45) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `freelancer_username` varchar(45) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `orders_company_client_id_idx` (`company_client_id`),
  KEY `orders_client_id_idx` (`client_id`),
  KEY `orders_freelancer_username_idx` (`freelancer_username`),
  CONSTRAINT `orders_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `orders_company_client_id` FOREIGN KEY (`company_client_id`) REFERENCES `company_client` (`company_client_id`),
  CONSTRAINT `orders_freelancer_username` FOREIGN KEY (`freelancer_username`) REFERENCES `freelancer` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `profile_id` varchar(45) NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `level` varchar(45) DEFAULT 'Level 1',
  `degree` varchar(50) DEFAULT NULL,
  `degree_period` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `profile_picture` varchar(300) DEFAULT NULL,
  `secondary` varchar(45) DEFAULT NULL,
  `higher_secondary` varchar(45) DEFAULT NULL,
  `year_experience` int DEFAULT NULL,
  `cv` varchar(300) DEFAULT NULL,
  `company_website` varchar(45) DEFAULT NULL,
  `industry_name` varchar(45) DEFAULT NULL,
  `employeed_range` varchar(45) DEFAULT NULL,
  `github_link` varchar(45) DEFAULT NULL,
  `linkedin_link` varchar(45) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quiztakers`
--

DROP TABLE IF EXISTS `quiztakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiztakers` (
  `quiztaker_id` varchar(45) NOT NULL,
  `job_id` varchar(45) DEFAULT NULL,
  `freelancer_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`quiztaker_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `request_id` varchar(45) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `posting_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `client_id` varchar(45) DEFAULT NULL,
  `company_client_id` varchar(45) DEFAULT NULL,
  `budget` int DEFAULT NULL,
  `duration` int DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `request_id_UNIQUE` (`request_id`),
  KEY `client_id_idx` (`client_id`),
  KEY `company_client_id_idx` (`company_client_id`),
  CONSTRAINT `client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `company_client_id` FOREIGN KEY (`company_client_id`) REFERENCES `company_client` (`company_client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `requests_offers`
--

DROP TABLE IF EXISTS `requests_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests_offers` (
  `request_offer_id` varchar(45) NOT NULL,
  `request_id` varchar(45) DEFAULT NULL,
  `freelancer_id` varchar(45) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `is_accepted` int DEFAULT '0',
  PRIMARY KEY (`request_offer_id`),
  KEY `request_id_idx` (`request_id`),
  KEY `freelancer_id_idx` (`freelancer_id`),
  CONSTRAINT `freelancer_id` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`freelancer_id`),
  CONSTRAINT `request_id` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verification_images`
--

DROP TABLE IF EXISTS `verification_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_images` (
  `image_id` varchar(45) NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `freelancer_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `freelancer_id_idx` (`freelancer_id`),
  CONSTRAINT `verification_images_freelancer_id` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`freelancer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'pakwork'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 13:06:43
