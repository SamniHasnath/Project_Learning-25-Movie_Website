const db = require('../config/db');

const Favorite = {
  getByUser: async (userId) => {
    const [rows] = await db.execute(
      `SELECT f.id, f.movie_id, f.created_at,
              m.title, m.genre, m.release_year, m.rating, m.poster_url
       FROM favorites f
       JOIN movies m ON f.movie_id = m.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    );
    return rows;
  },

  create: async (userId, movieId) => {
    const [result] = await db.execute(
      'INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)',
      [userId, movieId]
    );
    return result.insertId;
  },

  delete: async (userId, movieId) => {
    await db.execute(
      'DELETE FROM favorites WHERE user_id = ? AND movie_id = ?',
      [userId, movieId]
    );
  },
};

module.exports = Favorite;
