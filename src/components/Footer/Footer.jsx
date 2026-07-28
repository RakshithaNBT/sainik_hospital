import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaArrowRight } from 'react-icons/fa';
import { departments } from '../../utils/dummyData';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="hospital-footer-dark">
      {/* Main Footer Links */}
      <div className="footer-links-grid-wrapper">
        <div className="container">
          <div className="row gy-5">
            {/* Column 1: Brand & Bio */}
            <div className="col-lg-4 col-md-6 text-start">
              <Link 
                to="/" 
                className="footer-brand mb-4 d-flex align-items-center text-decoration-none"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Return to Home Page"
              >
                <img 
                  src="/sainik-logo.jpg" 
                  alt="SAINIK Hospital Official Emblem" 
                  className="sainik-logo-img me-2" 
                  style={{ height: '55px', width: '55px', objectFit: 'contain', borderRadius: '50%' }} 
                />
                <div>
                  <span className="logo-title text-white d-block fw-bold">SAINIK</span>
                  <span className="text-white-50 small text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>MULTI-SPECIALITY HOSPITAL</span>
                </div>
              </Link>
              <p className="footer-bio mb-4 text-white-50">
                SAINIK Multi-Speciality Hospital is dedicated to delivering premium, compassionate, patient-centric clinical healthcare using state-of-the-art medical advancements.
              </p>
              <div className="social-links-wrapper d-flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Twitter"><FaTwitter /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="LinkedIn"><FaLinkedinIn /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Youtube"><FaYoutube /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-lg-2 col-md-6 text-start">
              <h4 className="footer-col-title text-white mb-4">Quick Links</h4>
              <ul className="footer-links-list">
                <li><Link to="/"><FaArrowRight size={10} className="me-2 text-success" /> Home</Link></li>
                <li><Link to="/about"><FaArrowRight size={10} className="me-2 text-success" /> About Us</Link></li>
                <li><Link to="/doctors"><FaArrowRight size={10} className="me-2 text-success" /> Doctors</Link></li>
                <li><Link to="/facilities"><FaArrowRight size={10} className="me-2 text-success" /> Facilities</Link></li>
                <li><Link to="/services"><FaArrowRight size={10} className="me-2 text-success" /> Health Services</Link></li>
                <li><Link to="/gallery"><FaArrowRight size={10} className="me-2 text-success" /> Hospital Gallery</Link></li>
                <li><Link to="/blog"><FaArrowRight size={10} className="me-2 text-success" /> Health Blog</Link></li>
                <li><Link to="/contact"><FaArrowRight size={10} className="me-2 text-success" /> Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Top Departments */}
            <div className="col-lg-3 col-md-6 text-start">
              <h4 className="footer-col-title text-white mb-4">Key Specialties</h4>
              <ul className="footer-links-list">
                {departments.slice(0, 6).map((dept) => (
                  <li key={dept.id}>
                    <Link to={`/departments?id=${dept.id}`}>
                      <FaArrowRight size={10} className="me-2 text-success" /> {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact info */}
            <div className="col-lg-3 col-md-6 text-start">
              <h4 className="footer-col-title text-white mb-4">Contact Info</h4>
              <ul className="footer-contacts-list">
                <li>
                  <FaMapMarkerAlt className="icon text-success" />
                  <span>CA-03, E & F Block, Dakshineshwara Road, Ramakrishna Nagar, Near Andolana Circle, Mysuru, Karnataka 570023</span>
                </li>
                <li>
                  <FaPhoneAlt className="icon text-success" />
                  <span>
                    Emergency: <a href="tel:6361611986" className="fw-bold text-danger">6361611986</a> / <a href="tel:7337668946" className="fw-bold text-danger">7337668946</a><br />
                    Desk: <a href="tel:6361611986" className="text-white-50">6361611986</a> / <a href="tel:7022630692" className="text-white-50">7022630692</a>
                  </span>
                </li>
                <li>
                  <FaEnvelope className="icon text-success" />
                  <span>
                    <a href="mailto:appointments@sainikhospital.com" className="text-white-50">appointments@sainikhospital.com</a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="footer-bottom-copyright">
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6 mb-3 mb-md-0 text-white-50">
              &copy; {new Date().getFullYear()} SAINIK Multi-Speciality Hospital. All rights reserved.
            </div>
            <div className="col-md-6 text-md-end footer-bottom-links">
              <Link to="/privacy-policy" className="me-3">Privacy Policy</Link>
              <Link to="/terms-conditions">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

