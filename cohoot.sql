-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 27. 11:58
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cohoot`
--
CREATE DATABASE IF NOT EXISTS `cohoot` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `cohoot`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `Id` int(11) NOT NULL,
  `FelhasznaloNev` varchar(64) NOT NULL,
  `Email` varchar(64) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `HASH` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`Id`, `FelhasznaloNev`, `Email`, `SALT`, `HASH`) VALUES
(1, 'test', 'test', '7EfYgRx4cz1XwCwcn5igYHjkuMYj0ahM524KKjTIonwsGctDAPBMm4OOzxjWBGyR', 'bc5180573b600c714b010765f553b36d165c753a7cc5ada17ecb9cd0d40de546'),
(2, 'test2', 'test2', 'tiXA77PMNOq4BZU47VoJ6qMDdlNL0qOK9ENlcea49DZNIib7CAx65Q7xLCAhAUbY', '2236a970431c42b273a50371955466b1dcb5482591c57299bcfac567f1eb95c6'),
(3, 'test3', 'asd', 'T0E2ea1Frr3o681RKYehOLkmiKZaGjZx4o3ugkSHbfG9GmvVMH5aRB25jUY3Vnbh', 'bf13a2eebc4975a616f5020a01c38eaa70e02e62adbf065830647495e16c186a'),
(4, 'test5', 'alasok12@gmail.com', 'IlY1jsM3wJ7Vg8GT39GXCIrkmDGjFGpn6AWOcc9QYL2UqpHEWGNMdLmWo3o9oBwT', '365291f901de3e65863effddf5fa3e298241c201413152350e94c653279b6126');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pontok`
--

CREATE TABLE `pontok` (
  `Id` int(11) NOT NULL,
  `FelhasznaloId` int(11) NOT NULL,
  `FoldrajzPont` int(11) NOT NULL,
  `MatematikaPont` int(11) NOT NULL,
  `FilmPont` int(11) NOT NULL,
  `TortenelemPont` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `pontok`
--

INSERT INTO `pontok` (`Id`, `FelhasznaloId`, `FoldrajzPont`, `MatematikaPont`, `FilmPont`, `TortenelemPont`) VALUES
(1, 1, 10, 20, 30, 40),
(2, 2, 11, 22, 33, 44),
(3, 3, 9, 37, 2, 32);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `quiz`
--

CREATE TABLE `quiz` (
  `Id` int(11) NOT NULL,
  `Kategoria` varchar(64) NOT NULL,
  `Kerdes` varchar(128) NOT NULL,
  `Valasz1` varchar(64) NOT NULL,
  `Valasz2` varchar(64) NOT NULL,
  `Valasz3` varchar(64) NOT NULL,
  `Valasz4` varchar(64) NOT NULL,
  `Helyes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `quiz`
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
(10, 'Földrajz', 'Melyik a legkisseb ország?', 'Mikronézia', 'Monaco', 'Vatikán', 'Palau', 3),
(11, 'Matematika', 'Melyik a következő számok legnagyobb közös osztója: 36 és 48?', '6', '12', '18', '24', 2),
(12, 'Matematika', 'Ha egy háromszög két szöge 45° és 60°, mekkora a harmadik szög?', '65°', '75°', '85°', '90°', 1),
(13, 'Matematika', 'Mennyi a következő kifejezés eredménye:(5+3)⋅2(5+3)⋅2?', '10', '12', '16', '20', 3),
(14, 'Matematika', 'Egy téglalap területe 24 cm², egyik oldala 4 cm. Mekkora a másik oldal hossza?', '4 cm', '5 cm', '6 cm', '8 cm', 3),
(15, 'Matematika', 'Melyik szám prímszám az alábbiak közül?', '15', '21', '35', '29', 4),
(16, 'Matematika', 'Egy számtani sorozat első tagja 3, a differenciája 4. Mekkora a negyedik tagja?', '15', '12', '13', '11', 4),
(17, 'Matematika', 'Ha egy kör sugara 5 cm, mekkora a kerülete? (Használjunk π≈3.14-et)', '15.7 cm', '25.1 cm', '31.4 cm', '62.8 cm', 3),
(18, 'Matematika', 'Egy trapéz párhuzamos oldalai 10 cm és 6 cm, a magassága 4 cm. Mekkora a területe?', '16 cm²', '40 cm²', '32 cm²', '24 cm²', 4),
(19, 'Matematika', 'Egy háromszög oldalai: 3 cm, 4 cm és 5 cm. Milyen háromszög ez?', 'Egyenlő oldalú', 'Egyenlő szárú', 'Derékszögű', 'Tompaszögű', 3),
(20, 'Matematika', 'Melyik matematikai probléma megoldásához vezetett Euler híres, a következő összeghez kapcsolódó eredménye?', 'A Basel-probléma, mely a π²/6-os összeget eredményez', 'Az e- alapú logaritmus számítása', 'A szinusz és koszinusz függvények sorfejtése', 'A prímek eloszlásának vizsgálata', 1),
(21, 'Film', 'Mikor jelent meg az Avatár című film?', '2009', '2008', '2010', '2006', 1),
(22, 'Film', 'Melyik profi bokszoló életéről szól a Dühöngő bika című film?', 'Mike Tyson', 'Tyson Fury', 'Muhammad Ali', 'Jake LaMotta', 4),
(23, 'Film', 'Ki rendezte az Apokalipszis most című filmet?', 'Steven Spielberg', 'Francis Ford Coppola', 'Werner Herzog', 'Martin Scorsese', 2),
(24, 'Film', 'Ki játssza Tyler Durden szerepét a Harcosok klubja című filmben?', 'Edward Norton', 'Jared Leto', 'Brad Pitt', 'Johnny Depp', 3),
(25, 'Film', 'Hogy hívjak Jack Nicholson karakterét a Ragyogás című filmben?', 'Jack Torrance', 'Jack Grady', 'Jake Grady', 'Jack Hallorann', 1),
(26, 'Film', 'Melyik film jelent meg elsőként a Marvel-moziuniverzumban?', 'Thor', 'Bosszúállók', 'A Vasember', 'Amerika Kapitány: Az első bosszúálló', 3),
(27, 'Film', 'Melyik filmben nem szerepel Robert De Niro?', 'Taxisofőr', 'Feláldozhatók', 'A komédia királya', 'Dühöngő bika', 2),
(28, 'Film', 'Melyik évben jelent meg a Titanic című film?', '1987', '1996', '1999', '1997', 4),
(29, 'Film', 'Ki rendezte a Django elszabadul című filmet?', 'Michael Bay', 'George Lucas', 'Quentin Tarantino', 'Mel Gibson', 3),
(30, 'Film', 'Melyik film nyerte 2009-ben az Oscar díjat?', 'Gettómilliomos', 'Avatár', 'Becstelen brigantyk', 'A bombák földjén', 4);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- A tábla indexei `pontok`
--
ALTER TABLE `pontok`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `FelhasznaloId` (`FelhasznaloId`),
  ADD UNIQUE KEY `FelhasznaloId_2` (`FelhasznaloId`),
  ADD KEY `FelhasznaloId_3` (`FelhasznaloId`);

--
-- A tábla indexei `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `pontok`
--
ALTER TABLE `pontok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `quiz`
--
ALTER TABLE `quiz`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `pontok`
--
ALTER TABLE `pontok`
  ADD CONSTRAINT `pontok_ibfk_1` FOREIGN KEY (`FelhasznaloId`) REFERENCES `felhasznalok` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
