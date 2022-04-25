-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Gép: mysql.omega:3306
-- Létrehozás ideje: 2022. Ápr 25. 06:08
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
('1ikkt1BH5nVdLVb0u6Jjy', 'ufMLWdp7vP-EzfsfG4uW5'),
('7Ev2iYTL1gt5YP21Ea4ZX', 'ALPu3KLfY7-pWSCQaQUGy'),
('XgmUR5TbY1PrEwclLMQnG', '8QGAqbO5IJ0zRpJDZgo4R');

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
('-OGXkmqs-cIb-x8i-Rr-S', 'Android Frontend', 'Need Frontend Developer for Android App Project', 'Need Frontend Developer for Android App Project, Its an Ongoing Project so Candidate will have to work as per the existing code and development, Freelancer Must be Working Full Time to Achieve Completion Timeline\nSkills Needed :- JAVA, Kotlin, Retrofit\nMinimum Experience :- 5 Years', 'https://www.ais.com/wp-content/uploads/2013/11/android1.png', 'Programming', 1, '2022-04-22 16:15:48', '2022-04-22 16:15:48'),
('1ikkt1BH5nVdLVb0u6Jjy', 'MEDICINE APP', '2MEDEARN MEDICINE A', 'This project is a project based on medicine selling app which has both backend and frontend completed just need to make some changes', 'https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/127f4d988897322d77f88dc0d8027f3c/large.bmp', 'Programming', 1, '2022-04-22 16:27:15', '2022-04-22 21:09:42'),
('7Ev2iYTL1gt5YP21Ea4ZX', 'VIETNAMESE CUSTOMER ', 'VIETNAMESE CUSTOMER SERVICER FOR INSURANCE AGENCY IN US', 'We are looking for Vietnamese virtual assistant who will answer phone calls from our Vietnamese clients in California. Work schedule will be 10amPST to 6pmPST. Salary will be $350 per month. Main task will take inbound calls from existing clients, and process payments.', 'https://support.cc/images/blog/importance-of-customer-service.png', 'Programming', 1, '2022-04-22 16:20:55', '2022-04-22 16:20:55'),
('A7vHfWw7i0DsGTvTdsake', 'Front-end Template ', 'Front-end Template change in vuejs. with Bug fixing', 'We need to change the template with the new one of an existing e-commerce application. We will provide html, css, js, etc. of the new design. Front-end design of the application is in vuejs. Also need to fix some bugs. The application is vuejs in front-end and laravel back-end', 'https://www.mastersoftwaresolutions.com/wp-content/uploads/2014/08/bnr-1.png', 'Programming', 1, '2022-04-22 16:13:37', '2022-04-22 16:13:37'),
('ApCU_qj2NMTjPelmg3D5i', 'Money project', 'I am writing a python project for money management', 'Hi! I would like to create a python application in which I can manage my money. I would like to monitor my spendings and eraning on a weekly basis.', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-23 19:39:12', '2022-04-23 19:39:12'),
('D8ZSTP2TrjyAL4dD_XMFt', 'Need a .net core', 'Need a .net core + Angular developer --2', 'Looking for a .net core developer + angular 8 expert who can available of 8 hours in a day with minimum experience of 4+ year. in the same domain.', 'https://www.avenga.com/wp-content/uploads/2020/11/C-Sharp.png', 'Programming', 1, '2022-04-22 16:17:23', '2022-04-22 16:17:23'),
('encFtAT234uZVH_WnR5wB', 'Help in React assigment', 'I\'m a student and I would like to study with other students', 'I need 2-3 studenst who will be willing to spend time with this project. This project\'s aim is to learn from each other and to prepare as to work in teams.', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-23 20:10:26', '2022-04-25 04:57:58'),
('Fv4_LcWcIQcMrdg_X2Ehs', 'Java-selenium', 'Java-selenium web automation', 'Hi all\n\nI am looking for java selenium, a web automation expert\nproject that is very short I have almost the concept ready with some source code also.\nI wanted to create a bot just like I macros functionality.', 'https://www.mailslurp.com/assets/brands/java-selenium.png', 'Programming', 1, '2022-04-22 16:23:48', '2022-04-22 16:23:48'),
('H6dHm4ny81wxyuUo8pPPz', 'Help \r\nin uni assigment', 'I need experienced programmers', 'Hello! Its my first semester in uni and I am having trouble with programing assigments. I need help in C# and JavaScript.', 'https://assets.weforum.org/article/image/_sNw0oZO6IQV_vLpSbxFnx44SN_obtJrNdbSk0_yFFk.JPG', 'Programming', 1, '2022-04-23 19:22:47', '2022-04-24 12:55:29'),
('hwj3LI52j2S27Amt00ptS', '3D cad files', 'I need a python program to modify 3D cad files in a project.', 'you should creating a python program which can modify the 3D cad files of pump parts.\nThe python program should be able to modify all the parts with modify input to one part of the pump.\nI will share details on chatting', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png', 'Programming', 1, '2022-04-22 16:19:25', '2022-04-22 21:09:58'),
('K-GctMr_VcEQ5QreXucHK', 'Modeling  Simulation', 'Modeling & Simulation of Electrical Vehicle DC Constant CC-CV Fast Charger', '• Need to have rectifier 3 phase Ac rectifier. • Rectified DC power need to supply to 320 V , 30.2 KWH battery Using any controller if you could avoid PID controller that would be good. Need to show Charging process by SOC , Current and Voltage.', 'https://www.mastersoftwaresolutions.com/wp-content/uploads/2014/08/bnr-1.png', 'Programming', 1, '2022-04-22 16:22:28', '2022-04-22 21:08:18'),
('PuZR_NHhYP5iIiJ6tUbyq', 'Car  \r\nworkshop', 'Basic website needed for car workshop', 'Im in need of a website for my workshop. Customers should be able to view my contact info and the address of my workshop. I do not really know how all of this works, thats why I\'m here. A friend suggested this website to me. I really hope that someone will be able to help me. ', 'https://i.pinimg.com/originals/7e/84/ef/7e84efb67b7831d47a9432e8e4745810.jpg', 'Programming', 1, '2022-04-23 19:11:49', '2022-04-24 12:53:09'),
('uvsU5cUOyYXcuDO8O2mNt', 'Programming assigment', 'Need help in C# homework', 'I have until next week to create a basic CLI program in C#. Any help is very much appriciated.', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_845301446_385027.jpg', 'Programming', 1, '2022-04-23 20:30:28', '2022-04-23 20:30:28'),
('x9I0n6GOhQK6Xnh49_48Q', 'Webpage idea', 'I want to create a gambling website - Full stack developer required', 'I want to create a new, unique gambling webiste. The main idea is this: peaple can bid to specific things, like a sport\'s car or a holiday. But only the theme of the bid is specified, like the first on is a car the second one is a holiday. The price, the reward would increase as more and more people bid. If you are interested in this idea please feel free to contact me and we will discuss this in detail.', 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190626123927/untitlsssssed.png', 'Programming', 1, '2022-04-24 13:21:49', '2022-04-24 13:23:07'),
('XgmUR5TbY1PrEwclLMQnG', 'Node.js Developer', 'Node.js Develop', 'Hi, I am looking for a skilled developer who must have experience working with frameworks of Javascript (node.js, react etc). I will share more details through chat.', 'https://support.cc/images/blog/importance-of-customer-service.png', 'Programming', 1, '2022-04-22 16:28:22', '2022-04-22 21:08:43'),
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
('FFph-teKuHttdPKyW13yd', 'ZLy7uqdso3CNUbRQUjfBk'),
('FFph-teKuHttdPKyW13yd', 'A7vHfWw7i0DsGTvTdsake'),
('FFph-teKuHttdPKyW13yd', '-OGXkmqs-cIb-x8i-Rr-S'),
('FFph-teKuHttdPKyW13yd', 'D8ZSTP2TrjyAL4dD_XMFt'),
('FFph-teKuHttdPKyW13yd', 'hwj3LI52j2S27Amt00ptS'),
('FFph-teKuHttdPKyW13yd', '7Ev2iYTL1gt5YP21Ea4ZX'),
('FFph-teKuHttdPKyW13yd', 'K-GctMr_VcEQ5QreXucHK'),
('FFph-teKuHttdPKyW13yd', 'Fv4_LcWcIQcMrdg_X2Ehs'),
('FFph-teKuHttdPKyW13yd', '1ikkt1BH5nVdLVb0u6Jjy'),
('FFph-teKuHttdPKyW13yd', 'XgmUR5TbY1PrEwclLMQnG'),
('g8lgdpeaghN1r9vRmRqDh', 'PuZR_NHhYP5iIiJ6tUbyq'),
('g8lgdpeaghN1r9vRmRqDh', 'H6dHm4ny81wxyuUo8pPPz'),
('g8lgdpeaghN1r9vRmRqDh', 'ApCU_qj2NMTjPelmg3D5i'),
('W3Zk4vHXzBnAhv9BptcZI', 'encFtAT234uZVH_WnR5wB'),
('W3Zk4vHXzBnAhv9BptcZI', 'uvsU5cUOyYXcuDO8O2mNt'),
('g8lgdpeaghN1r9vRmRqDh', 'x9I0n6GOhQK6Xnh49_48Q');

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
('8QGAqbO5IJ0zRpJDZgo4R', 'Én ezt tudom', '2022-04-23 17:24:15'),
('ALPu3KLfY7-pWSCQaQUGy', 'Hm', '2022-04-23 17:23:25'),
('ufMLWdp7vP-EzfsfG4uW5', 'Érdekel', '2022-04-23 17:23:09');

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
('S1dgj4W53hWZo-OSqrArg', '8QGAqbO5IJ0zRpJDZgo4R'),
('S1dgj4W53hWZo-OSqrArg', 'ALPu3KLfY7-pWSCQaQUGy'),
('S1dgj4W53hWZo-OSqrArg', 'ufMLWdp7vP-EzfsfG4uW5');

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
('W3Zk4vHXzBnAhv9BptcZIx9I0n6GOhQK6Xnh49_48Q', 'x9I0n6GOhQK6Xnh49_48Q', 'W3Zk4vHXzBnAhv9BptcZI');

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
  `UserEmail` varchar(40) NOT NULL,
  `UserPL` int(1) NOT NULL,
  `UserCreatedAt` datetime NOT NULL,
  `UserUpdatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `Users`
--

INSERT INTO `Users` (`UserId`, `UserUn`, `UserPP`, `UserPw`, `UserFN`, `UserSN`, `UserDob`, `UserEmail`, `UserPL`, `UserCreatedAt`, `UserUpdatedAt`) VALUES
('5uaAauQr9VNf1CvQ47Trx', 'tomi123', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$stuwX8umf/yQBrWmRpu96Os5rqLrLK3qvxJpz0HsrgHW4.txuYNAe', 'tomio', 'tomi', '2022-04-05', 'vardai.tamas@hotmail.com', -1, '2022-04-24 17:41:56', '2022-04-24 17:45:16'),
('FFph-teKuHttdPKyW13yd', 'Admina', 'http://nyuszis.kepek1.hu/kep/nyuszis-kepek_20.jpg', '$2b$10$WQIJNEfufxe2iztNr0qlsueM.fhgnIB90yj8i66kb5iyEkDteZ/y2', 'aadmin', 'azadmin', '2022-03-31', 'admin@gmail.com', 9, '2022-04-01 10:19:39', '2022-04-22 11:52:06'),
('g8lgdpeaghN1r9vRmRqDh', 'PapDaniel', 'https://scontent.fbud6-4.fna.fbcdn.net/v/t1.6435-9/115747863_3091156291001810_267922951576590158_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=40w3ffXS2XIAX8MDHOu&_nc_ht=scontent.fbud6-4.fna&oh=00_AT9ksGNLneTliUhKx1KNoA88J0difPB6WHcwj2a0IhkLsg&oe=628A8777', '$2a$10$oPxOlnjAUo/3U3ap5CZ1refBjxXrD/4VJOr0BzWpoAyX4xCyg4g2.', 'Pap', 'Danie', '2022-04-10', 'papdaniel9977@gmail.com', 1, '2022-04-04 16:25:04', '2022-04-20 14:36:28'),
('LEPlqUwaJBRhYvFBB6L3h', 'PapDaniel1997', 'https://scontent.fbud6-4.fna.fbcdn.net/v/t1.6435-9/115747863_3091156291001810_267922951576590158_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=40w3ffXS2XIAX8MDHOu&_nc_ht=scontent.fbud6-4.fna&oh=00_AT9ksGNLneTliUhKx1KNoA88J0difPB6WHcwj2a0IhkLsg&oe=628A8777', '$2a$10$G2G4cPfMP6nLJSh8Pt0QAu1t.I461c1/wbJ2iYJLT1dIyl2/CtEUe', 'Pap', 'Dániel', '1997-05-29', 'papszemet@gmail.com', 1, '2022-04-23 18:52:24', '2022-04-23 18:52:24'),
('S1dgj4W53hWZo-OSqrArg', 'tomisa', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2a$10$5qSOf2BwFN5ne/5Elr1A4.2UQsticq8hEUz56J7p64ayd8BbuZrnS', 'Tomi', 'Tomi', '1996-01-15', 'Tomi@gmail.com', 0, '2022-04-22 23:05:17', '2022-04-24 17:45:35'),
('W3Zk4vHXzBnAhv9BptcZI', 'PocsMark', 'https://molsoft.hu/wp-content/uploads/2020/12/blank-profile-picture-973460_1280.png', '$2b$10$zg7ckXuuQadL0aR/eR96guT2Bf56D61CawUXl8.zOrvMlHTqIFWWS', 'Pocs', 'Mark', '2022-03-25', 'mark199850@gmail.com', 1, '2022-03-25 14:11:02', '2022-04-22 20:23:55');

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
