# 🎬 Movie Website

A modern **full-stack movie website** built with **React, Vite, Node.js, Express.js, MySQL, and JWT Authentication**.

The application provides a platform where users can register and log in, browse movies, search for movies, manage their favorites and watchlist, while administrators can manage movie data through a dedicated admin dashboard.

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#-features)
* [User Features](#-user-features)
* [Admin Features](#-admin-features)
* [Tech Stack](#-tech-stack)
* [Project Architecture](#-project-architecture)
* [Project Structure](#-project-structure)
* [Application Flow](#-application-flow)
* [Authentication Flow](#-authentication-flow)
* [Database Design](#-database-design)
* [API Endpoints](#-api-endpoints)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)
* [Backend Setup](#-backend-setup)
* [Frontend Setup](#-frontend-setup)
* [Environment Variables](#-environment-variables)
* [Running the Project](#-running-the-project)
* [Testing](#-testing)
* [Security](#-security)
* [Screenshots](#-screenshots)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)
* [Resume Description](#-resume-description)
* [Author](#-author)
* [License](#-license)

---

# 🎯 About the Project

**Movie Website** is a full-stack web application designed to provide users with a simple and interactive platform for discovering and managing movies.

Users can create an account, securely log in, browse available movies, search for specific movies, save movies to their favorites, and maintain a personal watchlist.

The application also includes an **Admin Dashboard**, allowing administrators to manage movie information through CRUD operations.

This project was developed to practice real-world **frontend development, backend development, REST API design, database management, authentication, authorization, and full-stack application architecture**.

---

# 🚀 Features

## 👤 User Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Secure logout
* Protected routes
* Persistent authentication

### 🎬 Movie Browsing

* View available movies
* View movie details
* Movie posters
* Movie descriptions
* Genre information
* Release year
* Movie ratings

### 🔎 Movie Search

Users can search for movies by:

* Movie title
* Genre
* Other available movie information

### ❤️ Favorites

Users can:

* Add movies to favorites
* Remove movies from favorites
* View their favorite movies

### 📺 Watchlist

Users can:

* Add movies to their watchlist
* Remove movies from their watchlist
* View their saved watchlist

### 📱 Responsive UI

The application is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

---

# 🛡️ Admin Features

Administrators have access to a dedicated dashboard.

### 📊 Admin Dashboard

The dashboard can display:

* Total movies
* Movie information
* User-related information
* Management actions

### 🎬 Movie Management

Admin users can:

* ➕ Create movies
* 📋 View movies
* ✏️ Update movies
* 🗑️ Delete movies

This follows the standard **CRUD** architecture:

```text
Create
Read
Update
Delete
```

---

# 🛠️ Tech Stack

## 🎨 Frontend

| Technology   | Purpose                             |
| ------------ | ----------------------------------- |
| React.js     | Building the user interface         |
| Vite         | Frontend development and build tool |
| React Router | Client-side routing                 |
| Axios        | API communication                   |
| CSS          | Styling and responsive design       |

---

## ⚙️ Backend

| Technology | Purpose                              |
| ---------- | ------------------------------------ |
| Node.js    | JavaScript runtime                   |
| Express.js | Backend web framework                |
| REST API   | Frontend-backend communication       |
| JWT        | Authentication                       |
| Middleware | Request protection and authorization |

---

## 🗄️ Database

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| MySQL      | Relational database             |
| SQL        | Database queries and management |

---

## 🔧 Development Tools

* Visual Studio Code
* Git
* GitHub
* npm
* Postman
* MySQL Workbench

---

# 🏗️ Project Architecture

```text
                         ┌─────────────────────┐
                         │        USER         │
                         │     Web Browser     │
                         └──────────┬──────────┘
                                    │
                                    │ HTTP Requests
                                    ▼
                         ┌─────────────────────┐
                         │   React + Vite      │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                                    │ Axios
                                    ▼
                         ┌─────────────────────┐
                         │    Express.js       │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
             ┌────────────┐  ┌────────────┐  ┌──────────────┐
             │    JWT     │  │   Routes   │  │ Controllers  │
             │   Auth     │  │            │  │              │
             └────────────┘  └────────────┘  └──────┬───────┘
                                                     │
                                                     ▼
                                           ┌──────────────────┐
                                           │      MySQL       │
                                           │    Database      │
                                           └──────────────────┘
```

---

# 📁 Project Structure

```text
movie-website/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   ├── favoriteController.js
│   │   └── watchlistController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── favoriteRoutes.js
│   │   └── watchlistRoutes.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── movieModel.js
│   │   ├── favoriteModel.js
│   │   └── watchlistModel.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Movies.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Watchlist.jsx
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

> The exact folder and file names can be adjusted depending on the final implementation.

---

# 🔄 Application Flow

```text
                         MOVIE WEBSITE
                              │
                ┌─────────────┴─────────────┐
                │                           │
              USER                         ADMIN
                │                           │
        ┌───────┴────────┐           ┌──────┴──────┐
        │                │           │             │
      Signup           Login     Login         Dashboard
        │                │                         │
        └───────┬────────┘                         │
                │                                  │
                ▼                                  ▼
        Authentication                     Manage Movies
                │                                  │
                ▼                         ┌────────┼────────┐
         Browse Movies                    │        │        │
                │                       Add      Edit    Delete
        ┌───────┼────────┐
        │       │        │
      Search Favorites Watchlist
```

---

# 🔐 Authentication Flow

The application uses **JSON Web Tokens (JWT)** for authentication.

```text
User
 │
 ▼
Signup / Login
 │
 ▼
Backend
 │
 ▼
Validate Credentials
 │
 ▼
Generate JWT
 │
 ▼
Send Token to Frontend
 │
 ▼
Frontend Stores Authentication State
 │
 ▼
Protected API Request
 │
 ▼
JWT Token Sent
 │
 ▼
Authentication Middleware
 │
 ▼
Verify Token
 │
 ├── Invalid → Unauthorized
 │
 └── Valid → Allow Request
```

---

# 👥 Role-Based Authorization

The application supports two main roles:

```text
USER
ADMIN
```

### USER

Regular users can:

* Browse movies
* Search movies
* Manage favorites
* Manage watchlist
* View movie details

### ADMIN

Administrators can:

* Access admin dashboard
* Add movies
* Update movies
* Delete movies
* Manage movie data

---

# 🗄️ Database Design

The application uses **MySQL** as the relational database.

Database:

```text
movie_db
```

Main tables:

```text
movie_db
│
├── users
├── movies
├── favorites
└── watchlist
```

---

## 👤 Users Table

Stores registered user information.

```text
users
│
├── id
├── name
├── email
├── password
└── role
```

Example:

```text
id | name | email | password | role
```

Possible roles:

```text
USER
ADMIN
```

---

## 🎬 Movies Table

Stores movie information.

```text
movies
│
├── id
├── title
├── description
├── genre
├── release_year
├── rating
└── image_url
```

---

## ❤️ Favorites Table

Connects users with their favorite movies.

```text
favorites
│
├── id
├── user_id
└── movie_id
```

Relationship:

```text
User
 │
 └── Favorite Movies
```

---

## 📺 Watchlist Table

Stores movies saved by users.

```text
watchlist
│
├── id
├── user_id
└── movie_id
```

Relationship:

```text
User
 │
 └── Watchlist Movies
```

---

# 🔗 API Endpoints

## 🔐 Authentication API

| Method | Endpoint             | Description   | Access |
| ------ | -------------------- | ------------- | ------ |
| POST   | `/api/auth/register` | Register user | Public |
| POST   | `/api/auth/login`    | Login user    | Public |

---

## 🎬 Movie API

| Method | Endpoint          | Description     | Access |
| ------ | ----------------- | --------------- | ------ |
| GET    | `/api/movies`     | Get all movies  | Public |
| GET    | `/api/movies/:id` | Get movie by ID | Public |
| POST   | `/api/movies`     | Add movie       | Admin  |
| PUT    | `/api/movies/:id` | Update movie    | Admin  |
| DELETE | `/api/movies/:id` | Delete movie    | Admin  |

---

## ❤️ Favorites API

| Method | Endpoint             | Description     | Access |
| ------ | -------------------- | --------------- | ------ |
| GET    | `/api/favorites`     | Get favorites   | User   |
| POST   | `/api/favorites`     | Add favorite    | User   |
| DELETE | `/api/favorites/:id` | Remove favorite | User   |

---

## 📺 Watchlist API

| Method | Endpoint             | Description   | Access |
| ------ | -------------------- | ------------- | ------ |
| GET    | `/api/watchlist`     | Get watchlist | User   |
| POST   | `/api/watchlist`     | Add movie     | User   |
| DELETE | `/api/watchlist/:id` | Remove movie  | User   |

> API endpoint names may vary depending on the final backend implementation.

---

# 📋 Prerequisites

Before running this project, install:

### 1. Node.js

Download and install Node.js.

Check installation:

```bash
node --version
```

```bash
npm --version
```

### 2. MySQL

Install MySQL and make sure the MySQL server is running.

Check that you can connect to your MySQL server.

### 3. Git

Check Git:

```bash
git --version
```

### 4. Visual Studio Code

Recommended editor for development.

---

# 📥 Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/movie-website.git
```

Move into the project:

```bash
cd movie-website
```

---

# ⚙️ Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# 🗄️ MySQL Database Setup

Open MySQL and create the database:

```sql
CREATE DATABASE movie_db;
```

Select the database:

```sql
USE movie_db;
```

Create the required tables based on the project's database schema.

Make sure MySQL is running before starting the backend.

---

# 🔑 Environment Variables

Inside the `backend` folder, create:

```text
.env
```

Add:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=movie_db

JWT_SECRET=your_secret_key
```

### Environment Variable Explanation

| Variable      | Purpose                        |
| ------------- | ------------------------------ |
| `PORT`        | Backend server port            |
| `DB_HOST`     | MySQL host                     |
| `DB_USER`     | MySQL username                 |
| `DB_PASSWORD` | MySQL password                 |
| `DB_NAME`     | Database name                  |
| `JWT_SECRET`  | Secret used to sign JWT tokens |

---

# ⚠️ Important Security Note

Never upload `.env` to GitHub.

Add this to `.gitignore`:

```gitignore
node_modules/
.env
```

---

# ▶️ Start Backend

Inside the `backend` directory:

```bash
npm start
```

The backend server will run at:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal.

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Start Frontend

Run:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# 🚀 Running the Complete Project

You need two terminals.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Make sure:

```text
Frontend
   │
   │ Axios / HTTP
   ▼
Backend
   │
   │ SQL
   ▼
MySQL
```

---

# 🧪 API Testing

You can test the backend REST APIs using **Postman**.

Example requests:

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Get Movies

```http
GET /api/movies
```

### Add Favorite

```http
POST /api/favorites
```

### Get Watchlist

```http
GET /api/watchlist
```

For protected routes, include the JWT token in the request:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🔒 Security

The project implements several basic security concepts:

* JWT authentication
* Protected routes
* Role-based authorization
* Admin-only operations
* Environment variables
* Password protection
* Authentication middleware
* Authorization middleware

For a production application, passwords should be stored using a secure password hashing algorithm such as **bcrypt**, rather than plain text.

---

# 🖥️ Pages

The application can contain the following pages:

```text
Home
 │
 ├── Login
 ├── Signup
 │
 ├── Movies
 │    └── Movie Details
 │
 ├── Favorites
 │
 ├── Watchlist
 │
 └── Admin Dashboard
       │
       ├── Add Movie
       ├── Edit Movie
       └── Delete Movie
```

---

# 📸 Screenshots

Add screenshots of your completed application here.

Recommended screenshots:

```text
screenshots/
│
├── home.png
├── login.png
├── signup.png
├── movies.png
├── movie-details.png
├── favorites.png
├── watchlist.png
└── admin-dashboard.png
```

Example:

```markdown
## 📸 Screenshots

### 🏠 Home Page

![Home Page](screenshots/home.png)

### 🎬 Movies Page

![Movies Page](screenshots/movies.png)

### 🔐 Login Page

![Login Page](screenshots/login.png)

### ❤️ Favorites

![Favorites](screenshots/favorites.png)

### 📺 Watchlist

![Watchlist](screenshots/watchlist.png)

### 🛡️ Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)
```

---

# 🌱 Git Workflow

Example Git workflow used during development:

```bash
git init

git add .

git commit -m "Initial project setup"

git branch -M main

git remote add origin YOUR_GITHUB_REPOSITORY_URL

git push -u origin main
```

For future changes:

```bash
git add .

git commit -m "Add movie search feature"

git push
```

---

# 🧠 Learning Outcomes

This project helped develop practical knowledge of:

### Frontend Development

* React components
* JSX
* Props
* State
* Hooks
* React Router
* Forms
* API integration
* Axios
* Responsive UI

### Backend Development

* Node.js
* Express.js
* REST APIs
* Routes
* Controllers
* Middleware
* CRUD operations
* Error handling

### Database

* MySQL
* SQL queries
* Tables
* Primary keys
* Foreign keys
* Relationships
* Database integration

### Authentication

* User registration
* Login
* JWT
* Authentication middleware
* Protected routes
* Role-based authorization

### Software Engineering

* Project architecture
* Frontend/backend separation
* Git and GitHub
* API testing
* Environment variables
* Debugging
* Full-stack development

---

# 🔮 Future Improvements

The project can be extended with additional features.

## 🎥 Movie Features

* Movie trailers
* Movie categories
* Genre filtering
* Advanced search
* Trending movies
* Popular movies
* Upcoming movies
* Movie recommendations

## ⭐ User Features

* Movie ratings
* Reviews
* Comments
* User profiles
* Personalized recommendations
* Recently viewed movies

## 🛡️ Admin Features

* User management
* Advanced analytics
* Movie statistics
* Dashboard charts
* User activity monitoring

## 🎨 UI Improvements

* Dark mode
* Animations
* Skeleton loading
* Better mobile experience
* Pagination
* Infinite scrolling

## ☁️ Deployment

Future deployment can include:

* Frontend hosting
* Backend hosting
* Cloud database
* Environment configuration
* CI/CD pipeline
* Docker containerization

---

# 📊 Project Highlights

```text
Frontend
   ↓
React + Vite
   ↓
Axios
   ↓
REST API
   ↓
Node.js + Express
   ↓
JWT Authentication
   ↓
MySQL
```

### Key Concepts Demonstrated

```text
React
 ├── Components
 ├── Routing
 ├── State Management
 └── API Integration

Node.js + Express
 ├── REST APIs
 ├── Routes
 ├── Controllers
 ├── Middleware
 └── CRUD

MySQL
 ├── Database
 ├── Tables
 ├── Relationships
 └── SQL

Security
 ├── JWT
 ├── Authentication
 └── Authorization
```

---

# 💼 Resume Description

**Movie Website — Full-Stack Web Application**

* Developed a full-stack movie platform using **React, Vite, Node.js, Express.js, and MySQL**.
* Implemented **JWT-based authentication and role-based authorization** for secure user and admin access.
* Built movie browsing, search, favorites, and watchlist functionality using RESTful APIs.
* Developed an **admin dashboard** with CRUD operations for movie management.
* Integrated React frontend with an Express.js backend and MySQL database using Axios and REST APIs.

---

# 🎯 Project Goals

The main goals of this project are:

* Build a complete full-stack web application
* Understand frontend and backend communication
* Learn REST API development
* Practice CRUD operations
* Understand relational databases
* Implement authentication
* Implement authorization
* Work with JWT
* Build protected routes
* Practice Git and GitHub
* Develop a real-world portfolio project

---

# 👨‍💻 Author

## Samni Hasnath

**Software Engineering Undergraduate**

### GitHub

`https://github.com/SamniHasnath`

### LinkedIn

`https://linkedin.com/in/samni-hasnath03`

---

# ⭐ Show Your Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project was created for **educational and portfolio purposes**.

You are free to use and modify the project for learning purposes.

---

## 🎬 Final Project Stack

```text
┌─────────────────────────────────────┐
│            MOVIE WEBSITE            │
├─────────────────────────────────────┤
│                                     │
│  Frontend                           │
│  React + Vite + Axios               │
│                                     │
│              ↓                      │
│                                     │
│  Backend                            │
│  Node.js + Express.js               │
│                                     │
│              ↓                      │
│                                     │
│  Authentication                     │
│  JWT + Role-Based Authorization     │
│                                     │
│              ↓                      │
│                                     │
│  Database                           │
│  MySQL                              │
│                                     │
└─────────────────────────────────────┘
```

**Built with ❤️ by Samni Hasnath**
