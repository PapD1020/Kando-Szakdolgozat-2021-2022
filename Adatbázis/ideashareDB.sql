-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Gép: mysql.omega:3306
-- Létrehozás ideje: 2022. Ápr 26. 16:25
-- Kiszolgáló verziója: 5.7.37-log
-- PHP verzió: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ideashare`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ArticleComment`
--

CREATE TABLE `ArticleComment` (
  `AId` varchar(255) NOT NULL,
  `CId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `ArticleComment`
--

INSERT INTO `ArticleComment` (`AId`, `CId`) VALUES
('H6dHm4ny81wxyuUo8pPPz', 'CELzFJvA1pXcA505cZASb'),
('H6dHm4ny81wxyuUo8pPPz', 'f8Xv9ZMbr0PjUptJYfOkz'),
('x9I0n6GOhQK6Xnh49_48Q', 'IuwRTT766SrNMzl1h3QW1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `Articles`
--

CREATE TABLE `Articles` (
  `ArticleId` varchar(255) NOT NULL,
  `ArticleName` varchar(100) NOT NULL,
  `ArticleSmDescr` varchar(100) DEFAULT NULL,
  `ArticleMDescr` varchar(1024) NOT NULL,
  `ArticleImg` text NOT NULL,
  `ArticleType` varchar(100) NOT NULL,
  `ArticleStatus` int(1) NOT NULL,
  `ArticleCreatedAt` datetime NOT NULL,
  `ArticleUpdatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `Articles`
--

INSERT INTO `Articles` (`ArticleId`, `ArticleName`, `ArticleSmDescr`, `ArticleMDescr`, `ArticleImg`, `ArticleType`, `ArticleStatus`, `ArticleCreatedAt`, `ArticleUpdatedAt`) VALUES
('ApCU_qj2NMTjPelmg3D5i', 'Money project', 'I am writing a python project for money management', 'Hi! I would like to create a python application in which I can manage my money. I would like to monitor my spendings and eraning on a weekly basis.', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-23 19:39:12', '2022-04-23 19:39:12'),
('encFtAT234uZVH_WnR5wB', 'Help in React assigment', 'I\'m a student and I would like to study with other students', 'I need 2-3 studenst who will be willing to spend time with this project. This project\'s aim is to learn from each other and to prepare as to work in teams.', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-23 20:10:26', '2022-04-24 10:30:30'),
('H6dHm4ny81wxyuUo8pPPz', 'Help \r\nin uni assigment', 'I need experienced programmers', 'Hello! Its my first semester in uni and I am having trouble with programing assigments. I need help in C# and JavaScript.', 'https://assets.weforum.org/article/image/_sNw0oZO6IQV_vLpSbxFnx44SN_obtJrNdbSk0_yFFk.JPG', 'Programming', 1, '2022-04-23 19:22:47', '2022-04-24 12:55:29'),
('PuZR_NHhYP5iIiJ6tUbyq', 'Car  \r\nworkshop', 'Basic website needed for car workshop', 'Im in need of a website for my workshop. Customers should be able to view my contact info and the address of my workshop. I do not really know how all of this works, thats why I\'m here. A friend suggested this website to me. I really hope that someone will be able to help me. ', 'https://i.pinimg.com/originals/7e/84/ef/7e84efb67b7831d47a9432e8e4745810.jpg', 'Programming', 1, '2022-04-23 19:11:49', '2022-04-24 12:53:09'),
('uvsU5cUOyYXcuDO8O2mNt', 'Programming assigment', 'Need help in C# homework', 'I have until next week to create a basic CLI program in C#. Any help is very much appriciated.', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-23 20:30:28', '2022-04-23 20:30:28'),
('x9I0n6GOhQK6Xnh49_48Q', 'Webpage idea', 'I want to create a gambling website - Full stack developer required', 'I want to create a new, unique gambling webiste. The main idea is this: peaple can bid to specific things, like a sport\'s car or a holiday. But only the theme of the bid is specified, like the first on is a car the second one is a holiday. The price, the reward would increase as more and more people bid. If you are interested in this idea please feel free to contact me and we will discuss this in detail.', 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190626123927/untitlsssssed.png', 'Programming', 1, '2022-04-24 13:21:49', '2022-04-24 13:23:07');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ArticleUser`
--

CREATE TABLE `ArticleUser` (
  `UId` varchar(255) NOT NULL,
  `AId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `ArticleUser`
--

INSERT INTO `ArticleUser` (`UId`, `AId`) VALUES
('EZlXeMPzsa4Bz0pxekwVD', 'PuZR_NHhYP5iIiJ6tUbyq'),
('EZlXeMPzsa4Bz0pxekwVD', 'H6dHm4ny81wxyuUo8pPPz'),
('EZlXeMPzsa4Bz0pxekwVD', 'ApCU_qj2NMTjPelmg3D5i'),
('k-Zt_af8N2krKXbEDCH3L', 'encFtAT234uZVH_WnR5wB'),
('k-Zt_af8N2krKXbEDCH3L', 'uvsU5cUOyYXcuDO8O2mNt'),
('EZlXeMPzsa4Bz0pxekwVD', 'x9I0n6GOhQK6Xnh49_48Q');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `Comments`
--

CREATE TABLE `Comments` (
  `CommentId` varchar(255) NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `CommentCreatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `Comments`
--

INSERT INTO `Comments` (`CommentId`, `Comment`, `CommentCreatedAt`) VALUES
('CELzFJvA1pXcA505cZASb', 'Sounds good, thank you! I sent you an e-mail with the details.', '2022-04-26 16:17:28'),
('f8Xv9ZMbr0PjUptJYfOkz', 'Hi! I have some acquaintances who can help you.', '2022-04-26 16:12:44'),
('IuwRTT766SrNMzl1h3QW1', 'Hello! I have a very similar idea. I sent you an e-mail with the details.', '2022-04-26 15:34:41');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `UserComment`
--

CREATE TABLE `UserComment` (
  `UId` varchar(255) NOT NULL,
  `CId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `UserComment`
--

INSERT INTO `UserComment` (`UId`, `CId`) VALUES
('EZlXeMPzsa4Bz0pxekwVD', 'CELzFJvA1pXcA505cZASb'),
('iSxo6ceiigsuu3imsMYWM', 'f8Xv9ZMbr0PjUptJYfOkz'),
('FNNGszt8alMeB6uMtAaFO', 'IuwRTT766SrNMzl1h3QW1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `UserFavorite`
--

CREATE TABLE `UserFavorite` (
  `FavoriteId` varchar(255) NOT NULL,
  `ArticleId` varchar(255) NOT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `UserFavorite`
--

INSERT INTO `UserFavorite` (`FavoriteId`, `ArticleId`, `UserId`) VALUES
('FNNGszt8alMeB6uMtAaFOx9I0n6GOhQK6Xnh49_48Q', 'x9I0n6GOhQK6Xnh49_48Q', 'FNNGszt8alMeB6uMtAaFO'),
('k-Zt_af8N2krKXbEDCH3Lx9I0n6GOhQK6Xnh49_48Q', 'x9I0n6GOhQK6Xnh49_48Q', 'k-Zt_af8N2krKXbEDCH3L');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `Users`
--

CREATE TABLE `Users` (
  `UserId` varchar(255) NOT NULL,
  `UserUn` varchar(30) NOT NULL,
  `UserPP` text NOT NULL,
  `UserPw` varchar(150) NOT NULL,
  `UserFN` varchar(20) NOT NULL,
  `UserSN` varchar(20) NOT NULL,
  `UserDob` date NOT NULL,
  `UserEmail` varchar(40) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `UserPL` int(1) NOT NULL,
  `UserCreatedAt` datetime NOT NULL,
  `UserUpdatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `Users`
--

INSERT INTO `Users` (`UserId`, `UserUn`, `UserPP`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`, `UserPL`, `UserCreatedAt`, `UserUpdatedAt`) VALUES
('EZlXeMPzsa4Bz0pxekwVD', 'PapDaniel1997', 'https://scontent.fbud6-4.fna.fbcdn.net/v/t1.6435-9/115747863_3091156291001810_267922951576590158_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=40w3ffXS2XIAX-9JRxW&_nc_ht=scontent.fbud6-4.fna&oh=00_AT_jfbsNqeMkYBLxw85bhFnoy9bZpKL3fpWLXO5wSIELMg&oe=628A8777', '$2a$10$b2J8mK7afLfcOJ3ABIGzwuQCHED16AYeuHH0X6XqnhvDbCYR4PguC', 'Pap', 'Dániel', '1997-05-29', 'papszemet@gmail.com', 1, '2022-04-23 18:53:51', '2022-04-24 13:40:29'),
('FNNGszt8alMeB6uMtAaFO', 'John89', 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg', '$2a$10$CGtfSdJUDqUe6hgVNOSzrusD8NmiiEuroKZG5Hx24cv0Iz.oNOGdy', 'John', 'Doe', '1989-03-20', 'john89@gmail.com', 1, '2022-04-26 15:27:07', '2022-04-26 15:27:07'),
('iSxo6ceiigsuu3imsMYWM', 'KomolyTallér', 'https://scontent.fbud6-3.fna.fbcdn.net/v/t39.30808-6/272801429_5016389188421639_4474614560686645060_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=-eFfTius4MMAX8VGMoO&_nc_ht=scontent.fbud6-3.fna&oh=00_AT-YjFc38WbBMk3gtmE4ZHSS-YKMnnGQrkAlA2BIw7F7_g&oe=62698F11', '$2a$10$r1RotfW0MQuGgU1nYNcS/.ZB8KSUv6jzvHcRrEGYBb/nqi4CUI2JS', 'Komoly', 'Tallér', '2022-04-24', 'komoly@taller.hu', 1, '2022-04-24 16:21:10', '2022-04-24 17:00:43'),
('k-Zt_af8N2krKXbEDCH3L', 'PocsMark', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$XPbGoFMH7xRlSDtOJuf7Qu2Jl4nkc4otYpsbe7S2pVcjIhH8m2Z3a', 'Pócs', 'Márk', '1998-11-05', 'pocs@mark.com', 1, '2022-04-23 20:05:56', '2022-04-24 11:29:09'),
('YTMGR8EiXhviB2v4M9dX7', 'Admin', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$cThfdLEwS.tQBlnOuvFk1u00XAudVTAq.foSVZS02h80cFmTsVwwK', 'Admin', 'Admin', '1990-01-01', 'admin@admin.com', 9, '2022-04-26 16:05:13', '2022-04-26 16:05:13');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ArticleComment`
--
ALTER TABLE `ArticleComment`
  ADD KEY `AId` (`AId`,`CId`),
  ADD KEY `ArticleComment_ibfk_1` (`CId`);

--
-- A tábla indexei `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`ArticleId`),
  ADD UNIQUE KEY `ArticleMDescr` (`ArticleMDescr`),
  ADD UNIQUE KEY `ArticleSmDescr` (`ArticleSmDescr`);

--
-- A tábla indexei `ArticleUser`
--
ALTER TABLE `ArticleUser`
  ADD KEY `AId` (`AId`),
  ADD KEY `ArticleUser_ibfk_1` (`UId`);

--
-- A tábla indexei `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`CommentId`);

--
-- A tábla indexei `UserComment`
--
ALTER TABLE `UserComment`
  ADD KEY `CId` (`CId`,`UId`) USING BTREE,
  ADD KEY `UserComment_ibfk_2` (`UId`);

--
-- A tábla indexei `UserFavorite`
--
ALTER TABLE `UserFavorite`
  ADD UNIQUE KEY `FavoriteId` (`FavoriteId`),
  ADD KEY `ArticleId` (`ArticleId`,`UserId`),
  ADD KEY `UserFavorite_ibfk_2` (`UserId`);

--
-- A tábla indexei `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `UserUn` (`UserUn`),
  ADD UNIQUE KEY `UserEmail` (`UserEmail`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ArticleComment`
--
ALTER TABLE `ArticleComment`
  ADD CONSTRAINT `ArticleComment_ibfk_1` FOREIGN KEY (`CId`) REFERENCES `Comments` (`CommentId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `ArticleComment_ibfk_2` FOREIGN KEY (`AId`) REFERENCES `Articles` (`ArticleId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `ArticleUser`
--
ALTER TABLE `ArticleUser`
  ADD CONSTRAINT `ArticleUser_ibfk_1` FOREIGN KEY (`UId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ArticleUser_ibfk_2` FOREIGN KEY (`AId`) REFERENCES `Articles` (`ArticleId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `UserComment`
--
ALTER TABLE `UserComment`
  ADD CONSTRAINT `UserComment_ibfk_1` FOREIGN KEY (`CId`) REFERENCES `Comments` (`CommentId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `UserComment_ibfk_2` FOREIGN KEY (`UId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Megkötések a táblához `UserFavorite`
--
ALTER TABLE `UserFavorite`
  ADD CONSTRAINT `UserFavorite_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `Articles` (`ArticleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserFavorite_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
