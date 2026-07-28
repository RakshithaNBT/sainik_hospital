import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <div className="hospital-loader-overlay">
      <div className="loader-content-wrapper text-center">
        {/* Animated Beating Medical Cross SVG */}
        <motion.div
          className="loader-svg-box mb-4"
          animate={{
            scale: [1, 1.15, 1, 1.15, 1],
            rotate: [0, 0, 15, -15, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/sainik-logo.jpg" 
            alt="SAINIK Hospital Official Emblem" 
            style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '50%', boxShadow: '0 4px 20px rgba(82, 183, 136, 0.4)' }} 
          />
        </motion.div>

        {/* Text Fade and Track */}
        <motion.h3 
          className="loader-brand-title fw-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          SAINIK HOSPITAL
        </motion.h3>
        <p className="loader-brand-subtitle text-uppercase text-muted">Securing Your Health</p>
        
        {/* Progress Bar line */}
        <div className="loader-progress-bar-bg mt-3 mx-auto">
          <motion.div 
            className="loader-progress-bar-fill"
            animate={{ left: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
