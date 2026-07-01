CREATE DATABASE IF NOT EXISTS soft_glow_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE soft_glow_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS masters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  profession VARCHAR(150) NOT NULL,
  experience VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS master_service (
  master_id INT NOT NULL,
  service_id INT NOT NULL,

  PRIMARY KEY (master_id, service_id),

  CONSTRAINT fk_master_service_master
    FOREIGN KEY (master_id)
    REFERENCES masters(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_master_service_service
    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,

  name VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NOT NULL,

  service_id INT NULL,
  master_id INT NULL,

  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,

  comment TEXT,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') NOT NULL DEFAULT 'pending',

  user_id INT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_appointments_service
    FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,

  CONSTRAINT fk_appointments_master
    FOREIGN KEY (master_id)
    REFERENCES masters(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,

  CONSTRAINT fk_appointments_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);