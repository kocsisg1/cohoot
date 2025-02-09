-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2025 at 03:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cohoot`
--
CREATE DATABASE IF NOT EXISTS `cohoot` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `cohoot`;

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `Id` int(11) NOT NULL,
  `FelhasznaloNev` varchar(64) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `Pont` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `felhasznalok`
--

INSERT INTO `felhasznalok` (`Id`, `FelhasznaloNev`, `Email`, `SALT`, `HASH`, `Pont`) VALUES
(1, 'test', 'test', '7EfYgRx4cz1XwCwcn5igYHjkuMYj0ahM524KKjTIonwsGctDAPBMm4OOzxjWBGyR', 'bc5180573b600c714b010765f553b36d165c753a7cc5ada17ecb9cd0d40de546', 10),
(2, 'test2', 'test2', 'tiXA77PMNOq4BZU47VoJ6qMDdlNL0qOK9ENlcea49DZNIib7CAx65Q7xLCAhAUbY', '2236a970431c42b273a50371955466b1dcb5482591c57299bcfac567f1eb95c6', 20),
(3, 'test3', 'asd', 'T0E2ea1Frr3o681RKYehOLkmiKZaGjZx4o3ugkSHbfG9GmvVMH5aRB25jUY3Vnbh', 'bf13a2eebc4975a616f5020a01c38eaa70e02e62adbf065830647495e16c186a', 30);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `Id` int(11) NOT NULL,
  `Kategoria` varchar(64) NOT NULL,
  `Kerdes` varchar(64) NOT NULL,
  `Valasz1` varchar(64) NOT NULL,
  `Valasz2` varchar(64) NOT NULL,
  `Valasz3` varchar(64) NOT NULL,
  `Valasz4` varchar(64) NOT NULL,
  `Helyes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`Id`, `Kategoria`, `Kerdes`, `Valasz1`, `Valasz2`, `Valasz3`, `Valasz4`, `Helyes`) VALUES
(1, 'Földrajz', 'Melyik ország fővárosa Bukarest?', 'Románia', 'Magyarország', 'Szerbia', 'Horvátország', 1),
(2, 'Földrajz', 'Melyik ország nem szomszédos Peruval?', 'Brazília', 'Paraguay', 'Kolumbia', 'Chile', 2),
(3, 'Földrajz', 'Melyik szigetország?', 'Burundi', 'Eritrea', 'Bhután', 'Mauritius', 4),
(4, 'Földrajz', 'Melyik a legmagasabb hegycsúcs?', 'Csomolungma', 'Annapurna', 'Kancsendzönga', 'K2', 1),
(5, 'Földrajz', 'Melyik kontinensen található Suriname?', 'Óceánia', 'Afrika', 'Dél-Amerika', 'Ázsia', 3),
(6, 'Földrajz', 'Melyik ország fővárosa Fokváros?', 'Dél-afrikai Köztársaság', 'Botswana', 'Zimbabwe', 'Namíbia', 1),
(7, 'Földrajz', 'Melyik nem igazi óceán?', 'Atlanti', 'Déli', 'Indiai', 'Északi', 4),
(8, 'Földrajz', 'Melyik országon nem fut át a Mekong folyó?', 'Kambodzsa', 'Vietnám', 'Laosz', 'Banglades', 4),
(9, 'Földrajz', 'Mi az Amerikai Egyesült Államok fővárosa?', 'New York', 'Washington D.C.', 'Columbus', 'Los Angeles', 2),
(10, 'Földrajz', 'Melyik a legkisseb ország?', 'Mikronézia', 'Monaco', 'Vatikán', 'Palau', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
