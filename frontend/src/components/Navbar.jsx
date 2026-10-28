import { Link, NavLink } from 'react-router-dom';
import { FiFilm } from 'react-icons/fi';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';

const navClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

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
        <NavLink to="/" end className={navClass}>Home</NavLink>
        <NavLink to="/watchlist" className={navClass}>Watchlist</NavLink>
        {user && <NavLink to="/favorites" className={navClass}>Favorites</NavLink>}
        {user?.role === 'admin' && <NavLink to="/admin" className={navClass}>Admin</NavLink>}
      </div>

      <SearchBar />

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="user-avatar" title={user.email}>{user.email?.[0] || 'U'}</span>
            <button className="btn-auth btn-auth--ghost" onClick={logout}>Sign out</button>
          </>
        ) : (
          // Opens the modal instead of navigating to /login page
          <>
            <button className="btn-auth btn-auth--ghost" onClick={() => openAuthModal('login')}>
              Sign in
            </button>
            <button className="btn-auth" onClick={() => openAuthModal('signup')}>
              Get started
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
