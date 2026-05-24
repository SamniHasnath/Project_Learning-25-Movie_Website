const express  = require('express');
const cors     = require('cors');
const path     = require('path');
require('dotenv').config();

const authRoutes      = require('./routes/authRoutes');
const movieRoutes     = require('./routes/movieRoutes');
const favoriteRoutes  = require('./routes/favoriteRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',      authRoutes);
app.use('/api/movies',    movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
