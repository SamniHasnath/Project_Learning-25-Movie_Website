import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

// Props:
//   movie — movie object with id, title, release_year, genre, rating, poster_url
const MovieCard = ({ movie }) => {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();

  const poster =
    movie.poster_url ||
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80';

  const handleFavorite = async (e) => {
    e.preventDefault(); // stop the <Link> from navigating
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }
    try {
      if (liked) {
        await api.delete(`/favorites/${movie.id}`);
        setLiked(false);
        toast.success('Removed from favorites');
      } else {
        await api.post('/favorites', { movie_id: movie.id });
        setLiked(true);
        toast.success('Added to favorites!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update favorites');
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-poster">
        <img src={poster} alt={movie.title} loading="lazy" />

        {/* Yellow rating badge — always visible, top-left */}
        {movie.rating && (
          <div className="rating-badge">
            <FiStar />
            <span>{movie.rating}</span>
          </div>
        )}

        {/* Heart / favorite button — top-right */}
        <button className="heart-btn" onClick={handleFavorite} aria-label="Toggle favorite">
          {liked ? <AiFillHeart className="heart-filled" /> : <FiHeart />}
        </button>
      </div>

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span className="movie-card-year">{movie.release_year}</span>
          {movie.genre && <span className="movie-card-genre-label">{movie.genre}</span>}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
