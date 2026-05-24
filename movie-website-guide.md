# Full-Stack Movie Website — Complete Beginner's Guide

> **Stack:** React.js · Node.js · Express.js · MySQL · JWT · bcrypt

---

## Table of Contents

1. [Why Each Technology?](#1-why-each-technology)
2. [Final Folder Structure](#2-final-folder-structure)
3. [Every File & Folder Explained](#3-every-file--folder-explained)
4. [Database Design & SQL Schema](#4-database-design--sql-schema)
5. [Environment Variables](#5-environment-variables)
6. [Backend — Step-by-Step Setup](#6-backend--step-by-step-setup)
7. [All API Routes](#7-all-api-routes)
8. [Frontend — Step-by-Step Setup](#8-frontend--step-by-step-setup)
9. [Authentication Flow](#9-authentication-flow)
10. [How Data Flows: Frontend → Backend → Database](#10-how-data-flows-frontend--backend--database)
11. [API Testing with Postman](#11-api-testing-with-postman)
12. [TMDB API Integration](#12-tmdb-api-integration)
13. [Image Upload Handling](#13-image-upload-handling)
14. [Pagination, Loading States & Error Handling](#14-pagination-loading-states--error-handling)
15. [Recommended npm Packages](#15-recommended-npm-packages)
16. [Step-by-Step Development Order](#16-step-by-step-development-order)
17. [GitHub Commit Order](#17-github-commit-order)
18. [Beginner Mistakes to Avoid](#18-beginner-mistakes-to-avoid)
19. [Deployment Guide](#19-deployment-guide)

---

## 1. Why Each Technology?

| Technology | Why We Use It |
|---|---|
| **React.js** | Builds fast, interactive UIs. The component system lets you reuse code (e.g., one `MovieCard` component used 50 times). |
| **React Router** | Enables multiple pages (Home, Movie Details, Login) in a single-page app without full page reloads. |
| **Axios** | Makes HTTP requests from React to your Express server. Cleaner than `fetch` with automatic JSON parsing and interceptors for JWT. |
| **Node.js** | Runs JavaScript on the server. Same language on both frontend and backend — one language to learn. |
| **Express.js** | The "web framework" for Node. Handles routing, middleware, and request/response logic cleanly. |
| **MySQL** | Relational database — perfect for movies, users, watchlists that have clear relationships. |
| **MySQL connection pooling** | Reuses database connections instead of opening a new one for every request. Much faster, production-standard. |
| **MVC architecture** | Separates code into Models (data), Views (React), Controllers (logic). Keeps code organized as it grows. |
| **dotenv** | Loads secret keys (DB password, JWT secret) from a `.env` file so you never commit secrets to GitHub. |
| **CORS** | Lets your React app (port 3000) talk to your Express server (port 5000). Browsers block cross-origin requests by default. |
| **JWT (JSON Web Tokens)** | Stateless authentication — the server issues a token on login, the client sends it with every request. No session storage needed. |
| **bcrypt** | Hashes passwords before storing in the database. Even if your DB is hacked, passwords can't be read. |

---

## 2. Final Folder Structure

```
movie-website/
│
├── backend/
│   ├── config/
│   │   └── db.js                   # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js       # Signup / Login logic
│   │   ├── movieController.js      # Get, search, create, update, delete movies
│   │   ├── favoriteController.js   # Add/remove/get favorites
│   │   └── watchlistController.js  # Add/remove/get watchlist
│   ├── middleware/
│   │   ├── authMiddleware.js       # Verifies JWT token
│   │   └── adminMiddleware.js      # Checks if user is admin
│   ├── models/
│   │   ├── User.js                 # User DB queries
│   │   ├── Movie.js                # Movie DB queries
│   │   ├── Favorite.js             # Favorite DB queries
│   │   └── Watchlist.js            # Watchlist DB queries
│   ├── routes/
│   │   ├── authRoutes.js           # POST /api/auth/signup, /login
│   │   ├── movieRoutes.js          # GET/POST/PUT/DELETE /api/movies
│   │   ├── favoriteRoutes.js       # GET/POST/DELETE /api/favorites
│   │   └── watchlistRoutes.js      # GET/POST/DELETE /api/watchlist
│   ├── uploads/                    # Uploaded movie poster images
│   ├── .env                        # Secret environment variables (never commit)
│   ├── .gitignore
│   ├── package.json
│   └── server.js                   # Entry point — starts Express server
│
├── frontend/
│   ├── public/
│   │   └── index.html              # Single HTML file React mounts into
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js            # Axios instance with base URL + JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar with login/logout
│   │   │   ├── MovieCard.jsx       # Reusable movie card (poster, title, year)
│   │   │   ├── SearchBar.jsx       # Search input component
│   │   │   ├── Loader.jsx          # Loading spinner
│   │   │   ├── ErrorMessage.jsx    # Reusable error display
│   │   │   └── ProtectedRoute.jsx  # Redirects unauthenticated users
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state (user, token, login, logout)
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Browse all movies + pagination
│   │   │   ├── MovieDetail.jsx     # Single movie page with add to favorites
│   │   │   ├── Search.jsx          # Search results page
│   │   │   ├── Login.jsx           # Login form
│   │   │   ├── Signup.jsx          # Signup form
│   │   │   ├── Favorites.jsx       # User's favorites list
│   │   │   ├── Watchlist.jsx       # User's watchlist
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx  # Admin home
│   │   │       ├── AddMovie.jsx        # Add new movie form
│   │   │       └── EditMovie.jsx       # Edit existing movie
│   │   ├── App.jsx                 # All routes defined here
│   │   ├── main.jsx                # React entry point (mounts App)
│   │   └── index.css               # Global styles
│   ├── .env                        # Frontend env variables (VITE_API_URL)
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js              # Vite build config
│
└── README.md
```

---

## 3. Every File & Folder Explained

### Backend

**`server.js`** — The main entry point. Starts the Express app, loads middleware (CORS, JSON parsing), and connects all route files. Think of it as the "front door" of your backend.

**`config/db.js`** — Creates a MySQL connection pool. A pool keeps multiple connections open and ready, so your app doesn't slow down by opening a new DB connection on every request.

**`controllers/`** — This is where your actual logic lives. When a request comes in, the controller decides what to do: query the database, process data, return a response. No raw SQL here — that lives in models.

**`models/`** — Pure database interaction. Each model has functions like `findById(id)`, `create(data)`, `delete(id)`. Controllers call these. This separation means if you switch databases later, you only change models.

**`routes/`** — Maps URLs to controller functions. `GET /api/movies` → `movieController.getAll`. Routes don't contain logic, just routing.

**`middleware/`** — Code that runs between the request arriving and your controller handling it. `authMiddleware` checks the JWT token. `adminMiddleware` checks the user's role. If checks fail, the request is rejected before the controller even runs.

**`.env`** — Secret variables: database password, JWT secret key, port number. Never commit this file.

### Frontend

**`src/api/axios.js`** — A configured Axios instance. Sets the base URL (your backend URL) once, and automatically attaches the JWT token from localStorage to every request via an interceptor.

**`src/context/AuthContext.jsx`** — Global state for authentication. Stores the current user and token. Any component can access it with `useContext(AuthContext)`. Provides `login()` and `logout()` functions.

**`src/components/ProtectedRoute.jsx`** — Wraps routes that require login. If no token exists, automatically redirects to the login page.

**`src/pages/`** — Each file is a full page/view. These are what React Router navigates between.

**`src/components/`** — Small, reusable UI pieces. `MovieCard` is used on the Home page, Search page, and Favorites page — write once, use everywhere.

---

## 4. Database Design & SQL Schema

### Tables Overview

```
users          → stores registered users
movies         → stores all movie data
favorites      → links users to their favorite movies
watchlist      → links users to their watchlist
```

### Full SQL Schema

```sql
-- Run this in MySQL Workbench or your MySQL client

CREATE DATABASE IF NOT EXISTS moviedb;
USE moviedb;

-- ─────────────────────────────
-- USERS TABLE
-- ─────────────────────────────
CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  email      VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,          -- bcrypt hash, never plain text
  role       ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────
-- MOVIES TABLE
-- ─────────────────────────────
CREATE TABLE movies (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  description  TEXT,
  genre        VARCHAR(100),
  release_year INT,
  rating       DECIMAL(3, 1),               -- e.g. 8.5
  poster_url   VARCHAR(500),                -- URL to image (TMDB or uploaded)
  trailer_url  VARCHAR(500),
  created_by   INT,                         -- admin user who added it
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ─────────────────────────────
-- FAVORITES TABLE
-- ─────────────────────────────
CREATE TABLE favorites (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  movie_id   INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, movie_id),   -- prevents duplicate entries
  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- ─────────────────────────────
-- WATCHLIST TABLE
-- ─────────────────────────────
CREATE TABLE watchlist (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  movie_id   INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_watchlist (user_id, movie_id),
  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- ─────────────────────────────
-- SAMPLE DATA (optional)
-- ─────────────────────────────
INSERT INTO movies (title, description, genre, release_year, rating, poster_url) VALUES
('Inception', 'A thief who enters the dreams of others.', 'Sci-Fi', 2010, 8.8, 'https://...'),
('The Godfather', 'The aging patriarch of an organized crime dynasty.', 'Crime', 1972, 9.2, 'https://...');
```

---

## 5. Environment Variables

### `backend/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=moviedb

# JWT
JWT_SECRET=your_super_secret_key_make_this_long_and_random
JWT_EXPIRES_IN=7d

# TMDB (optional)
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> **Rule:** Never put secrets in your frontend `.env`. The frontend `.env` is visible to users. Only put the backend URL there.

---

## 6. Backend — Step-by-Step Setup

### Step 1: Initialize the Project

```bash
mkdir movie-website && cd movie-website
mkdir backend && cd backend
npm init -y
```

### Step 2: Install Dependencies

```bash
# Core packages
npm install express mysql2 dotenv cors bcryptjs jsonwebtoken

# File upload
npm install multer

# Dev tools
npm install --save-dev nodemon
```

Add to `package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 3: `config/db.js` — Database Connection Pool

```javascript
const mysql = require('mysql2');
require('dotenv').config();

// A pool reuses connections — much faster than creating one per request
const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,    // max 10 simultaneous DB connections
  queueLimit: 0
});

// .promise() lets us use async/await instead of callbacks
module.exports = pool.promise();
```

### Step 4: `middleware/authMiddleware.js`

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // attach user info to request
    next();              // move on to the controller
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
```

### Step 5: `middleware/adminMiddleware.js`

```javascript
// Always use AFTER authMiddleware — req.user must exist
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
};

module.exports = adminMiddleware;
```

### Step 6: `models/User.js`

```javascript
const db = require('../config/db');

const User = {
  // Find user by email (used during login)
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Find user by ID (used to get profile)
  findById: async (id) => {
    const [rows] = await db.execute('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // Create a new user
  create: async ({ username, email, password }) => {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  }
};

module.exports = User;
```

### Step 7: `models/Movie.js`

```javascript
const db = require('../config/db');

const Movie = {
  getAll: async (limit = 20, offset = 0) => {
    const [rows] = await db.execute(
      'SELECT * FROM movies ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return rows;
  },

  getCount: async () => {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM movies');
    return rows[0].total;
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM movies WHERE id = ?', [id]);
    return rows[0];
  },

  search: async (query) => {
    const [rows] = await db.execute(
      'SELECT * FROM movies WHERE title LIKE ? OR genre LIKE ?',
      [`%${query}%`, `%${query}%`]
    );
    return rows;
  },

  create: async (data) => {
    const { title, description, genre, release_year, rating, poster_url, trailer_url, created_by } = data;
    const [result] = await db.execute(
      'INSERT INTO movies (title, description, genre, release_year, rating, poster_url, trailer_url, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, genre, release_year, rating, poster_url, trailer_url, created_by]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { title, description, genre, release_year, rating, poster_url, trailer_url } = data;
    await db.execute(
      'UPDATE movies SET title=?, description=?, genre=?, release_year=?, rating=?, poster_url=?, trailer_url=? WHERE id=?',
      [title, description, genre, release_year, rating, poster_url, trailer_url, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM movies WHERE id = ?', [id]);
  }
};

module.exports = Movie;
```

### Step 8: `controllers/authController.js`

```javascript
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // 2. Hash the password — NEVER store plain text passwords
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Save user to database
    const userId = await User.create({ username, email, password: hashedPassword });

    // 4. Create a JWT token
    const token = jwt.sign(
      { id: userId, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: 'User created successfully.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 2. Compare submitted password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 3. Issue a new JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Login successful.', token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
```

### Step 9: `controllers/movieController.js`

```javascript
const Movie = require('../models/Movie');

// GET /api/movies?page=1&limit=20
exports.getAll = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const movies = await Movie.getAll(limit, offset);
    const total  = await Movie.getCount();

    res.json({
      movies,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// GET /api/movies/search?q=inception
exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Search query required.' });

    const movies = await Movie.search(q);
    res.json({ movies });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// GET /api/movies/:id
exports.getOne = async (req, res) => {
  try {
    const movie = await Movie.getById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found.' });
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// POST /api/movies (admin only)
exports.create = async (req, res) => {
  try {
    const movieId = await Movie.create({ ...req.body, created_by: req.user.id });
    const movie   = await Movie.getById(movieId);
    res.status(201).json({ message: 'Movie created.', movie });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// PUT /api/movies/:id (admin only)
exports.update = async (req, res) => {
  try {
    const movie = await Movie.getById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found.' });

    await Movie.update(req.params.id, req.body);
    res.json({ message: 'Movie updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// DELETE /api/movies/:id (admin only)
exports.remove = async (req, res) => {
  try {
    await Movie.delete(req.params.id);
    res.json({ message: 'Movie deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
```

### Step 10: `routes/movieRoutes.js`

```javascript
const express       = require('express');
const router        = express.Router();
const movieCtrl     = require('../controllers/movieController');
const auth          = require('../middleware/authMiddleware');
const adminOnly     = require('../middleware/adminMiddleware');

router.get('/',            movieCtrl.getAll);      // Public: browse movies
router.get('/search',      movieCtrl.search);      // Public: search
router.get('/:id',         movieCtrl.getOne);      // Public: movie details

router.post('/',           auth, adminOnly, movieCtrl.create);    // Admin only
router.put('/:id',         auth, adminOnly, movieCtrl.update);    // Admin only
router.delete('/:id',      auth, adminOnly, movieCtrl.remove);    // Admin only

module.exports = router;
```

### Step 11: `server.js`

```javascript
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
require('dotenv').config();

const authRoutes      = require('./routes/authRoutes');
const movieRoutes     = require('./routes/movieRoutes');
const favoriteRoutes  = require('./routes/favoriteRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

const app = express();

// ── Middleware ──────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' }));   // Allow frontend
app.use(express.json());                               // Parse JSON request bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// ── Routes ──────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/movies',    movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/watchlist', watchlistRoutes);

// ── Health check ─────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// ── Start server ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 7. All API Routes

### Authentication

| Method | URL | Auth? | Description |
|--------|-----|-------|-------------|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Login, get JWT token |
| GET | `/api/auth/me` | Yes | Get current user profile |

### Movies

| Method | URL | Auth? | Description |
|--------|-----|-------|-------------|
| GET | `/api/movies` | No | Get all movies (paginated) |
| GET | `/api/movies/search?q=` | No | Search movies by title/genre |
| GET | `/api/movies/:id` | No | Get single movie details |
| POST | `/api/movies` | Admin | Add a new movie |
| PUT | `/api/movies/:id` | Admin | Update a movie |
| DELETE | `/api/movies/:id` | Admin | Delete a movie |

### Favorites

| Method | URL | Auth? | Description |
|--------|-----|-------|-------------|
| GET | `/api/favorites` | Yes | Get user's favorites |
| POST | `/api/favorites` | Yes | Add movie to favorites |
| DELETE | `/api/favorites/:movieId` | Yes | Remove from favorites |

### Watchlist

| Method | URL | Auth? | Description |
|--------|-----|-------|-------------|
| GET | `/api/watchlist` | Yes | Get user's watchlist |
| POST | `/api/watchlist` | Yes | Add movie to watchlist |
| DELETE | `/api/watchlist/:movieId` | Yes | Remove from watchlist |

---

## 8. Frontend — Step-by-Step Setup

### Step 1: Create the React App with Vite

```bash
cd ..   # go back to movie-website/
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios react-router-dom
```

### Step 2: `src/api/axios.js` — The Key File

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // http://localhost:5000/api
});

// This interceptor runs BEFORE every request.
// It automatically attaches the JWT token.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// This interceptor runs AFTER every response.
// If 401 (unauthorized), log the user out automatically.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Step 3: `src/context/AuthContext.jsx`

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // On app load, decode the stored token to get user info
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(jwtDecode(newToken));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this in any component
export const useAuth = () => useContext(AuthContext);
```

### Step 4: `src/components/ProtectedRoute.jsx`

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
```

### Step 5: `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar       from './components/Navbar';
import Home         from './pages/Home';
import MovieDetail  from './pages/MovieDetail';
import Search       from './pages/Search';
import Login        from './pages/Login';
import Signup       from './pages/Signup';
import Favorites    from './pages/Favorites';
import Watchlist    from './pages/Watchlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddMovie     from './pages/admin/AddMovie';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/"          element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search"    element={<Search />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/signup"    element={<Signup />} />

          {/* Protected routes — require login */}
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin"          element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add"      element={<ProtectedRoute adminOnly><AddMovie /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

### Step 6: Example Page — `src/pages/Home.jsx`

```jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import MovieCard    from '../components/MovieCard';
import Loader       from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
  const [movies,     setMovies]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/movies?page=${page}&limit=20`);
        setMovies(res.data.movies);
        setTotalPages(res.data.pagination.totalPages);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);  // Re-fetch when page changes

  if (loading) return <Loader />;
  if (error)   return <ErrorMessage message={error} />;

  return (
    <div className="container">
      <h1>Browse Movies</h1>

      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
```

### Step 7: `src/pages/Login.jsx`

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { login }    = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const res = await api.post('/auth/login', form);
      login(res.data.token);       // save token, update context
      navigate('/');               // redirect to home
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email"    placeholder="Email"    value={form.email}
               onChange={e => setForm({...form, email: e.target.value})}    required />
        <input type="password" placeholder="Password" value={form.password}
               onChange={e => setForm({...form, password: e.target.value})} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;
```

---

## 9. Authentication Flow

```
User submits login form
        │
        ▼
Frontend: POST /api/auth/login  { email, password }
        │
        ▼
Backend authController.login
  1. Query DB for user by email
  2. bcrypt.compare(submittedPassword, storedHash)
  3. If match → jwt.sign({ id, email, role }, SECRET)
  4. Return { token }
        │
        ▼
Frontend: localStorage.setItem('token', token)
Frontend: AuthContext updates user state
        │
        ▼
All subsequent requests include:
  Header: Authorization: Bearer <token>
        │
        ▼
Backend authMiddleware on protected routes:
  jwt.verify(token, SECRET) → decoded user
  req.user = { id, email, role }
        │
        ▼
Controller handles request with req.user available
```

---

## 10. How Data Flows: Frontend → Backend → Database

**Example: User clicks "Add to Favorites" on a movie**

```
1. FRONTEND (MovieDetail.jsx)
   User clicks button → handleAddFavorite() runs
   → api.post('/favorites', { movie_id: 5 })
   → Axios interceptor attaches JWT token to headers
   → HTTP POST sent to http://localhost:5000/api/favorites

2. BACKEND — Express receives request
   → server.js routes to favoriteRoutes.js
   → favoriteRoutes: POST '/' → auth middleware runs first
   → authMiddleware: verifies JWT, sets req.user = { id: 12, role: 'user' }
   → favoriteController.add() runs

3. CONTROLLER (favoriteController.js)
   → Calls Favorite.create({ user_id: req.user.id, movie_id: req.body.movie_id })

4. MODEL (Favorite.js)
   → Runs: INSERT INTO favorites (user_id, movie_id) VALUES (12, 5)
   → Returns result

5. RESPONSE flows back:
   Model → Controller → Express → HTTP 201 { message: 'Added to favorites' }
   → Axios receives response
   → React component updates state to show "Remove from Favorites"
```

---

## 11. API Testing with Postman

### Setup

1. Download Postman from postman.com
2. Create a new Collection called "Movie Website"
3. Add an environment variable `base_url = http://localhost:5000/api`
4. Add an environment variable `token = ` (empty for now)

### Test Order

**1. Register a user**
- Method: POST
- URL: `{{base_url}}/auth/signup`
- Body (JSON): `{ "username": "testuser", "email": "test@test.com", "password": "Test1234!" }`
- Expected: 201 with token

**2. Login**
- Method: POST
- URL: `{{base_url}}/auth/login`
- Body (JSON): `{ "email": "test@test.com", "password": "Test1234!" }`
- Expected: 200 with token
- Action: Copy the token, paste it into your `token` environment variable

**3. Browse movies**
- Method: GET
- URL: `{{base_url}}/movies?page=1&limit=5`
- Expected: 200 with movies array and pagination object

**4. Search movies**
- Method: GET
- URL: `{{base_url}}/movies/search?q=inception`
- Expected: 200 with matching movies

**5. Add to favorites (requires token)**
- Method: POST
- URL: `{{base_url}}/favorites`
- Headers: `Authorization: Bearer {{token}}`
- Body (JSON): `{ "movie_id": 1 }`
- Expected: 201

**6. Test admin route without admin role**
- Method: POST
- URL: `{{base_url}}/movies`
- Headers: `Authorization: Bearer {{token}}`
- Expected: 403 "Admin access required" ✓

---

## 12. TMDB API Integration

TMDB (The Movie Database) provides free access to millions of movies.

### Get an API Key
1. Sign up at themoviedb.org
2. Go to Settings → API → Create API key
3. Add to backend `.env`: `TMDB_API_KEY=your_key`

### `backend/services/tmdbService.js`

```javascript
const axios = require('axios');

const TMDB_BASE  = process.env.TMDB_BASE_URL;
const TMDB_KEY   = process.env.TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: TMDB_KEY }   // attached to every request automatically
});

// Search TMDB
exports.searchMovies = async (query) => {
  const res = await tmdb.get('/search/movie', { params: { query } });
  return res.data.results;
};

// Get TMDB movie details
exports.getMovieDetails = async (tmdbId) => {
  const res = await tmdb.get(`/movie/${tmdbId}`);
  return res.data;
};

// Get poster URL
exports.getPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};
```

---

## 13. Image Upload Handling

### Backend: `middleware/uploadMiddleware.js`

```javascript
const multer = require('multer');
const path   = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    // movie-1717000000000.jpg — unique filename
    cb(null, `movie-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  cb(null, allowed.includes(file.mimetype));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }   // 5MB max
});
```

### In routes, add the middleware:
```javascript
const upload = require('../middleware/uploadMiddleware');
router.post('/', auth, adminOnly, upload.single('poster'), movieCtrl.create);
// req.file.filename is now available in the controller
```

---

## 14. Pagination, Loading States & Error Handling

### Pagination Pattern (both backend and frontend)

Backend returns: `{ movies: [...], pagination: { total, page, limit, totalPages } }`

Frontend uses: `page` state, Previous/Next buttons that update page, `useEffect` depends on `[page]`

### Loading State Pattern

```jsx
// Always use three states: loading, error, data
const [data,    setData]    = useState(null);
const [loading, setLoading] = useState(true);
const [error,   setError]   = useState(null);

// In fetch function:
setLoading(true);
setError(null);
try {
  const res = await api.get('/movies');
  setData(res.data);
} catch (err) {
  setError(err.response?.data?.message || 'Something went wrong');
} finally {
  setLoading(false);  // always runs — success or fail
}

// In JSX:
if (loading) return <Loader />;
if (error)   return <ErrorMessage message={error} />;
return <div>{/* render data */}</div>;
```

### Global Error Handling in Express

Add at the bottom of `server.js` (after all routes):

```javascript
// This middleware catches errors thrown in any controller
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
});
```

---

## 15. Recommended npm Packages

### Backend

| Package | Use |
|---------|-----|
| `express` | Web framework |
| `mysql2` | MySQL driver (faster than `mysql`) |
| `dotenv` | Load `.env` variables |
| `cors` | Allow cross-origin requests |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | Create/verify JWT tokens |
| `multer` | Handle file uploads |
| `joi` | Request body validation |
| `nodemon` | Auto-restart server on file change (dev only) |

### Frontend

| Package | Use |
|---------|-----|
| `react-router-dom` | Client-side routing |
| `axios` | HTTP requests |
| `jwt-decode` | Decode JWT to get user info |
| `react-hot-toast` | Beautiful toast notifications |
| `react-icons` | Icon library (FA, MD, etc.) |

---

## 16. Step-by-Step Development Order

Follow this order — each step builds on the last.

**Week 1 — Backend Foundation**
1. Set up MySQL, create the database and tables (schema above)
2. Initialize Node/Express project, install packages
3. Build `config/db.js` and test DB connection
4. Build User model + auth controller (signup/login)
5. Build auth routes, test with Postman
6. Build auth middleware (JWT verification)

**Week 2 — Movies Backend**
7. Build Movie model (all CRUD queries)
8. Build movie controller (getAll, getOne, search, create, update, delete)
9. Build movie routes with middleware protection
10. Test all movie endpoints in Postman

**Week 3 — Favorites & Watchlist Backend**
11. Build Favorite and Watchlist models and controllers
12. Test all endpoints

**Week 4 — Frontend Foundation**
13. Create React app with Vite
14. Build Axios instance with interceptors
15. Build AuthContext
16. Build App.jsx with all routes
17. Build Navbar, Loader, ErrorMessage components

**Week 5 — Frontend Pages**
18. Build Login and Signup pages
19. Build Home page (movie grid + pagination)
20. Build MovieDetail page
21. Build Search page
22. Build Favorites and Watchlist pages
23. Build Admin pages (add/edit/delete)

**Week 6 — Polish**
24. Add TMDB integration
25. Add image upload
26. Add loading states everywhere
27. Make responsive with CSS
28. Error handling and edge cases
29. Deploy

---

## 17. GitHub Commit Order

```bash
# Commit 1: Project setup
git commit -m "chore: initialize backend and frontend projects"

# Commit 2: Database
git commit -m "feat: add MySQL schema and connection pool"

# Commit 3: Auth backend
git commit -m "feat: add user signup and login endpoints with JWT and bcrypt"

# Commit 4: Auth middleware
git commit -m "feat: add JWT auth middleware and admin middleware"

# Commit 5: Movies backend
git commit -m "feat: add movie CRUD endpoints with pagination and search"

# Commit 6: Favorites and watchlist
git commit -m "feat: add favorites and watchlist endpoints"

# Commit 7: React setup
git commit -m "chore: initialize React frontend with Vite and React Router"

# Commit 8: Axios + AuthContext
git commit -m "feat: add Axios instance with JWT interceptor and AuthContext"

# Commit 9: Auth pages
git commit -m "feat: add login and signup pages"

# Commit 10: Home and browse
git commit -m "feat: add home page with movie grid and pagination"

# Commit 11: Movie details
git commit -m "feat: add movie detail page with add to favorites"

# Commit 12: Search
git commit -m "feat: add movie search page"

# Commit 13: User pages
git commit -m "feat: add favorites and watchlist pages"

# Commit 14: Admin panel
git commit -m "feat: add admin dashboard with add/edit/delete movies"

# Commit 15: Polish
git commit -m "feat: add loading states, error handling, and responsive styles"

# Commit 16: Deploy
git commit -m "chore: add deployment configuration"
```

---

## 18. Beginner Mistakes to Avoid

**1. Storing plain text passwords**
Never do `INSERT INTO users (password) VALUES ('mypassword123')`. Always hash with bcrypt first.

**2. Committing `.env` to GitHub**
Add `.env` to `.gitignore` immediately. If you accidentally commit it, rotate all your secrets.

**3. No error handling in async functions**
Every `await` can throw. Always use `try/catch` in controllers and `useEffect` in React.

**4. Calling the database directly from routes**
Use the MVC pattern. Routes → Controllers → Models. Don't write SQL in your route files.

**5. Not using connection pooling**
`mysql.createConnection()` opens one connection. If it drops, your app crashes. Always use `createPool()`.

**6. Forgetting `e.preventDefault()` in form submissions**
Without it, the browser refreshes the page when the form is submitted, losing all React state.

**7. Putting secrets in frontend code**
The `VITE_` prefix makes variables visible to everyone in the browser. Only put the API URL there, never secret keys.

**8. Not handling the loading state**
If you render data before it loads, you'll get `Cannot read properties of undefined` errors. Always check loading/error before rendering data.

**9. SQL injection vulnerability**
Never concatenate user input into SQL strings. Always use `?` placeholders with parameterized queries. The `mysql2` library handles this safely.

**10. Not testing backend before building frontend**
Always test every API endpoint in Postman before you try to connect React to it.

---

## 19. Deployment Guide

### Backend: Deploy to Railway or Render

1. Push backend code to GitHub
2. Create account at railway.app or render.com
3. Create new project → connect GitHub repo
4. Add all environment variables (DB credentials, JWT secret, etc.)
5. Railway/Render will auto-detect Node.js and run `npm start`

### MySQL: Use PlanetScale or Railway MySQL

1. Create a MySQL database on PlanetScale (free) or Railway
2. Get the connection string
3. Update your backend env variables with the hosted DB credentials

### Frontend: Deploy to Vercel or Netlify

1. Push frontend to GitHub
2. Import repo on vercel.com
3. Set environment variable: `VITE_API_URL=https://your-backend.railway.app/api`
4. Vercel auto-builds on every push

### Update CORS for Production

In `server.js`, update CORS to allow your deployed frontend URL:
```javascript
app.use(cors({ origin: 'https://your-frontend.vercel.app' }));
```

---

*Built with ❤️ for learners. Start small, test each step, and build up incrementally.*
