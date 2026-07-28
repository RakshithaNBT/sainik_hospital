import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaAmbulance, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      // Route to doctors search or custom search results
      navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`hospital-navbar-wrapper ${isScrolled ? 'scrolled shadow-md' : ''}`}>
        {/* Top Mini Info Bar */}
        <div className="top-mini-navbar d-none d-lg-block">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="top-info-left">
              <span className="info-item"><span className="pulse-dot"></span> Emergency: <a href="tel:6361611986" className="fw-bold text-danger">6361611986</a> / <a href="tel:7337668946" className="fw-bold text-danger">7337668946</a></span>
              <span className="info-item ms-4">Call Desk: <a href="tel:6361611986">6361611986</a> / <a href="tel:7022630692">7022630692</a></span>
            </div>
            <div className="top-info-right">
              <span>Working Hours: Mon - Sun (24/7 Support)</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="navbar navbar-expand-lg py-3">
          <div className="container">
            {/* Logo - Always links back to Home page */}
            <Link 
              to="/" 
              className="navbar-brand d-flex align-items-center" 
              onClick={() => {
                closeMobileMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Return to Home Page"
            >
              <img 
                src="/sainik-logo.jpg" 
                alt="SAINIK Hospital Official Emblem" 
                className="sainik-logo-img me-2" 
                style={{ height: '52px', width: '52px', objectFit: 'contain', borderRadius: '50%' }} 
              />
              <div className="logo-text-wrapper">
                <span className="logo-title">SAINIK</span>
                <span className="logo-subtitle">MULTI-SPECIALITY HOSPITAL</span>
              </div>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <div className="d-flex align-items-center order-lg-3 gap-2">
              <button 
                className="navbar-toggler" 
                type="button" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Desktop Menu links */}
            <div className="collapse navbar-collapse justify-content-end order-lg-2" id="navbarNav">
              <ul className="navbar-nav align-items-center gap-1">
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About Us</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/departments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Departments</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/doctors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Doctors</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/facilities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Facilities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Services</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Gallery</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Blog</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-navigation-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            <div className="drawer-header container py-3 d-flex justify-content-between align-items-center">
              <span className="drawer-logo-title">SAINIK HOSPITAL</span>
              <button className="btn-close-drawer" onClick={closeMobileMenu} aria-label="Close Navigation Menu">
                <FaTimes size={26} />
              </button>
            </div>
            
            <div className="drawer-body container py-4">
              <ul className="drawer-nav-list">
                <li><NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
                <li><NavLink to="/departments" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Departments</NavLink></li>
                <li><NavLink to="/doctors" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Doctors</NavLink></li>
                <li><NavLink to="/facilities" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Facilities</NavLink></li>
                <li><NavLink to="/services" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Services & Packages</NavLink></li>
                <li><NavLink to="/gallery" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Gallery</NavLink></li>
                <li><NavLink to="/blog" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Health Blog</NavLink></li>
                <li><NavLink to="/contact" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
              </ul>

              <div className="drawer-quick-search mt-4">
                <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Search doctor or specialty..." 
                    className="form-control text-dark" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary bg-success border-0"><FaSearch /></button>
                </form>
              </div>

              <div className="drawer-footer mt-5 text-center">
                <p className="text-muted small mb-3">Emergency Response Hotline</p>
                <a href="tel:6361611986" className="btn btn-danger w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <FaAmbulance /> AMBULANCE: 6361611986
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="search-overlay-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="close-search-overlay" onClick={() => setIsSearchOpen(false)} aria-label="Close Search">
              <FaTimes size={30} />
            </button>
            <div className="search-form-wrapper">
              <h2 className="text-white text-center mb-4">Search SAINIK Roster & Services</h2>
              <form onSubmit={handleSearchSubmit} className="search-fullscreen-form">
                <input 
                  type="text" 
                  autoFocus 
                  placeholder="Enter doctor's name, specialization, or department..." 
                  className="search-fullscreen-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-fullscreen-submit" aria-label="Submit Search">
                  <FaSearch size={24} />
                </button>
              </form>
              <p className="text-center mt-3 text-white-50">Press Enter or click search to search doctors directory.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

