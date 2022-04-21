-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 21. 22:03
-- Kiszolgáló verziója: 10.4.13-MariaDB
-- PHP verzió: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Tábla szerkezet ehhez a táblához `articlecomment`
--

CREATE TABLE `articlecomment` (
  `AId` varchar(255) NOT NULL,
  `CId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `articlecomment`
--

INSERT INTO `articlecomment` (`AId`, `CId`) VALUES
('-5Hn5DGodbzHWLBhLfX_T', 'L8bDG4-A-XT3LehCUUtjX');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `articles`
--

CREATE TABLE `articles` (
  `ArticleId` varchar(255) NOT NULL,
  `ArticleName` varchar(100) NOT NULL,
  `ArticleSmDescr` varchar(100) DEFAULT NULL,
  `ArticleMDescr` varchar(1024) NOT NULL,
  `ArticleImg` varchar(254) NOT NULL,
  `ArticleType` varchar(100) NOT NULL,
  `ArticleStatus` int(1) NOT NULL,
  `ArticleCreatedAt` datetime NOT NULL,
  `ArticleUpdatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `articles`
--

INSERT INTO `articles` (`ArticleId`, `ArticleName`, `ArticleSmDescr`, `ArticleMDescr`, `ArticleImg`, `ArticleType`, `ArticleStatus`, `ArticleCreatedAt`, `ArticleUpdatedAt`) VALUES
('-5Hn5DGodbzHWLBhLfX_T', 'PapDanielModositotta', 'kicsikicsinagynagynagynagykicsikicsikicsi', 'nagynagy', 'http://localhost:3000/createArticle/PapDaniel', 'Other', 1, '2022-04-12 16:18:30', '2022-04-20 10:56:51'),
('03I8BYB8adF0U0fI1yS0y', ' Mixvill PLC SR-20ERD', 'PLC SR-20ERD 12-24V DC bővítő 12 digitális bemenet, 8 relés kimenet', 'Teljesítményfeszültség-tartomány 12 ~ 24 VDC bemenetek:\r\n- 12. bemeneti pontok (X0 ~ X7, Y0 ~ Y3)\r\n- 12 digitális bemenet (X0 ~ X7, Y0 ~ Y3)\r\n- Bemeneti feszültségtartomány 0 ~ 24 VDC （Digitális bemenetek）\r\n- Bemeneti jel 0 0 ~ 5 VDC\r\n- Bemeneti jel 1 10 ~ 24 VDC\r\n- Késleltetési idő 1 és 0 50ms között\r\n- Késleltetési idő 0 és 1 50ms között\r\nRelé kimenetek:\r\n- 8. kimeneti pontok (~ QX0 QX7)\r\n- Kimeneti típus Relé kimenet 0 ~ 240 VAC\r\nKimeneti feszültség 0 ~ 240VAC, 0 ~ 24VDC\r\nKimeneti áram', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 15:35:00', '2022-04-20 22:14:45'),
('09wAntDLIt5wTtH7E51wO', 'qweqwe', 'qweqwe', '', 'http://localhost:3000/qweqwe', 'Programming', 1, '2022-04-13 12:49:26', '2022-04-13 12:49:26'),
('0CaIwAncmpgZtxjBTM4pF', 'a', 'ModifiedSmall', 'ModifiedMain', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-29 12:17:04', '2022-04-21 10:52:19'),
('0tjsTRI-lSO8zJmEMcNqu', 'test', 'testsmall', '<div>testmain</div>', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'test', 1, '2022-04-12 14:41:29', '2022-04-12 14:41:29'),
('9_CDk7C4wbS0peMT4DRKQ', 'Other', 'Faszauu', 'ModifiedMai', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 18:18:16', '2022-04-20 17:49:14'),
('ED7bZxrfRDkbvUDJR8C-N', 'Faszaasds', 'Faszauasdafsad', 'Fasza', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 15:37:40', '2022-04-08 09:02:50'),
('FZhOpGSDsehfR8LMZZxKn', 'A PLC olyan ipari számítógép', 'PLC program tervezés', 'A PLC-ket elsősorban gépek vezérlésére használják. A PLC-re írt program alapvetően utasításokat tartalmaz a bemeneti feltételek és a belső program alapján történő működéshez, amely a kimenetek vezérli.\n\nA PLC-program elindítása után az folyamatosan fut a következő külső beavatkozásig. A PLC-alapú rendszereket gyakran nemcsak az egyszerű eszközök vezérlése, hanem az összetett, bonyolult számítási és ellenőrzési algoritmussal ellátott ipari, termelő gépek vezérlésére használják.\n\nEgy ilyen egyedi gyártó munkaállomás képes előre programozott döntéseket hozni, mint például “a megfelelő termék lett-e behelyezve a gépbe”,  “jó helyen van-e egy furat az alkatrészen” vagy “nincs-e elváltozás a terméken”. A gépekkel gyártandó alkatrészeket akár jelölni is tudjuk egy mechanikus pontozással, amely a jó terméket jelöli, vagy ipari tintasugaras nyomtatóval esetleg lézeres jelöléssel – feltüntetve például a gyártás napját és további egyedi azonosítókat.', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-27 14:15:16', '2022-04-21 13:29:04'),
('hBUg-gZVuWjsAO4zE0T8p', 'qweqweqwe', 'qweqweqweqwe', 'qweqweqweqwe', 'http://localhost:3000/createArticle4qweqwe', 'Programming', 1, '2022-04-20 12:13:03', '2022-04-20 12:13:03'),
('iBrIYFY3ywXQZ3wow9qUb', 'tedt1', 'tedt1', 'tedt1', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'tedt1', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('PC1t_IGtRX8D_PwxqucfQ', 'efaefafeafea', 'aeffaefaefeas', 'afefaefeafaesefaefasfea', 'http://localhost:3000/createArticle4aeffeaa', 'Programming', 1, '2022-04-20 11:51:53', '2022-04-20 11:51:53'),
('pRDYkJGHkPRuNDFgIFFav', 'Modalteszt2', 'Modalteszt2', 'Modalteszt2', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-20 17:03:38', '2022-04-20 17:03:38'),
('suEhXjYrMm2Qpv26dYSM4', 'Modalteszt10', 'Modalteszt', 'Modalteszt', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-20 16:53:52', '2022-04-20 17:15:25'),
('uje8YStpMmBq2QQTEcQID', 'Title 0418', 'Small 0418', 'Main 0418', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('YcoiDCEdhU4Qat2aWX2X5', 'PapDanielModositotta', 'PapDanie', 'PapDaniemODOSITOTTA', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Other', 0, '2022-03-30 15:27:42', '2022-04-20 11:54:23'),
('ZLy7uqdso3CNUbRQUjfBk', 'C# megoldás', 'Segítsetek C# ', 'Kérlek valaki segítsen', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png', 'Programming', 0, '2022-04-20 19:39:35', '2022-04-20 21:15:36');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `articleuser`
--

CREATE TABLE `articleuser` (
  `UId` varchar(255) NOT NULL,
  `AId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `articleuser`
--

INSERT INTO `articleuser` (`UId`, `AId`) VALUES
('W3Zk4vHXzBnAhv9BptcZI', '0CaIwAncmpgZtxjBTM4pF'),
('W3Zk4vHXzBnAhv9BptcZI', '03I8BYB8adF0U0fI1yS0y'),
('W3Zk4vHXzBnAhv9BptcZI', 'ED7bZxrfRDkbvUDJR8C-N'),
('W3Zk4vHXzBnAhv9BptcZI', 'FZhOpGSDsehfR8LMZZxKn'),
('g8lgdpeaghN1r9vRmRqDh', 'YcoiDCEdhU4Qat2aWX2X5'),
('W3Zk4vHXzBnAhv9BptcZI', '9_CDk7C4wbS0peMT4DRKQ'),
('g8lgdpeaghN1r9vRmRqDh', '-5Hn5DGodbzHWLBhLfX_T'),
('g8lgdpeaghN1r9vRmRqDh', '09wAntDLIt5wTtH7E51wO'),
('W3Zk4vHXzBnAhv9BptcZI', 'uje8YStpMmBq2QQTEcQID'),
('g8lgdpeaghN1r9vRmRqDh', 'PC1t_IGtRX8D_PwxqucfQ'),
('g8lgdpeaghN1r9vRmRqDh', 'hBUg-gZVuWjsAO4zE0T8p'),
('FrG0SvgLY7AEljbbKb-Qi', 'suEhXjYrMm2Qpv26dYSM4'),
('FrG0SvgLY7AEljbbKb-Qi', 'pRDYkJGHkPRuNDFgIFFav'),
('FFph-teKuHttdPKyW13yd', 'ZLy7uqdso3CNUbRQUjfBk');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `CommentId` varchar(255) NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `CommentCreatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`CommentId`, `Comment`, `CommentCreatedAt`) VALUES
('L8bDG4-A-XT3LehCUUtjX', 'Test', '2022-04-21 21:58:47');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `usercomment`
--

CREATE TABLE `usercomment` (
  `UId` varchar(255) NOT NULL,
  `CId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `usercomment`
--

INSERT INTO `usercomment` (`UId`, `CId`) VALUES
('W3Zk4vHXzBnAhv9BptcZI', 'L8bDG4-A-XT3LehCUUtjX');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userfavorite`
--

CREATE TABLE `userfavorite` (
  `FavoriteId` varchar(255) NOT NULL,
  `ArticleId` varchar(255) NOT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `UserId` varchar(255) NOT NULL,
  `UserUn` varchar(30) NOT NULL,
  `UserPP` varchar(100) NOT NULL,
  `UserPw` varchar(150) NOT NULL,
  `UserFN` varchar(20) NOT NULL,
  `UserSN` varchar(20) NOT NULL,
  `UserDob` date NOT NULL,
  `UserEmail` varchar(40) NOT NULL,
  `UserPL` int(1) NOT NULL,
  `UserCreatedAt` datetime NOT NULL,
  `UserUpdatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`UserId`, `UserUn`, `UserPP`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`, `UserPL`, `UserCreatedAt`, `UserUpdatedAt`) VALUES
('d27TguL6STu0eICkfUhEv', 'PapDaniel1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$GeSZYc.QTLPl2XQJWaVFfeuFYsWQf6WYUf.VH2zfjan31PsMD98Pm', 'Daniel', 'Pap', '2022-04-20', 'asd@asd.asd', 1, '2022-04-20 14:54:39', '2022-04-20 14:54:39'),
('FFph-teKuHttdPKyW13yd', 'Admina', 'http://nyuszis.kepek1.hu/kep/nyuszis-kepek_20.jpg', '$2b$10$WQIJNEfufxe2iztNr0qlsueM.fhgnIB90yj8i66kb5iyEkDteZ/y2', 'adg', 'azadmin', '2022-03-31', 'admin@gmail.com', 9, '2022-04-01 10:19:39', '2022-04-20 16:29:15'),
('FrG0SvgLY7AEljbbKb-Qi', 'Dani1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$oQPncc0zpII1QAjvGr2lj.9WBBkg.Dlwp5FhLD98yUHgHEGB2qJxu', 'Dani', 'Dani', '2022-04-20', 'dani@dani.com', 1, '2022-04-20 16:09:15', '2022-04-20 16:40:17'),
('g8lgdpeaghN1r9vRmRqDh', 'PapDaniel', 'https://static.marquardmedia.hu/data/cikk/188/188001.775x400.jpg', '$2a$10$oPxOlnjAUo/3U3ap5CZ1refBjxXrD/4VJOr0BzWpoAyX4xCyg4g2.', 'Pap', 'Danie', '2022-04-10', 'papdaniel9977@gmail.com', 1, '2022-04-04 16:25:04', '2022-04-20 14:36:28'),
('qGjqvlrHnhPkQuvSX5Qgl', 'PocsMarkk', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$51.7im/tJYazH0UI29naNu82hhKCSynnhdoM.1D9GTxEqUcp2i3La', 'Pocs', 'Mark', '1995-01-01', 'mark1998500@gmail.com', 1, '2022-04-20 18:53:00', '2022-04-20 18:53:00'),
('T5guwvbd3yNPGhxvc1dYD', 'Mark1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$l9WZuxTCwWUC3XFOwWG0xOsGAXhzifpC0C.VKo0pzJHLQUS6hE4nG', 'Pocs', 'Mark', '2022-04-20', 'mark@mark.com', 1, '2022-04-20 16:05:48', '2022-04-20 16:05:48'),
('W3Zk4vHXzBnAhv9BptcZI', 'PocsMark', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2b$10$zg7ckXuuQadL0aR/eR96guT2Bf56D61CawUXl8.zOrvMlHTqIFWWS', 'Pocs', 'Mark', '2022-03-25', 'mark199850@gmail.com', 1, '2022-03-25 14:11:02', '2022-04-21 13:29:42'),
('wEdCRVQ_sqMOg0y5IVb-S', 'Daniel1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$i4.wY0FxE434nPnTbee2wezf13qlKgE4qpaBygGlJi8T9mQOJMDs6', 'Daniel', 'Pap', '2022-04-20', 'asd@asd.com', 1, '2022-04-20 14:56:38', '2022-04-20 14:56:38');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `articlecomment`
--
ALTER TABLE `articlecomment`
  ADD KEY `AId` (`AId`,`CId`),
  ADD KEY `articlecomment_ibfk_1` (`CId`);

--
-- A tábla indexei `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`ArticleId`),
  ADD UNIQUE KEY `ArticleMDescr` (`ArticleMDescr`),
  ADD UNIQUE KEY `ArticleSmDescr` (`ArticleSmDescr`);

--
-- A tábla indexei `articleuser`
--
ALTER TABLE `articleuser`
  ADD KEY `AId` (`AId`),
  ADD KEY `ArticleUser_ibfk_1` (`UId`);

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`CommentId`);

--
-- A tábla indexei `usercomment`
--
ALTER TABLE `usercomment`
  ADD KEY `CId` (`CId`,`UId`) USING BTREE,
  ADD KEY `usercomment_ibfk_2` (`UId`);

--
-- A tábla indexei `userfavorite`
--
ALTER TABLE `userfavorite`
  ADD PRIMARY KEY (`FavoriteId`),
  ADD KEY `ArticleId` (`ArticleId`,`UserId`),
  ADD KEY `UserFavorite_ibfk_2` (`UserId`);

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
-- Megkötések a táblához `articlecomment`
--
ALTER TABLE `articlecomment`
  ADD CONSTRAINT `articlecomment_ibfk_1` FOREIGN KEY (`CId`) REFERENCES `comments` (`CommentId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `articlecomment_ibfk_2` FOREIGN KEY (`AId`) REFERENCES `articles` (`ArticleId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `articleuser`
--
ALTER TABLE `articleuser`
  ADD CONSTRAINT `ArticleUser_ibfk_1` FOREIGN KEY (`UId`) REFERENCES `users` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ArticleUser_ibfk_2` FOREIGN KEY (`AId`) REFERENCES `articles` (`ArticleId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `usercomment`
--
ALTER TABLE `usercomment`
  ADD CONSTRAINT `usercomment_ibfk_1` FOREIGN KEY (`CId`) REFERENCES `comments` (`CommentId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `usercomment_ibfk_2` FOREIGN KEY (`UId`) REFERENCES `users` (`UserId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Megkötések a táblához `userfavorite`
--
ALTER TABLE `userfavorite`
  ADD CONSTRAINT `UserFavorite_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `articles` (`ArticleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserFavorite_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
