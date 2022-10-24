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
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

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
  `password` varchar(45) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_client`
--

DROP TABLE IF EXISTS `company_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_client` (
  `company_client_id` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `company_website` varchar(45) DEFAULT NULL,
  `industry_name` varchar(45) DEFAULT NULL,
  `employeed_range` varchar(45) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`company_client_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  UNIQUE KEY `company_name_UNIQUE` (`company_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_client`
--

LOCK TABLES `company_client` WRITE;
/*!40000 ALTER TABLE `company_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_client` ENABLE KEYS */;
UNLOCK TABLES;

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
  `password` varchar(45) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  PRIMARY KEY (`freelancer_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freelancer`
--

LOCK TABLES `freelancer` WRITE;
/*!40000 ALTER TABLE `freelancer` DISABLE KEYS */;
INSERT INTO `freelancer` VALUES ('0','Ahsan','Tahseen','TnTBoy','tntboy69@@gmail.com','1234','Male','03223389933','Asia','Pakistan',0,0,NULL),('1','Asaad','Abbasi','AsaadNA','asaad.abbasi@gmail.com','1234','Male','03222666528','Asia','Pakistan',0,0,NULL);
/*!40000 ALTER TABLE `freelancer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gigs`
--

DROP TABLE IF EXISTS `gigs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gigs` (
  `gig_id` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `posting_date` date DEFAULT NULL,
  `gig_rating` double DEFAULT NULL,
  `freelancer_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`gig_id`),
  KEY `freelancer_id_idx` (`freelancer_id`),
  CONSTRAINT `gigs_freelancer_id` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`freelancer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gigs`
--

LOCK TABLES `gigs` WRITE;
/*!40000 ALTER TABLE `gigs` DISABLE KEYS */;
/*!40000 ALTER TABLE `gigs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gigs_images`
--

DROP TABLE IF EXISTS `gigs_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gigs_images` (
  `image_id` varchar(45) NOT NULL,
  `gig_id` varchar(45) DEFAULT NULL,
  `image` longblob,
  PRIMARY KEY (`image_id`),
  KEY `gigs_images_gig_id_idx` (`gig_id`),
  CONSTRAINT `gigs_images_gig_id` FOREIGN KEY (`gig_id`) REFERENCES `gigs` (`gig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gigs_images`
--

LOCK TABLES `gigs_images` WRITE;
/*!40000 ALTER TABLE `gigs_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `gigs_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gigs_packages`
--

DROP TABLE IF EXISTS `gigs_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gigs_packages` (
  `package_id` varchar(45) NOT NULL,
  `gig_id` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `details` varchar(150) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`package_id`),
  KEY `gigs_packages_gig_id_idx` (`gig_id`),
  CONSTRAINT `gigs_packages_gig_id` FOREIGN KEY (`gig_id`) REFERENCES `gigs` (`gig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gigs_packages`
--

LOCK TABLES `gigs_packages` WRITE;
/*!40000 ALTER TABLE `gigs_packages` DISABLE KEYS */;
/*!40000 ALTER TABLE `gigs_packages` ENABLE KEYS */;
UNLOCK TABLES;

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
  `title` varchar(45) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `posting_date` date DEFAULT NULL,
  `ending_date` date DEFAULT NULL,
  `first_bid` int DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `jobs_client_id_idx` (`client_id`),
  KEY `jobs_company_client_id_idx` (`company_client_id`),
  CONSTRAINT `jobs_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `jobs_company_client_id` FOREIGN KEY (`company_client_id`) REFERENCES `company_client` (`company_client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_attached_files`
--

DROP TABLE IF EXISTS `jobs_attached_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_attached_files` (
  `attached_files_id` varchar(45) NOT NULL,
  `job_id` varchar(45) DEFAULT NULL,
  `file` longblob,
  PRIMARY KEY (`attached_files_id`),
  KEY `jobs_attached_files_job_id_idx` (`job_id`),
  CONSTRAINT `jobs_attached_files_job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_attached_files`
--

LOCK TABLES `jobs_attached_files` WRITE;
/*!40000 ALTER TABLE `jobs_attached_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs_attached_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_files`
--

DROP TABLE IF EXISTS `order_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_files` (
  `file_id` varchar(45) NOT NULL,
  `order_id` varchar(45) DEFAULT NULL,
  `file` longblob,
  PRIMARY KEY (`file_id`),
  KEY `order_files_order_id_idx` (`order_id`),
  CONSTRAINT `order_files_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_files`
--

LOCK TABLES `order_files` WRITE;
/*!40000 ALTER TABLE `order_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_revisions`
--

DROP TABLE IF EXISTS `order_revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_revisions` (
  `revision_id` varchar(45) NOT NULL,
  `order_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`revision_id`),
  KEY `order_revisions_order_id_idx` (`order_id`),
  CONSTRAINT `order_revisions_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_revisions`
--

LOCK TABLES `order_revisions` WRITE;
/*!40000 ALTER TABLE `order_revisions` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_revisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` varchar(45) NOT NULL,
  `freelancer_id` varchar(45) DEFAULT NULL,
  `company_client_id` varchar(45) DEFAULT NULL,
  `client_id` varchar(45) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `duration` date DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `order_type` varchar(45) DEFAULT NULL,
  `order_status` varchar(45) DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `orders_freelancer_id_idx` (`freelancer_id`),
  KEY `orders_company_client_id_idx` (`company_client_id`),
  KEY `orders_client_id_idx` (`client_id`),
  CONSTRAINT `orders_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `orders_company_client_id` FOREIGN KEY (`company_client_id`) REFERENCES `company_client` (`company_client_id`),
  CONSTRAINT `orders_freelancer_id` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`freelancer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `profile_id` varchar(45) NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `level` varchar(45) DEFAULT NULL,
  `degree` varchar(50) DEFAULT NULL,
  `degree_period` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `profile_picture` longblob,
  `secondary` varchar(45) DEFAULT NULL,
  `higher_secondary` varchar(45) DEFAULT NULL,
  `year_experience` int DEFAULT NULL,
  `cv` longblob,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_images`
--

DROP TABLE IF EXISTS `verification_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_images` (
  `image_id` varchar(45) NOT NULL,
  `image` longblob,
  `freelancer_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `freelancer_id_idx` (`freelancer_id`),
  CONSTRAINT `verification_images_freelancer_id` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancer` (`freelancer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_images`
--

LOCK TABLES `verification_images` WRITE;
/*!40000 ALTER TABLE `verification_images` DISABLE KEYS */;
INSERT INTO `verification_images` VALUES ('0',NULL,'0'),('1',NULL,'0'),('2',NULL,'1');
/*!40000 ALTER TABLE `verification_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-23 23:38:43
