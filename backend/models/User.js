const db = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.execute(
      'SELECT id, username, email, role FROM users WHERE id = ?', [id]
    );
    return rows[0];
  },

  create: async ({ username, email, password }) => {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  },
};

module.exports = User;
