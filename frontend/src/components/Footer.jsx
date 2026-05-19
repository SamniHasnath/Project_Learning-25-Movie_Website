import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFilm, FiTwitter, FiInstagram, FiGithub, FiMail } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Subscribed successfully!');
    setEmail('');
  };

  return (
    <footer className="footer">

      {/* ── Top: logo + columns ── */}
      <div className="footer-top">

        {/* Brand column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <FiFilm />
            </div>
            <span>CineVault</span>
          </Link>
          <p className="footer-tagline">
            Your ultimate destination for discovering and managing your favorite movies.
            Explore, rate, and curate your personal watchlist with CineVault.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter"   className="social-btn"><FiTwitter /></a>
            <a href="#" aria-label="Instagram" className="social-btn"><FiInstagram /></a>
            <a href="#" aria-label="GitHub"    className="social-btn"><FiGithub /></a>
            <a href="#" aria-label="Email"     className="social-btn"><FiMail /></a>
          </div>
        </div>

        {/* Company column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Support column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        {/* Features column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Features</h4>
          <ul className="footer-links">
            <li><Link to="/">Browse Movies</Link></li>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <li><Link to="/">New Releases</Link></li>
            <li><Link to="/">Top Rated</Link></li>
          </ul>
        </div>

      </div>

      {/* ── Newsletter ── */}
      <div className="footer-newsletter">
        <div className="newsletter-text">
          <h3 className="newsletter-title">
            <AiFillHeart className="newsletter-heart" /> Stay Updated
          </h3>
          <p className="newsletter-subtitle">
            Subscribe to get updates on new releases and features
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 CineVault. All rights reserved.</p>
        <p className="footer-built">
          Built By <AiFillHeart className="built-heart" /> Samni Hasnath       </p>
      </div>

    </footer>
  );
};

export default Footer;
