-- ============================================================
-- CineVault Database Setup
-- Run this file once to create all tables
-- ============================================================

CREATE DATABASE IF NOT EXISTS moviedb;
USE moviedb;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(100)        NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255)        NOT NULL,
  role       ENUM('user','admin') DEFAULT 'user',
  created_at TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255)   NOT NULL,
  description  TEXT,
  genre        VARCHAR(100),
  release_year YEAR,
  rating       DECIMAL(3,1),
  poster_url   VARCHAR(500),
  trailer_url  VARCHAR(500),
  created_by   INT,
  created_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  movie_id   INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_fav (user_id, movie_id),
  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- Watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  movie_id   INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_watch (user_id, movie_id),
  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- ============================================================
-- Seed: Admin user  (password = admin123)
-- ============================================================
INSERT IGNORE INTO users (username, email, password, role) VALUES
('Admin', 'admin@cinevault.com',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- ============================================================
-- Seed: Demo user  (password = demo123)
-- ============================================================
INSERT IGNORE INTO users (username, email, password, role) VALUES
('Demo User', 'demo@cinevault.com',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- ============================================================
-- Seed: Sample movies
-- ============================================================
INSERT IGNORE INTO movies (id, title, description, genre, release_year, rating, poster_url, trailer_url, created_by) VALUES
(1, 'The Dark Knight',
 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.',
 'Action', 2008, 9.0,
 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 1),

(2, 'Inception',
 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task.',
 'Sci-Fi', 2010, 8.8,
 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
 'https://www.youtube.com/watch?v=YoHD9XEInc0', 1),

(3, 'Interstellar',
 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.',
 'Sci-Fi', 2014, 8.6,
 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
 'https://www.youtube.com/watch?v=zSWdZVtXT7E', 1),

(4, 'The Shawshank Redemption',
 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.',
 'Drama', 1994, 9.3,
 'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
 'https://www.youtube.com/watch?v=6hB3S9bIaco', 1),

(5, 'Pulp Fiction',
 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in tales of violence.',
 'Crime', 1994, 8.9,
 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
 'https://www.youtube.com/watch?v=s7EdQ4FqbhY', 1);
