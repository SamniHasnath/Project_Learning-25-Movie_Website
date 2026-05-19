import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/movies/search?q=${encodeURIComponent(query)}`);
        setMovies(res.data.movies);
      } catch {
        setError('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="page-container">
      <h2 className="page-title">
        {query ? `Results for "${query}"` : 'Search Movies'}
      </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : movies.length === 0 && query ? (
        <div className="empty-state">
          <p>No movies found for "{query}".</p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
