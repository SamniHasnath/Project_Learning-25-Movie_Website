import { useState, useEffect } from 'react';
import { FiPlay, FiPlus, FiStar } from 'react-icons/fi';
import api from '../api/axios';
import MovieRow from '../components/MovieRow';
import { useAuth } from '../context/AuthContext';
import { MOCK_MOVIES, getByGenre, getTopRated, getTrending } from '../data/mockMovies';
import toast from 'react-hot-toast';

// The featured hero movie shown at the top of the page
const HERO = {
  title: 'The Dark Horizon',
  rating: 8.7,
  release_year: 2024,
  genres: ['Featured', 'Action', 'Thriller', 'Sci-Fi'],
  description:
    'In a dystopian future, a lone survivor must navigate through the remnants of civilization to find the last sanctuary. As darkness falls, the true nature of humanity is revealed in this gripping tale of survival and hope.',
  backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=80',
  trailer_url: '#',
};

function Home() {
  // movies will be the list from the API. Falls back to MOCK_MOVIES if the backend is offline.
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get('/movies?limit=100');
        if (res.data.movies?.length > 0) {
          setMovies(res.data.movies);
        }
        // if API returns empty, keep mock data
      } catch {
        // Backend not running — keep mock data silently
      }
    };
    fetchMovies();
  }, []);

  const handleAddToWatchlist = async () => {
    if (!user) {
      toast.error('Please login to add to watchlist');
      return;
    }
    toast.success('Added to watchlist!');
  };

  // Build rows — filter movies by genre. Works with both real API data and mock data.
  const sciFiMovies    = movies.filter((m) => m.genre === 'Sci-Fi');
  const dramaMovies    = movies.filter((m) => m.genre === 'Drama' || m.genre === 'Romance');
  const actionMovies   = movies.filter((m) => m.genre === 'Action');
  const fantasyMovies  = movies.filter((m) => m.genre === 'Fantasy' || m.genre === 'Thriller');
  const topRated       = [...movies].sort((a, b) => b.rating - a.rating);
  const trending       = [...movies].sort((a, b) => b.release_year - a.release_year);

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero" style={{ backgroundImage: `url(${HERO.backdrop})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-genres">
            {HERO.genres.map((g, i) => (
              <span key={g} className={`genre-tag ${i === 0 ? 'genre-tag--featured' : ''}`}>
                {g}
              </span>
            ))}
          </div>
          <h1 className="hero-title">{HERO.title}</h1>
          <div className="hero-meta">
            <span className="hero-rating">
              <FiStar className="star-icon" /> {HERO.rating}
            </span>
            <span className="hero-year">{HERO.release_year}</span>
          </div>
          <p className="hero-description">{HERO.description}</p>
          <div className="hero-actions">
            <a href={HERO.trailer_url} className="btn btn-primary">
              <FiPlay /> Watch Trailer
            </a>
            <button className="btn btn-secondary" onClick={handleAddToWatchlist}>
              <FiPlus /> Add to Watchlist
            </button>
          </div>
        </div>
      </section>

      {/* ── Movie Rows ── */}
      <div className="rows-container">
        <MovieRow title="Trending Now"  movies={trending} />
        <MovieRow title="Top Rated"     movies={topRated} />
        <MovieRow title="Sci-Fi"        movies={sciFiMovies} />
        <MovieRow title="Drama"         movies={dramaMovies} />
        <MovieRow title="Action"        movies={actionMovies} />
        {fantasyMovies.length > 0 && (
          <MovieRow title="Fantasy & Thriller" movies={fantasyMovies} />
        )}
      </div>

    </div>
  );
}

export default Home;
