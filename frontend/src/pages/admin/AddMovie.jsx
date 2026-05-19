import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const initialForm = {
  title: '',
  description: '',
  genre: '',
  release_year: '',
  rating: '',
  poster_url: '',
  trailer_url: '',
};

function AddMovie() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/movies', form);
      toast.success('Movie added!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Link to="/admin" className="back-link">
        <FiArrowLeft /> Back to Dashboard
      </Link>
      <h2 className="page-title">Add New Movie</h2>

      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-row">
          <div className="form-group">
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Movie title" />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input name="genre" value={form.genre} onChange={handleChange} placeholder="Action, Thriller" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Release Year</label>
            <input name="release_year" type="number" value={form.release_year} onChange={handleChange} placeholder="2024" min="1900" max="2099" />
          </div>
          <div className="form-group">
            <label>Rating (0–10)</label>
            <input name="rating" type="number" step="0.1" min="0" max="10" value={form.rating} onChange={handleChange} placeholder="8.5" />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Movie description..." />
        </div>

        <div className="form-group">
          <label>Poster URL</label>
          <input name="poster_url" value={form.poster_url} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-group">
          <label>Trailer URL</label>
          <input name="trailer_url" value={form.trailer_url} onChange={handleChange} placeholder="https://youtube.com/..." />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Movie'}
          </button>
          <Link to="/admin" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
