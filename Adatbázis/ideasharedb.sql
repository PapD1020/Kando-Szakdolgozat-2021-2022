-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Feb 25. 10:29
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ideasharedb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `AdminId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `AdminUn` varchar(30) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `AdminPw` varchar(32) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `AdminFN` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `AdminSN` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `AdminPermL` int(1) NOT NULL,
  `AdminEmail` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `AdminCreatedAt` date NOT NULL,
  `AdminUpdatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `deletedpost`
--

CREATE TABLE `deletedpost` (
  `DeletedPostId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `DeletedBy` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `DeletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `deletedusers`
--

CREATE TABLE `deletedusers` (
  `DeletedUserId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `DeletedBy` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `DeletedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `post`
--

CREATE TABLE `post` (
  `PostId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `PostName` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `PostSmDescr` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `PostMDescr` varchar(500) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `PostImg` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `PostStatus` int(1) NOT NULL,
  `PostCreatedAt` date NOT NULL,
  `PostUpdatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `postuser`
--

CREATE TABLE `postuser` (
  `UId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `PId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `UserId` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UserUn` varchar(30) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UserPw` varchar(32) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UserFN` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UserSN` varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UserDob` date NOT NULL,
  `UserEmail` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `UserCreatedAt` date NOT NULL,
  `UserUpdatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminId`),
  ADD UNIQUE KEY `AdminUn` (`AdminUn`),
  ADD UNIQUE KEY `AdminEmail` (`AdminEmail`);

--
-- A tábla indexei `deletedpost`
--
ALTER TABLE `deletedpost`
  ADD UNIQUE KEY `DeletedPostId` (`DeletedPostId`);

--
-- A tábla indexei `deletedusers`
--
ALTER TABLE `deletedusers`
  ADD UNIQUE KEY `DeletedUserId` (`DeletedUserId`);

--
-- A tábla indexei `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`PostId`),
  ADD UNIQUE KEY `PostMDescr` (`PostMDescr`),
  ADD UNIQUE KEY `PostSmDescr` (`PostSmDescr`);

--
-- A tábla indexei `postuser`
--
ALTER TABLE `postuser`
  ADD KEY `UId` (`UId`),
  ADD KEY `PId` (`PId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `UserUn` (`UserUn`),
  ADD UNIQUE KEY `UserEmail` (`UserEmail`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `postuser`
--
ALTER TABLE `postuser`
  ADD CONSTRAINT `postuser_ibfk_1` FOREIGN KEY (`UId`) REFERENCES `users` (`UserId`),
  ADD CONSTRAINT `postuser_ibfk_2` FOREIGN KEY (`PId`) REFERENCES `post` (`PostId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
