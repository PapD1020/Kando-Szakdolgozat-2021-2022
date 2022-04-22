-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Gép: mysql.omega:3306
-- Létrehozás ideje: 2022. Ápr 22. 19:36
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
('-5Hn5DGodbzHWLBhLfX_T', 'nxHevry9-y3hWqYTiRf_Y');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `Articles`
--

CREATE TABLE `Articles` (
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
-- A tábla adatainak kiíratása `Articles`
--

INSERT INTO `Articles` (`ArticleId`, `ArticleName`, `ArticleSmDescr`, `ArticleMDescr`, `ArticleImg`, `ArticleType`, `ArticleStatus`, `ArticleCreatedAt`, `ArticleUpdatedAt`) VALUES
('-5Hn5DGodbzHWLBhLfX_T', 'PapDanielModositotta', 'kicsikicsinagynagynagynagykicsikicsikicsi', 'nagynagy', 'http://localhost:3000/createArticle/PapDaniel', 'Other', 1, '2022-04-12 16:18:30', '2022-04-20 10:56:51'),
('-OGXkmqs-cIb-x8i-Rr-S', 'Android Frontend', 'Need Frontend Developer for Android App Project', 'Need Frontend Developer for Android App Project, Its an Ongoing Project so Candidate will have to work as per the existing code and development, Freelancer Must be Working Full Time to Achieve Completion Timeline\nSkills Needed :- JAVA, Kotlin, Retrofit\nMinimum Experience :- 5 Years', 'https://www.ais.com/wp-content/uploads/2013/11/android1.png', 'Programming', 1, '2022-04-22 16:15:48', '2022-04-22 16:15:48'),
('03I8BYB8adF0U0fI1yS0y', ' Mixvill PLC SR-20ERD', 'PLC SR-20ERD 12-24V DC bővítő 12 digitális bemenet, 8 relés kimenet', 'Teljesítményfeszültség-tartomány 12 ~ 24 VDC bemenetek:\r\n- 12. bemeneti pontok (X0 ~ X7, Y0 ~ Y3)\r\n- 12 digitális bemenet (X0 ~ X7, Y0 ~ Y3)\r\n- Bemeneti feszültségtartomány 0 ~ 24 VDC （Digitális bemenetek）\r\n- Bemeneti jel 0 0 ~ 5 VDC\r\n- Bemeneti jel 1 10 ~ 24 VDC\r\n- Késleltetési idő 1 és 0 50ms között\r\n- Késleltetési idő 0 és 1 50ms között\r\nRelé kimenetek:\r\n- 8. kimeneti pontok (~ QX0 QX7)\r\n- Kimeneti típus Relé kimenet 0 ~ 240 VAC\r\nKimeneti feszültség 0 ~ 240VAC, 0 ~ 24VDC\r\nKimeneti áram', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 15:35:00', '2022-04-21 22:56:04'),
('0tjsTRI-lSO8zJmEMcNqu', 'test', 'testsmall', '<div>testmain</div>', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'test', 1, '2022-04-12 14:41:29', '2022-04-12 14:41:29'),
('1ikkt1BH5nVdLVb0u6Jjy', 'MEDICINE APP', 'MEDEARN MEDICINE APP', 'This project is a project based on medicine selling app which has both backend and frontend completed just need to make some changes', 'https://www.gizbot.com/img/2020/01/5-apps-to-buy-medicines-right-from-your-smartphone-1579863873.jpg', 'Programming', 1, '2022-04-22 16:27:15', '2022-04-22 16:27:15'),
('7Ev2iYTL1gt5YP21Ea4ZX', 'VIETNAMESE CUSTOMER ', 'VIETNAMESE CUSTOMER SERVICER FOR INSURANCE AGENCY IN US', 'We are looking for Vietnamese virtual assistant who will answer phone calls from our Vietnamese clients in California. Work schedule will be 10amPST to 6pmPST. Salary will be $350 per month. Main task will take inbound calls from existing clients, and process payments.', 'https://support.cc/images/blog/importance-of-customer-service.png', 'Programming', 1, '2022-04-22 16:20:55', '2022-04-22 16:20:55'),
('A7vHfWw7i0DsGTvTdsake', 'Front-end Template ', 'Front-end Template change in vuejs. with Bug fixing', 'We need to change the template with the new one of an existing e-commerce application. We will provide html, css, js, etc. of the new design. Front-end design of the application is in vuejs. Also need to fix some bugs. The application is vuejs in front-end and laravel back-end', 'https://www.mastersoftwaresolutions.com/wp-content/uploads/2014/08/bnr-1.png', 'Programming', 1, '2022-04-22 16:13:37', '2022-04-22 16:13:37'),
('D8ZSTP2TrjyAL4dD_XMFt', 'Need a .net core', 'Need a .net core + Angular developer --2', 'Looking for a .net core developer + angular 8 expert who can available of 8 hours in a day with minimum experience of 4+ year. in the same domain.', 'https://www.avenga.com/wp-content/uploads/2020/11/C-Sharp.png', 'Programming', 1, '2022-04-22 16:17:23', '2022-04-22 16:17:23'),
('ED7bZxrfRDkbvUDJR8C-N', 'Faszaasds', 'Faszauasdafsad', 'Fasza', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-30 15:37:40', '2022-04-08 09:02:50'),
('Fv4_LcWcIQcMrdg_X2Ehs', 'Java-selenium', 'Java-selenium web automation', 'Hi all\n\nI am looking for java selenium, a web automation expert\nproject that is very short I have almost the concept ready with some source code also.\nI wanted to create a bot just like I macros functionality.', 'https://www.mailslurp.com/assets/brands/java-selenium.png', 'Programming', 1, '2022-04-22 16:23:48', '2022-04-22 16:23:48'),
('FZhOpGSDsehfR8LMZZxKn', 'A PLC olyan ipari számítógép', 'PLC program tervezés', 'A PLC-ket elsősorban gépek vezérlésére használják. A PLC-re írt program alapvetően utasításokat tartalmaz a bemeneti feltételek és a belső program alapján történő működéshez, amely a kimenetek vezérli.\n\nA PLC-program elindítása után az folyamatosan fut a következő külső beavatkozásig. A PLC-alapú rendszereket gyakran nemcsak az egyszerű eszközök vezérlése, hanem az összetett, bonyolult számítási és ellenőrzési algoritmussal ellátott ipari, termelő gépek vezérlésére használják.\n\nEgy ilyen egyedi gyártó munkaállomás képes előre programozott döntéseket hozni, mint például “a megfelelő termék lett-e behelyezve a gépbe”,  “jó helyen van-e egy furat az alkatrészen” vagy “nincs-e elváltozás a terméken”. A gépekkel gyártandó alkatrészeket akár jelölni is tudjuk egy mechanikus pontozással, amely a jó terméket jelöli, vagy ipari tintasugaras nyomtatóval esetleg lézeres jelöléssel – feltüntetve például a gyártás napját és további egyedi azonosítókat.', 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg', 'Programming', 1, '2022-03-27 14:15:16', '2022-04-21 13:29:04'),
('hs-15Ex3tZl6YeohzWL9t', 'PocsMark 0422', '0422', '0422', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Other', 1, '2022-04-22 15:38:03', '2022-04-22 15:38:03'),
('hwj3LI52j2S27Amt00ptS', '3D cad files', 'I need a python program to modify 3D cad files in a project.', 'you should creating a python program which can modify the 3D cad files of pump parts.\nThe python program should be able to modify all the parts with modify input to one part of the pump.\nI will share details on chatting', 'https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/127f4d988897322d77f88dc0d8027f3c/large.bmp', 'Programming', 1, '2022-04-22 16:19:25', '2022-04-22 16:19:25'),
('iBrIYFY3ywXQZ3wow9qUb', 'tedt1', 'tedt1', 'tedt1', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'tedt1', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('K-GctMr_VcEQ5QreXucHK', 'Modeling  Simulation', 'Modeling & Simulation of Electrical Vehicle DC Constant CC-CV Fast Charger', '• Need to have rectifier 3 phase Ac rectifier. • Rectified DC power need to supply to 320 V , 30.2 KWH battery Using any controller if you could avoid PID controller that would be good. Need to show Charging process by SOC , Current and Voltage.', 'https://img.alicdn.com/imgextra/i3/6000000003480/TB2hKrRi.OWBKNjSZKzXXXfWFXa_!!6000000003480-0-tbvideo.jpg', 'Programming', 1, '2022-04-22 16:22:28', '2022-04-22 16:22:28'),
('kx92P99NBpj9NiFXJD3PY', 'e', 'e', 'e', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'e', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('PC1t_IGtRX8D_PwxqucfQ', 'efaefafeafea', 'aeffaefaefeas', 'afefaefeafaesefaefasfea', 'http://localhost:3000/createArticle4aeffeaa', 'Programming', 1, '2022-04-20 11:51:53', '2022-04-20 11:51:53'),
('pRDYkJGHkPRuNDFgIFFav', 'Modalteszt2', 'Modalteszt2', 'Modalteszt2', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-20 17:03:38', '2022-04-20 17:03:38'),
('suEhXjYrMm2Qpv26dYSM4', 'Modalteszt10', 'Modalteszt', 'Modalteszt', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-20 16:53:52', '2022-04-20 17:15:25'),
('uje8YStpMmBq2QQTEcQID', 'Title 0418', 'Small 0418', 'Main 0418', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('XgmUR5TbY1PrEwclLMQnG', 'Node.js Developer', 'Node.js Developer', 'Hi, I am looking for a skilled developer who must have experience working with frameworks of Javascript (node.js, react etc). I will share more details through chat.', 'https://www.erasmuslifebudapest.com/wp-content/uploads/2018/11/node-js-main.jpg', 'Programming', 1, '2022-04-22 16:28:22', '2022-04-22 16:28:22'),
('YcoiDCEdhU4Qat2aWX2X5', 'PapDanielModositotta', 'PapDanie', 'PapDaniemODOSITOTTA', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Other', 0, '2022-03-30 15:27:42', '2022-04-20 11:54:23'),
('ZLy7uqdso3CNUbRQUjfBk', 'C# megoldás', 'Segítsetek C# ', 'Kérlek valaki segítsen', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png', 'Programming', 0, '2022-04-20 19:39:35', '2022-04-20 21:15:36');

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
('W3Zk4vHXzBnAhv9BptcZI', '03I8BYB8adF0U0fI1yS0y'),
('W3Zk4vHXzBnAhv9BptcZI', 'ED7bZxrfRDkbvUDJR8C-N'),
('W3Zk4vHXzBnAhv9BptcZI', 'FZhOpGSDsehfR8LMZZxKn'),
('g8lgdpeaghN1r9vRmRqDh', 'YcoiDCEdhU4Qat2aWX2X5'),
('g8lgdpeaghN1r9vRmRqDh', '-5Hn5DGodbzHWLBhLfX_T'),
('W3Zk4vHXzBnAhv9BptcZI', 'uje8YStpMmBq2QQTEcQID'),
('g8lgdpeaghN1r9vRmRqDh', 'PC1t_IGtRX8D_PwxqucfQ'),
('FrG0SvgLY7AEljbbKb-Qi', 'suEhXjYrMm2Qpv26dYSM4'),
('FrG0SvgLY7AEljbbKb-Qi', 'pRDYkJGHkPRuNDFgIFFav'),
('FFph-teKuHttdPKyW13yd', 'ZLy7uqdso3CNUbRQUjfBk'),
('W3Zk4vHXzBnAhv9BptcZI', 'hs-15Ex3tZl6YeohzWL9t'),
('FFph-teKuHttdPKyW13yd', 'A7vHfWw7i0DsGTvTdsake'),
('FFph-teKuHttdPKyW13yd', '-OGXkmqs-cIb-x8i-Rr-S'),
('FFph-teKuHttdPKyW13yd', 'D8ZSTP2TrjyAL4dD_XMFt'),
('FFph-teKuHttdPKyW13yd', 'hwj3LI52j2S27Amt00ptS'),
('FFph-teKuHttdPKyW13yd', '7Ev2iYTL1gt5YP21Ea4ZX'),
('FFph-teKuHttdPKyW13yd', 'K-GctMr_VcEQ5QreXucHK'),
('FFph-teKuHttdPKyW13yd', 'Fv4_LcWcIQcMrdg_X2Ehs'),
('FFph-teKuHttdPKyW13yd', '1ikkt1BH5nVdLVb0u6Jjy'),
('FFph-teKuHttdPKyW13yd', 'XgmUR5TbY1PrEwclLMQnG');

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
('nxHevry9-y3hWqYTiRf_Y', 'Jej', '2022-04-22 16:34:38');

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
('W3Zk4vHXzBnAhv9BptcZI', 'nxHevry9-y3hWqYTiRf_Y');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `UserFavorite`
--

CREATE TABLE `UserFavorite` (
  `FavoriteId` varchar(255) NOT NULL,
  `ArticleId` varchar(255) NOT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `Users`
--

CREATE TABLE `Users` (
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
-- A tábla adatainak kiíratása `Users`
--

INSERT INTO `Users` (`UserId`, `UserUn`, `UserPP`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`, `UserPL`, `UserCreatedAt`, `UserUpdatedAt`) VALUES
('d27TguL6STu0eICkfUhEv', 'PapDaniel1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$GeSZYc.QTLPl2XQJWaVFfeuFYsWQf6WYUf.VH2zfjan31PsMD98Pm', 'Daniel', 'Pap', '2022-04-20', 'asd@asd.asd', 1, '2022-04-20 14:54:39', '2022-04-20 14:54:39'),
('FFph-teKuHttdPKyW13yd', 'Admina', 'http://nyuszis.kepek1.hu/kep/nyuszis-kepek_20.jpg', '$2b$10$WQIJNEfufxe2iztNr0qlsueM.fhgnIB90yj8i66kb5iyEkDteZ/y2', 'aadmin', 'azadmin', '2022-03-31', 'admin@gmail.com', 9, '2022-04-01 10:19:39', '2022-04-22 11:52:06'),
('FrG0SvgLY7AEljbbKb-Qi', 'Dani1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$oQPncc0zpII1QAjvGr2lj.9WBBkg.Dlwp5FhLD98yUHgHEGB2qJxu', 'Dani', 'Dani', '2022-04-20', 'dani@dani.com', 1, '2022-04-20 16:09:15', '2022-04-20 16:40:17'),
('g8lgdpeaghN1r9vRmRqDh', 'PapDaniel', 'https://static.marquardmedia.hu/data/cikk/188/188001.775x400.jpg', '$2a$10$oPxOlnjAUo/3U3ap5CZ1refBjxXrD/4VJOr0BzWpoAyX4xCyg4g2.', 'Pap', 'Danie', '2022-04-10', 'papdaniel9977@gmail.com', 1, '2022-04-04 16:25:04', '2022-04-20 14:36:28'),
('K32m2bAGIehY78JDNoCE4', 'PocsMarkot', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$yGB2eQEhpqNjK7T1Ug7tBuXBOshmXUHw85BWEO0s6pCcqG93zoauW', 'Pocs', 'Markot', '2022-04-22', 'bigmack@kukac.ru', 1, '2022-04-22 11:53:22', '2022-04-22 11:53:22'),
('T5guwvbd3yNPGhxvc1dYD', 'Mark1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$l9WZuxTCwWUC3XFOwWG0xOsGAXhzifpC0C.VKo0pzJHLQUS6hE4nG', 'Pocs', 'Mark', '2022-04-20', 'mark@mark.com', 1, '2022-04-20 16:05:48', '2022-04-20 16:05:48'),
('W3Zk4vHXzBnAhv9BptcZI', 'PocsMark', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2b$10$zg7ckXuuQadL0aR/eR96guT2Bf56D61CawUXl8.zOrvMlHTqIFWWS', 'Pocs', 'Mark', '2022-03-25', 'mark199850@gmail.com', 1, '2022-03-25 14:11:02', '2022-04-22 15:42:45'),
('wEdCRVQ_sqMOg0y5IVb-S', 'Daniel1020', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$i4.wY0FxE434nPnTbee2wezf13qlKgE4qpaBygGlJi8T9mQOJMDs6', 'Daniel', 'Pap', '2022-04-20', 'asd@asd.com', 1, '2022-04-20 14:56:38', '2022-04-20 14:56:38');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ArticleComment`
--
ALTER TABLE `ArticleComment`
  ADD KEY `AId` (`AId`,`CId`),
  ADD KEY `articlecomment_ibfk_1` (`CId`);

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
  ADD KEY `usercomment_ibfk_2` (`UId`);

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
