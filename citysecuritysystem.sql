-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 10, 2019 at 05:01 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `citysecuritysystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `dangerlabel`
--

CREATE TABLE `dangerlabel` (
  `labelId` int(11) NOT NULL,
  `labelName` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dangerlabel`
--

INSERT INTO `dangerlabel` (`labelId`, `labelName`) VALUES
(1, 'crowd'),
(2, 'knife'),
(3, 'firearm'),
(4, 'weapon'),
(5, 'armored car'),
(6, 'combat vehicle'),
(7, 'war'),
(8, 'combat'),
(9, 'grappling'),
(10, ' shooting range'),
(11, ' trigger'),
(12, ' rifle '),
(13, ' revolver'),
(14, ' gun'),
(15, ' shooting'),
(16, ' protest'),
(17, ' boxing'),
(18, 'striking combat'),
(19, 'aggression');

-- --------------------------------------------------------

--
-- Table structure for table `returnlabel`
--

CREATE TABLE `returnlabel` (
  `labelID` int(11) NOT NULL,
  `label` varchar(45) DEFAULT NULL,
  `confidence` double DEFAULT NULL,
  `create_at` date DEFAULT NULL,
  `videoID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `returnlabel`
--

INSERT INTO `returnlabel` (`labelID`, `label`, `confidence`, `create_at`, `videoID`) VALUES
(2, 'cattal', 0.4526584, '0000-00-00', 1),
(3, 'cattal', 0.4526584, '2019-12-04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usertable`
--

CREATE TABLE `usertable` (
  `id` int(11) NOT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usertable`
--

INSERT INTO `usertable` (`id`, `userName`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `videoID` int(11) NOT NULL,
  `videoName` varchar(25) DEFAULT NULL,
  `videoURL` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`videoID`, `videoName`, `videoURL`) VALUES
(1, 'taksim', 'www.taksim.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dangerlabel`
--
ALTER TABLE `dangerlabel`
  ADD PRIMARY KEY (`labelId`);

--
-- Indexes for table `returnlabel`
--
ALTER TABLE `returnlabel`
  ADD PRIMARY KEY (`labelID`),
  ADD KEY `videoID` (`videoID`);

--
-- Indexes for table `usertable`
--
ALTER TABLE `usertable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`videoID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dangerlabel`
--
ALTER TABLE `dangerlabel`
  MODIFY `labelId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `returnlabel`
--
ALTER TABLE `returnlabel`
  MODIFY `labelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `usertable`
--
ALTER TABLE `usertable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `videoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `returnlabel`
--
ALTER TABLE `returnlabel`
  ADD CONSTRAINT `returnlabel_ibfk_1` FOREIGN KEY (`videoID`) REFERENCES `video` (`videoID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
