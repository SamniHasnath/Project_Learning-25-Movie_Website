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
      [title, description, genre, release_year || null, rating || null, poster_url, trailer_url, created_by]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { title, description, genre, release_year, rating, poster_url, trailer_url } = data;
    await db.execute(
      'UPDATE movies SET title=?, description=?, genre=?, release_year=?, rating=?, poster_url=?, trailer_url=? WHERE id=?',
      [title, description, genre, release_year || null, rating || null, poster_url, trailer_url, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM movies WHERE id = ?', [id]);
  },
};

module.exports = Movie;
