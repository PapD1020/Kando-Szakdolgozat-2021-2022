-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 18. 17:22
-- Kiszolgáló verziója: 10.4.17-MariaDB
-- PHP verzió: 8.0.1

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
('-5Hn5DGodbzHWLBhLfX_T', 'PapDanielModositotta', 'kicsikicsi', 'nagynagy', 'http://localhost:3000/createArticle/PapDaniel', 'Other', 1, '2022-04-12 16:18:30', '2022-04-16 16:19:59'),
('03I8BYB8adF0U0fI1yS0y', ' Mixvill PLC SR-20ERD', 'PLC SR-20ERD 12-24V DC bővítő 12 digitális bemenet, 8 relés kimenet', 'Teljesítményfeszültség-tartomány 12 ~ 24 VDC bemenetek:\r\n- 12. bemeneti pontok (X0 ~ X7, Y0 ~ Y3)\r\n- 12 digitális bemenet (X0 ~ X7, Y0 ~ Y3)\r\n- Bemeneti feszültségtartomány 0 ~ 24 VDC （Digitális bemenetek）\r\n- Bemeneti jel 0 0 ~ 5 VDC\r\n- Bemeneti jel 1 10 ~ 24 VDC\r\n- Késleltetési idő 1 és 0 50ms között\r\n- Késleltetési idő 0 és 1 50ms között\r\nRelé kimenetek:\r\n- 8. kimeneti pontok (~ QX0 QX7)\r\n- Kimeneti típus Relé kimenet 0 ~ 240 VAC\r\nKimeneti feszültség 0 ~ 240VAC, 0 ~ 24VDC\r\nKimeneti áramm', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 15:35:00', '2022-04-18 15:29:37'),
('09wAntDLIt5wTtH7E51wO', 'qweqwe', 'qweqwe', '', 'http://localhost:3000/qweqwe', 'Programming', 1, '2022-04-13 12:49:26', '2022-04-13 12:49:26'),
('0CaIwAncmpgZtxjBTM4pF', 'ModifiedTitle', 'ModifiedSmall', 'ModifiedMain', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-29 12:17:04', '2022-04-17 17:09:45'),
('0tjsTRI-lSO8zJmEMcNqu', 'test', 'testsmall', '<div>testmain</div>', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'test', 1, '2022-04-12 14:41:29', '2022-04-12 14:41:29'),
('9_CDk7C4wbS0peMT4DRKQ', 'Other', 'Faszauu', 'ModifiedMai', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 18:18:16', '2022-04-18 04:53:56'),
('ED7bZxrfRDkbvUDJR8C-N', 'Faszaasds', 'Faszauasdafsad', 'Fasza', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 15:37:40', '2022-04-08 09:02:50'),
('FZhOpGSDsehfR8LMZZxKn', 'A PLC olyan ipari számítógép', 'PLC program tervezés', 'A PLC-ket elsősorban gépek vezérlésére használják. A PLC-re írt program alapvetően utasításokat tartalmaz a bemeneti feltételek és a belső program alapján történő működéshez, amely a kimenetek vezérli.\n\nA PLC-program elindítása után az folyamatosan fut a következő külső beavatkozásig. A PLC-alapú rendszereket gyakran nemcsak az egyszerű eszközök vezérlése, hanem az összetett, bonyolult számítási és ellenőrzési algoritmussal ellátott ipari, termelő gépek vezérlésére használják.\n\nEgy ilyen egyedi gyártó munkaállomás képes előre programozott döntéseket hozni, mint például “a megfelelő termék lett-e behelyezve a gépbe”,  “jó helyen van-e egy furat az alkatrészen” vagy “nincs-e elváltozás a terméken”. A gépekkel gyártandó alkatrészeket akár jelölni is tudjuk egy mechanikus pontozással, amely a jó terméket jelöli, vagy ipari tintasugaras nyomtatóval esetleg lézeres jelöléssel – feltüntetve például a gyártás napját és további egyedi azonosítókat.', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-27 14:15:16', '2022-04-18 13:43:22'),
('iBrIYFY3ywXQZ3wow9qUb', 'tedt1', 'tedt1', 'tedt1', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'tedt1', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('OtHv280-rnN2FHRlyiqWa', '', '', 'bbbbb\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('uje8YStpMmBq2QQTEcQID', 'Title 0418', 'Small 0418', 'Main 0418', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('YcoiDCEdhU4Qat2aWX2X5', 'PapDanielModositotta', 'PapDanie', 'PapDanie', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Other', 0, '2022-03-30 15:27:42', '2022-04-17 09:20:30');

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
('W3Zk4vHXzBnAhv9BptcZI', 'OtHv280-rnN2FHRlyiqWa'),
('g8lgdpeaghN1r9vRmRqDh', '09wAntDLIt5wTtH7E51wO'),
('W3Zk4vHXzBnAhv9BptcZI', 'uje8YStpMmBq2QQTEcQID');

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
('0vgy7FPH_0PgghgU2_E8U', 'testas', '', '', '', '', '2022-04-13', 'Test@testa.hu', 0, '2022-04-12 17:05:12', '2022-04-13 11:11:39'),
('B31CB_jKyBsNWxs342Zcy', 'mark199850', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2b$10$M9hTH7r08WzeR7XdRXDiD.dWk37ZN.mwBjzX86A5CCh3gYBgO71l.', 'Pocs', 'Mark', '1998-02-28', 'mark299850@gmail.com', 1, '2022-04-11 17:21:57', '2022-04-11 17:21:57'),
('FFph-teKuHttdPKyW13yd', 'Admina', 'http://nyuszis.kepek1.hu/kep/nyuszis-kepek_20.jpg', '$2b$10$WQIJNEfufxe2iztNr0qlsueM.fhgnIB90yj8i66kb5iyEkDteZ/y2', 'admin', 'azadmin', '2022-03-31', 'admin@gmail.com', 9, '2022-04-01 10:19:39', '2022-04-01 10:20:13'),
('g8lgdpeaghN1r9vRmRqDh', 'PapDaniel', 'https://static.marquardmedia.hu/data/cikk/188/188001.775x400.jpg', '$2b$10$tr96AgDrnZ9WSEdIwpA7iucsEGPhktb4dZN0YkUKQgdd3yejCIp9e', 'Pap', 'Daniel', '2022-04-10', 'papdaniel9977@gmail.com', 1, '2022-04-04 16:25:04', '2022-04-06 08:01:10'),
('SLl-VHSUsskY3ddZgFjYb', '', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2b$10$QdpsHNoYTF91sJA9UPWdaebYdCcyull26f2xyZPTMPDVqxt4IO9xW', '', '', '0000-00-00', '', 1, '2022-04-18 04:31:14', '2022-04-18 04:31:14'),
('W3Zk4vHXzBnAhv9BptcZI', 'PocsMark', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2b$10$zg7ckXuuQadL0aR/eR96guT2Bf56D61CawUXl8.zOrvMlHTqIFWWS', 'Pocs', 'Mark', '2022-03-25', 'mark199850@gmail.com', 1, '2022-03-25 14:11:02', '2022-04-18 05:02:32');

--
-- Indexek a kiírt táblákhoz
--

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
-- Megkötések a táblához `articleuser`
--
ALTER TABLE `articleuser`
  ADD CONSTRAINT `ArticleUser_ibfk_1` FOREIGN KEY (`UId`) REFERENCES `users` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ArticleUser_ibfk_2` FOREIGN KEY (`AId`) REFERENCES `articles` (`ArticleId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
