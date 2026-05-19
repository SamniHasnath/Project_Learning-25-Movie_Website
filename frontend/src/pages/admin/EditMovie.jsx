import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        const m = res.data.movie;
        setForm({
          title: m.title || '',
          description: m.description || '',
          genre: m.genre || '',
          release_year: m.release_year || '',
          rating: m.rating || '',
          poster_url: m.poster_url || '',
          trailer_url: m.trailer_url || '',
        });
      } catch {
        toast.error('Movie not found');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put(`/movies/${id}`, form);
      toast.success('Movie updated!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update movie');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <Loader />;

  return (
    <div className="page-container">
      <Link to="/admin" className="back-link">
        <FiArrowLeft /> Back to Dashboard
      </Link>
      <h2 className="page-title">Edit Movie</h2>

      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-row">
          <div className="form-group">
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input name="genre" value={form.genre} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Release Year</label>
            <input name="release_year" type="number" value={form.release_year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Rating (0–10)</label>
            <input name="rating" type="number" step="0.1" min="0" max="10" value={form.rating} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
        </div>

        <div className="form-group">
          <label>Poster URL</label>
          <input name="poster_url" value={form.poster_url} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Trailer URL</label>
          <input name="trailer_url" value={form.trailer_url} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link to="/admin" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default EditMovie;
