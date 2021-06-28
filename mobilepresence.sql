-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2021 at 02:22 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobilepresence`
--

-- --------------------------------------------------------

--
-- Table structure for table `place_location`
--

CREATE TABLE `place_location` (
  `id_location` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `place_location`
--

INSERT INTO `place_location` (`id_location`, `latitude`, `longitude`) VALUES
(1, -0.50637, 117.16053);

-- --------------------------------------------------------

--
-- Table structure for table `trackrec`
--

CREATE TABLE `trackrec` (
  `id_post` int(5) NOT NULL,
  `post` text NOT NULL,
  `date` date NOT NULL,
  `arrivetime` time NOT NULL,
  `leavingtime` time NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `location` char(20) NOT NULL,
  `id_user` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `id_user` int(12) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `imei` bigint(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `division` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `picture` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`id_user`, `username`, `email`, `imei`, `password`, `name`, `address`, `division`, `role`, `picture`) VALUES
(10161001, 'adha_s', 'adha@gmail.com', 862049033760350, '202cb962ac59075b964b07152d234b70', 'Adha', 'kakap', 'Product Dept', 'Staff', '1613050716245.jpg'),
(10161002, 'adha_setiawan', 'adhasetiawan@gmail.com', 358338085477596, '202cb962ac59075b964b07152d234b70', 'adha setiawan', 'kakap', 'HR', 'Staff', '1622873890309.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `place_location`
--
ALTER TABLE `place_location`
  ADD PRIMARY KEY (`id_location`);

--
-- Indexes for table `trackrec`
--
ALTER TABLE `trackrec`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `trackrec_ibfk_1` (`id_user`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `place_location`
--
ALTER TABLE `place_location`
  MODIFY `id_location` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trackrec`
--
ALTER TABLE `trackrec`
  MODIFY `id_post` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1122;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `trackrec`
--
ALTER TABLE `trackrec`
  ADD CONSTRAINT `trackrec_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user_tbl` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
