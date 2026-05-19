import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import toast from 'react-hot-toast';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await api.get('/favorites');
      setFavorites(res.data.favorites || []);
    } catch {
      setError('Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFavorites(); }, []);

  const handleRemove = async (movieId) => {
    try {
      await api.delete(`/favorites/${movieId}`);
      setFavorites((prev) => prev.filter((f) => f.movie_id !== movieId));
      toast.success('Removed from favorites');
    } catch {
      toast.error('Could not remove');
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      <h2 className="page-title">My Favorites</h2>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet. Browse movies and add some!</p>
        </div>
      ) : (
        <div className="movie-grid">
          {favorites.map((fav) => (
            <div key={fav.id} className="movie-card-wrapper">
              <MovieCard movie={fav} />
              <button
                className="remove-btn"
                onClick={() => handleRemove(fav.movie_id)}
                title="Remove from favorites"
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

export default Favorites;
