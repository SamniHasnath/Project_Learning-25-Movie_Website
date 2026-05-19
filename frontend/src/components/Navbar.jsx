import { Link, NavLink } from 'react-router-dom';
import { FiFilm, FiUser } from 'react-icons/fi';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, openAuthModal } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="logo-icon">
          <FiFilm />
        </div>
        <span>CineVault</span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/watchlist" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Watchlist
        </NavLink>
      </div>

      <SearchBar />

      <div className="navbar-auth">
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link">Admin</Link>
            )}
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <button className="btn-auth" onClick={logout}>Logout</button>
          </>
        ) : (
          // Opens the modal instead of navigating to /login page
          <button className="btn-auth" onClick={() => openAuthModal('login')}>
            <FiUser />
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
