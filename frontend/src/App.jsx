import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddMovie from './pages/admin/AddMovie';
import EditMovie from './pages/admin/EditMovie';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add" element={<ProtectedRoute adminOnly><AddMovie /></ProtectedRoute>} />
          <Route path="/admin/edit/:id" element={<ProtectedRoute adminOnly><EditMovie /></ProtectedRoute>} />
        </Routes>
        <AuthModal />
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#1e1e2e', color: '#fff', border: '1px solid #2e2e3e' },
            success: { iconTheme: { primary: '#f5c518', secondary: '#000' } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
