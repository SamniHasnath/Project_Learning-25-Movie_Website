import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from './MovieCard';

// A horizontally scrollable row of movie cards with left/right arrow navigation.
// Props:
//   title  — section heading (e.g. "Sci-Fi", "Top Rated")
//   movies — array of movie objects
const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === 'left' ? -900 : 900,
        behavior: 'smooth',
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-row">
      <div className="movie-row-header">
        <h2 className="movie-row-title">{title}</h2>
        <div className="movie-row-nav">
          <button className="row-arrow-btn" onClick={() => scroll('left')} aria-label="Scroll left">
            <FiChevronLeft />
          </button>
          <button className="row-arrow-btn" onClick={() => scroll('right')} aria-label="Scroll right">
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="movie-row-scroll" ref={rowRef}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-row-item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
