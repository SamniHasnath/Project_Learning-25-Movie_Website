const Watchlist = require('../models/Watchlist');

exports.getAll = async (req, res) => {
  try {
    const watchlist = await Watchlist.getByUser(req.user.id);
    res.json({ watchlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { movie_id } = req.body;
    if (!movie_id) return res.status(400).json({ message: 'movie_id is required.' });
    await Watchlist.create(req.user.id, movie_id);
    res.status(201).json({ message: 'Added to watchlist.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(400).json({ message: 'Already in watchlist.' });
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Watchlist.delete(req.user.id, req.params.movieId);
    res.json({ message: 'Removed from watchlist.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
