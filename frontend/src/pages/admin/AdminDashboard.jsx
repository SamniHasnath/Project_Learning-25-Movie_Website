import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await api.get('/movies?limit=100');
      setMovies(res.data.movies);
    } catch {
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this movie?')) return;
    try {
      await api.delete(`/movies/${id}`);
      setMovies((prev) => prev.filter((m) => m.id !== id));
      toast.success('Movie deleted');
    } catch {
      toast.error('Could not delete movie');
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      <div className="admin-header">
        <h2 className="page-title">Admin Dashboard</h2>
        <Link to="/admin/add" className="btn btn-primary">
          <FiPlus /> Add Movie
        </Link>
      </div>

      {movies.length === 0 ? (
        <div className="empty-state">
          <p>No movies yet. <Link to="/admin/add">Add the first one!</Link></p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre || '—'}</td>
                  <td>{movie.release_year || '—'}</td>
                  <td>{movie.rating || '—'}</td>
                  <td className="admin-actions">
                    <Link to={`/admin/edit/${movie.id}`} className="icon-btn" title="Edit">
                      <FiEdit2 />
                    </Link>
                    <button className="icon-btn danger" onClick={() => handleDelete(movie.id)} title="Delete">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
