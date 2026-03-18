-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Мар 18 2026 г., 10:42
-- Версия сервера: 10.6.22-MariaDB-0ubuntu0.22.04.1
-- Версия PHP: 8.1.2-1ubuntu2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `project_Valiev`
--

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` date NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `date`, `image`) VALUES
(1, 'Новогоднее настроение и творчество', 'В нашей школе искусств царит настоящая новогодняя атмосфера! Ученики художественного отделения вместе с преподавателями приняли участие в украшении школьной ёлки. Ребята своими руками создали уникальные ёлочные игрушки. В процессе работы дети узнали об истории новогодних украшений, традициях разных стран и получили огромное удовольствие от совместного творчества.', '2025-12-20', 'images/image31.png'),
(2, 'Мастер-класс по работе с соусом', 'Учащиеся 2–4 классов познакомились с мягким графическим материалом – соусом. Ребята освоили приёмы работы и создали собственные графические композиции. Занятия провела преподаватель Рау Юлия Александровна.', '2025-11-15', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
