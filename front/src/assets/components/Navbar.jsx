import React from "react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  // Ferme le dropdown si on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#account-menu")) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white shadow-sm relative z-10">
      {/* Logo */}
      <a href="#" className="flex items-center gap-2">
        <img
          className="h-10 object-contain"
          src="/logg.png"
          alt="dummyLogoColored"
        />
        {/* <span className="text-xl font-bold text-indigo-600 hidden sm:inline">KaraArema</span> */}
      </a>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6 text-gray-700 font-medium">
        <a href="#" className="hover:text-indigo-500 transition">
          Accueil
        </a>
        <a href="#" className="hover:text-indigo-500 transition">
          Catalogue
        </a>
        <a href="#" className="hover:text-indigo-500 transition">
          Fonctionnalités
        </a>
        <a href="#" className="hover:text-indigo-500 transition">
          Offres
        </a>
        <a href="#" className="hover:text-indigo-500 transition">
          À propos
        </a>

        {/* Mon Compte Dropdown */}
        <div className="relative" id="account-menu">
          <button
            onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            className="ml-4 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition"
          >
            Mon Compte
          </button>
          {accountDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-20">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                type="button"
                useNavigate={() => navigate("/formuse")}
              >
                Se connecter
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                S'inscrire
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          className="text-gray-700"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-3 px-6 sm:hidden text-gray-700 font-medium z-50">
          <a href="#" className="block">
            Accueil
          </a>
          <a href="#" className="block">
            Catalogue
          </a>
          <a href="#" className="block">
            Fonctionnalités
          </a>
          <a href="#" className="block">
            Offres
          </a>
          <a href="#" className="block">
            À propos
          </a>
          <div className="w-full mt-2 border-t pt-2">
            <a
              href="#"
              className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 font-poppins"
            >
              Se connecter
            </a>

            <a
              href="#"
              className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              S'inscrire
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
