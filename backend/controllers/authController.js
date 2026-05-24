const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields are required.' });

    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already registered.' });

    const hashed = await bcrypt.hash(password, 12);
    const userId = await User.create({ username, email, password: hashed });

    const token = jwt.sign(
      { id: userId, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(201).json({ message: 'Account created.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password.' });

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

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
