DROP DATABASE IF EXISTS address_book;

CREATE DATABASE address_book;
USE address_book;

CREATE TABLE cities (
  citycode INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  PRIMARY KEY (citycode)
);

CREATE TABLE person_address (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  firstname VARCHAR(100),
  email VARCHAR(100),
  street VARCHAR(255),
  zip INT,
  citycode INT,
  PRIMARY KEY (id)
);

INSERT INTO cities (name) VALUES
('Geneva'),('Zürich'),('Basel'),('Bern'),('Lausanne'),('Lucerne'),('Lugano'),('Sankt Fiden'),('Chur'),('Schaffhausen'),('Fribourg'),('Neuchâtel'),('Tripon'),('Zug'),('Frauenfeld'),('Bellinzona'),('Aarau'),('Herisau'),('Solothurn'),('Schwyz'),('Liestal'),('Delémont'),('Sarnen'),('Altdorf'),('Stansstad'),('Glarus'),('Appenzell'),('Saignelégier'),('Affoltern am Albis'),('Cully'),('Romont'),('Aarberg'),('Scuol'),('Fleurier'),('Unterkulm'),('Stans'),('Lichtensteig'),('Yverdon-les-Bains'),('Boudry'),('Balsthal'),('Dornach'),('Lachen'),('Payerne'),('Baden'),('Bad Zurzach'),('Tafers'),('Haslen');

--INSERT INTO `person_address` (`id`, `name`, `firstname`, `email`, `street`, `zip`, `citycode`) VALUES
--(1, 'Debabrata Pradhan', 'Deb', 'debabrata060@gmail.com', '3rd cross', 560029, 18),
--(2, 'Bapuni Babu', 'Bapuni', 'devmapit@gmail.com', 'khajurtikra', 768028, 12),
--(3, 'Pappu Pradhan', 'Pappu', 'deba@gmail.com', 'UP school', 768002, 9),
--(4, 'Roli Bhoi', 'Roli', 'roli@gmail.com', 'beeach house', 123456, 15),
--(5, 'Labdha Pardhan', 'Labdha', 'deba@gmail.com', 'khrishnamurty layout', 560026, 14),
--(6, 'Sasmita padhan', 'sasmita', 'jubly@gmail.com', 'samleipadar', 768001, 12),
--(7, 'jubly padhan', 'jubly', 'jub@gmail.com', 'kumbhari', 768002, 7),
--(8, 'Nali Papad', 'Nali', 'Nali@gmail.com', '5th cross', 28437, 21),
--(9, 'Bahubali Bhanja', 'Bhanja', 'Bhanja@gmail.com', 'sabuade go kenu kenu rahba', 694823, 17),
--(10, 'Ram bro', 'ram', 'ram@gmail.com', 'vatika', 13947981, 10),
--(11, 'Sita maiya', 'Sita', 'sita@gmail.com', 'ashok vatika', 214748, 20),
--(12, 'Bilasini Pradhan', 'Bilasa', 'maa@gmail.com', 'budelpali', 768007, 16),
--(13, 'Byomakesh Pradhan', 'Byoma', 'Byoma@gmail.com', 'pradhan street', 768028, 33),
--(14, 'Pappu Pradhan', 'Pappu', 'deba@gmail.com', 'UP school agade', 768002, 9),
--(15, 'Devansh Pradhan', 'Makhnu', 'makhan.singh@gmail.com', 'Khajurtikra', 732489, 35),
--(16, 'bimal jiju', 'gain', 'gain@lic.com', 'lic colony', 567321, 21);
