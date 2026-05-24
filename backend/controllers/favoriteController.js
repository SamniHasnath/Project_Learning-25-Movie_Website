const Favorite = require('../models/Favorite');

exports.getAll = async (req, res) => {
  try {
    const favorites = await Favorite.getByUser(req.user.id);
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { movie_id } = req.body;
    if (!movie_id) return res.status(400).json({ message: 'movie_id is required.' });
    await Favorite.create(req.user.id, movie_id);
    res.status(201).json({ message: 'Added to favorites.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(400).json({ message: 'Already in favorites.' });
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Favorite.delete(req.user.id, req.params.movieId);
    res.json({ message: 'Removed from favorites.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
