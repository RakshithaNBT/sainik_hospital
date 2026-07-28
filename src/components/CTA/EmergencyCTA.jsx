import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import './EmergencyCTA.css';

const EmergencyCTA = () => {
  return (
    <section className="emergency-cta-banner-strip bg-gradient-sainik text-white py-5">
      <div className="container">
        <div className="row align-items-center py-2 text-start">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="er-pulse-indicator"></span>
              <span className="er-strip-badge text-uppercase fw-bold">24/7 Trauma Emergency</span>
            </div>
            <h2 className="er-strip-title text-white fw-bold mb-2">In Case of Medical Emergency, Call Us Immediately</h2>
            <p className="er-strip-desc text-white-50 mb-0">
              Our Advanced Life Support ambulances are stationed strategically across the region. Call now for instant dispatch and high-priority critical care routing.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end d-flex flex-column sm-flex-row gap-3">
            <a 
              href="https://wa.me/916361611986?text=Hi%20SAINIK%20Hospital,%20I%20have%20an%20emergency%20inquiry." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-emergency-action call-action"
            >
              <FaWhatsapp size={20} /> 6361611986
            </a>
            <a href="tel:7337668946" className="btn-emergency-action call-action">
              <FaPhoneAlt /> 7337668946
            </a>
            <a 
              href="https://maps.google.com/?q=Sainik+Multi+Speciality+Hospital+Mysore" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-emergency-action route-action"
            >
              <FaMapMarkerAlt /> Get Location Route
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCTA;

