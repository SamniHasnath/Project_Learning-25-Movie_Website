import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiPlay, FiHeart, FiPlus, FiArrowLeft } from 'react-icons/fi';
import api from '../api/axios';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function MovieDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data.movie);
      } catch {
        setError('Movie not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const addToFavorites = async () => {
    if (!user) return toast.error('Please login first');
    try {
      await api.post('/favorites', { movie_id: movie.id });
      toast.success('Added to favorites!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add to favorites');
    }
  };

  const addToWatchlist = async () => {
    if (!user) return toast.error('Please login first');
    try {
      await api.post('/watchlist', { movie_id: movie.id });
      toast.success('Added to watchlist!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add to watchlist');
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  const poster = movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80';

  return (
    <div className="movie-detail">
      <div
        className="movie-detail-backdrop"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div className="movie-detail-overlay" />
      </div>

      <div className="movie-detail-content">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Back
        </Link>

        <div className="movie-detail-body">
          <div className="movie-detail-poster">
            <img src={poster} alt={movie.title} />
          </div>

          <div className="movie-detail-info">
            {movie.genre && (
              <div className="detail-genres">
                {movie.genre.split(',').map((g) => (
                  <span key={g} className="genre-tag">{g.trim()}</span>
                ))}
              </div>
            )}
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              {movie.rating && (
                <span className="detail-rating">
                  <FiStar className="star-icon" /> {movie.rating}
                </span>
              )}
              {movie.release_year && <span className="detail-year">{movie.release_year}</span>}
            </div>
            {movie.description && <p className="detail-description">{movie.description}</p>}

            <div className="detail-actions">
              {movie.trailer_url && (
                <a href={movie.trailer_url} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <FiPlay /> Watch Trailer
                </a>
              )}
              <button className="btn btn-secondary" onClick={addToWatchlist}>
                <FiPlus /> Watchlist
              </button>
              <button className="btn btn-secondary" onClick={addToFavorites}>
                <FiHeart /> Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
