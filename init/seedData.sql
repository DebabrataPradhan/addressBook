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
