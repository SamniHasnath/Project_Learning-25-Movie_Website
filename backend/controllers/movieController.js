const Movie = require('../models/Movie');

exports.getAll = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const movies = await Movie.getAll(limit, offset);
    const total  = await Movie.getCount();
    res.json({ movies, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

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

exports.getOne = async (req, res) => {
  try {
    const movie = await Movie.getById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found.' });
    res.json({ movie });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const movieId = await Movie.create({ ...req.body, created_by: req.user.id });
    const movie   = await Movie.getById(movieId);
    res.status(201).json({ message: 'Movie created.', movie });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

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

exports.remove = async (req, res) => {
  try {
    await Movie.delete(req.params.id);
    res.json({ message: 'Movie deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
