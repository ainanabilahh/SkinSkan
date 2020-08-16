-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 16, 2020 at 02:11 AM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skinskandb`
--

-- --------------------------------------------------------

--
-- Table structure for table `ing_eff`
--

CREATE TABLE `ing_eff` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ing_eff`
--

INSERT INTO `ing_eff` (`id`, `description`) VALUES
(1, 'Anti-Aging'),
(2, 'Promotes Wound Healing'),
(3, 'Acne-Fighting'),
(4, 'Brightening'),
(5, 'UV Protection');

-- --------------------------------------------------------

--
-- Table structure for table `prod_pref`
--

CREATE TABLE `prod_pref` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prod_pref`
--

INSERT INTO `prod_pref` (`id`, `description`) VALUES
(1, 'Paraben'),
(2, 'Sulfate'),
(3, 'Alcohol'),
(4, 'Silicone'),
(5, 'Allergen'),
(6, 'Fungal Acne');

-- --------------------------------------------------------

--
-- Table structure for table `skin_input`
--

CREATE TABLE `skin_input` (
  `id` int(1) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skin_input`
--

INSERT INTO `skin_input` (`id`, `description`) VALUES
(0, 'No'),
(1, 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `skin_type`
--

CREATE TABLE `skin_type` (
  `id` int(1) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skin_type`
--

INSERT INTO `skin_type` (`id`, `description`) VALUES
(1, 'Normal'),
(2, 'Dry'),
(3, 'Sensitive'),
(4, 'Combination'),
(5, 'Oily'),
(6, 'Undefined'),
(7, 'erterter');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` char(255) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `verified` int(1) NOT NULL,
  `skin_input` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `salt`, `verification_code`, `verified`, `skin_input`) VALUES
(70, 'asrolarshad', 'asrol.arshad@gmail.com', '$2y$10$vnnutMLFZm.2pU.TUD4.9uOH5Tw7MlalE5Zo38Wnj1.OD7wF/CAWy', '72de15943a241b1e8c62a0079c97e8734093ce11e17221c2808f9fc372d45675', '5e0d4bb7b5b73', 0, 1),
(72, 'alya87', 'alya@gmail.com', '$2y$10$Vo.ANgpNAKlK8nDhyC9GA.N.YpTyRhqlLB3rBXCsNO7ge1eZGr9.W', 'd43c27991d9f63d31952545f6d1d9d924efc8665b4c7102c2448200cf898b163', '5e0d6976edfea', 0, 1),
(73, 'raihana', 'raihana@uitm.edu.my', '$2y$10$VENoSZ9d6PQgTGL297Yfs.uto42Z0DjEjUuCmDSTP.8GHbpEtkEOS', 'b8a55ec4f2533a0bef7b6c057d1b9a2e87611314230acb3e62ad8fc042403410', '5e0eee3518074', 0, 1),
(84, 'xtrasilent', 'alifruzycs@gmail.com', '$2y$10$ihWlufm..1IPyhc3YSz4vuzQZ6/1USqPHH9WxfczrFnL7N.Uqf32e', '5d2339361952016ecadc79d7e0e6a72310d159ee5b19366db460a44a6ec5c51d', '5e258461021ff', 1, 1),
(85, 'ainoarikaa', 'ainatama1@gmail.com', '$2y$10$cU4aJ8a2o6tFPc.ha5/DCOFsjt6MudX4PkMJJUT3XhalMnXCx3Xxu', 'd411404babe24988a6887affbd4f380cdb05991ba07ad626dde600907e0673db', '5e25ad189ca2c', 1, 1),
(87, 'sabrina', 'sabrinarozi97@gmail.com', '$2y$10$zbn2TxJCgemcy8no87Mis.1Z1gk4pm3rDXdtmCaaAPZsAhXq.AHJq', 'cb5eebfa2369391afb096c58960295d49e97adc0243bfdcc889cfbdf0ecd8594', '5e264eade64f2', 1, 1),
(88, 'umarun', 'ainatama@gmail.com', '$2y$10$NcrDzSeDt61wzURTwtZ7TeyUyLxopPLulctIoEcn7gWdnd4RB3.RC', '051b85912fd2fcfbf0de73ee5cbacaed458c79bb028b5cc276d51a11707d5c2e', '5e2656b417a24', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_ing_eff`
--

CREATE TABLE `user_ing_eff` (
  `user` int(10) NOT NULL,
  `ing_eff` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_ing_eff`
--

INSERT INTO `user_ing_eff` (`user`, `ing_eff`) VALUES
(70, 3),
(72, 1),
(72, 4),
(73, 1),
(73, 2),
(73, 3),
(73, 4),
(73, 5),
(84, 1),
(84, 2),
(84, 3),
(84, 4),
(84, 5),
(87, 3),
(88, 2),
(88, 4),
(88, 5),
(85, 1),
(85, 2),
(85, 3),
(85, 4),
(85, 5);

-- --------------------------------------------------------

--
-- Table structure for table `user_prod_pref`
--

CREATE TABLE `user_prod_pref` (
  `user` int(10) NOT NULL,
  `prod_pref` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_prod_pref`
--

INSERT INTO `user_prod_pref` (`user`, `prod_pref`) VALUES
(70, 3),
(72, 1),
(73, 1),
(73, 2),
(73, 3),
(73, 4),
(73, 5),
(73, 6),
(84, 1),
(84, 2),
(84, 3),
(84, 4),
(84, 5),
(84, 6),
(87, 1),
(87, 3),
(87, 6),
(88, 1),
(88, 6),
(85, 1),
(85, 2),
(85, 3),
(85, 4),
(85, 5),
(85, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user_skin_type`
--

CREATE TABLE `user_skin_type` (
  `user` int(11) NOT NULL,
  `skin_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_skin_type`
--

INSERT INTO `user_skin_type` (`user`, `skin_type`) VALUES
(70, 2),
(72, 1),
(73, 5),
(84, 3),
(87, 2),
(87, 5),
(88, 5),
(85, 2);

-- --------------------------------------------------------

--
-- Table structure for table `verified`
--

CREATE TABLE `verified` (
  `id` int(1) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `verified`
--

INSERT INTO `verified` (`id`, `description`) VALUES
(0, 'false'),
(1, 'true');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ing_eff`
--
ALTER TABLE `ing_eff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prod_pref`
--
ALTER TABLE `prod_pref`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skin_input`
--
ALTER TABLE `skin_input`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skin_type`
--
ALTER TABLE `skin_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `verified` (`verified`),
  ADD KEY `skin_input` (`skin_input`);

--
-- Indexes for table `user_ing_eff`
--
ALTER TABLE `user_ing_eff`
  ADD KEY `ing_eff` (`ing_eff`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `user_prod_pref`
--
ALTER TABLE `user_prod_pref`
  ADD KEY `prod_pref` (`prod_pref`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `user_skin_type`
--
ALTER TABLE `user_skin_type`
  ADD KEY `skin_type` (`skin_type`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `verified`
--
ALTER TABLE `verified`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`verified`) REFERENCES `verified` (`id`),
  ADD CONSTRAINT `user_ibfk_4` FOREIGN KEY (`skin_input`) REFERENCES `skin_input` (`id`);

--
-- Constraints for table `user_ing_eff`
--
ALTER TABLE `user_ing_eff`
  ADD CONSTRAINT `user_ing_eff_ibfk_1` FOREIGN KEY (`ing_eff`) REFERENCES `ing_eff` (`id`),
  ADD CONSTRAINT `user_ing_eff_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_prod_pref`
--
ALTER TABLE `user_prod_pref`
  ADD CONSTRAINT `user_prod_pref_ibfk_1` FOREIGN KEY (`prod_pref`) REFERENCES `prod_pref` (`id`),
  ADD CONSTRAINT `user_prod_pref_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_skin_type`
--
ALTER TABLE `user_skin_type`
  ADD CONSTRAINT `user_skin_type_ibfk_1` FOREIGN KEY (`skin_type`) REFERENCES `skin_type` (`id`),
  ADD CONSTRAINT `user_skin_type_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
