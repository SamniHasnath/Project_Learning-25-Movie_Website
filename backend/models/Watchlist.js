const db = require('../config/db');

const Watchlist = {
  getByUser: async (userId) => {
    const [rows] = await db.execute(
      `SELECT w.id, w.movie_id, w.created_at,
              m.title, m.genre, m.release_year, m.rating, m.poster_url
       FROM watchlist w
       JOIN movies m ON w.movie_id = m.id
       WHERE w.user_id = ?
       ORDER BY w.created_at DESC`,
      [userId]
    );
    return rows;
  },

  create: async (userId, movieId) => {
    const [result] = await db.execute(
      'INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)',
      [userId, movieId]
    );
    return result.insertId;
  },

  delete: async (userId, movieId) => {
    await db.execute(
      'DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?',
      [userId, movieId]
    );
  },
};

module.exports = Watchlist;
