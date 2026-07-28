import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaExclamationTriangle, FaTimes, FaAmbulance, FaHeartbeat } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingActions.css';

const FloatingActions = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const toggleModal = () => setShowEmergencyModal(!showEmergencyModal);

  return (
    <>
      <div className="floating-actions-container">
        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/916361611986?text=Hi%20SAINIK%20Hospital,%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-action-btn whatsapp"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaWhatsapp size={22} />
          <span className="tooltip-text">WhatsApp Chat</span>
        </motion.a>

        {/* Emergency SOS Button */}
        <motion.button
          onClick={toggleModal}
          className="floating-action-btn emergency"
          aria-label="Emergency SOS Info"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FaExclamationTriangle className="alert-blink-icon" size={18} />
          <span className="tooltip-text">EMERGENCY SOS</span>
        </motion.button>
      </div>

      {/* Emergency Modal */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="emergency-modal-overlay" onClick={toggleModal}>
            <motion.div
              className="emergency-modal-content glass-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              <button className="close-modal-btn" onClick={toggleModal} aria-label="Close modal">
                <FaTimes size={20} />
              </button>

              <div className="emergency-header">
                <FaAmbulance className="emergency-header-icon" />
                <h2>24/7 EMERGENCY HELPLINE</h2>
                <p>SAINIK Multi-Speciality Critical Response Unit</p>
              </div>

              <div className="emergency-body">
                <div className="emergency-alert-box">
                  <FaHeartbeat className="heart-pulse-icon" />
                  <div>
                    <strong>Golden Hour Care:</strong> Our trauma team is ready 24/7. Critical care specialists are on stand-by immediately upon dispatch.
                  </div>
                </div>

                <div className="emergency-contacts">
                  <div className="contact-item">
                    <span>Ambulance Hotline 1</span>
                    <a href="tel:6361611986" className="contact-number">6361611986</a>
                  </div>
                  <div className="contact-item">
                    <span>Ambulance Hotline 2</span>
                    <a href="tel:7337668946" className="contact-number">7337668946</a>
                  </div>
                  <div className="contact-item">
                    <span>General OPD Desk</span>
                    <a href="tel:7022630692" className="contact-number">7022630692</a>
                  </div>
                </div>

                <div className="emergency-action-bar">
                  <a href="tel:6361611986" className="btn-emergency-call">
                    <FaPhoneAlt /> CALL AMBULANCE NOW
                  </a>
                  <button className="btn-close-text" onClick={toggleModal}>
                    Dismiss Emergency Info
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActions;

