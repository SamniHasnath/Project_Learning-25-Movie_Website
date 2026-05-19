import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import toast from 'react-hot-toast';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const res = await api.get('/watchlist');
      setWatchlist(res.data.watchlist || []);
    } catch {
      setError('Failed to load watchlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWatchlist(); }, []);

  const handleRemove = async (movieId) => {
    try {
      await api.delete(`/watchlist/${movieId}`);
      setWatchlist((prev) => prev.filter((w) => w.movie_id !== movieId));
      toast.success('Removed from watchlist');
    } catch {
      toast.error('Could not remove');
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      <h2 className="page-title">My Watchlist</h2>

      {watchlist.length === 0 ? (
        <div className="empty-state">
          <p>Your watchlist is empty. Start adding movies to watch later!</p>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlist.map((item) => (
            <div key={item.id} className="movie-card-wrapper">
              <MovieCard movie={item} />
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.movie_id)}
                title="Remove from watchlist"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
