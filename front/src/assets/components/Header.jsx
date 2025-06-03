// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-white">
          🎤 KaraArema
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-400 transition">
            Accueil
          </Link>

          {/* Lien Upload visible uniquement pour admin */}
          {user?.role === 'admin' && (
            <Link to="/upload" className="hover:text-blue-400 transition">
              Upload
            </Link>
          )}

          {/* Lien vers liste des chansons (visible pour tous) */}
          <Link to="/songs" className="hover:text-blue-400 transition">
            Chansons
          </Link>

          {/* Connexion / Déconnexion */}
          {user ? (
            <>
              <span className="text-sm text-gray-300">Bienvenue, {user.username}</span>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition text-sm"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
