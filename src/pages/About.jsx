import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaEye, FaBullseye, FaAward, FaHeartbeat, FaCheckCircle, FaUserCheck, FaMicroscope } from 'react-icons/fa';
import EmergencyCTA from '../components/CTA/EmergencyCTA';

const About = () => {
  return (
    <div className="about-page-wrapper">
      {/* Page Header */}
      <section className="bg-gradient-sainik text-white page-header-banner">
        <div className="container py-4 text-start">
          <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">About Us</span>
          <h1 className="display-4 fw-bold text-white mb-3">Healing Hands, Caring Hearts</h1>
          <p className="lead text-white-50 max-width-700">
            SAINIK Multi-Speciality Hospital represents a benchmark in patient care, advanced surgical procedures, and compassionate healthcare management in India.
          </p>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-4 text-start">
            <div className="col-md-4">
              <motion.div
                className="glass-card p-4 h-100"
                whileHover={{ y: -5 }}
              >
                <div className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3">
                  <FaEye size={28} />
                </div>
                <h3 className="fw-bold mb-3">Our Vision</h3>
                <p className="text-muted mb-0 lead fw-semibold text-success">
                  &ldquo;Better Health for a Better World&rdquo;
                </p>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div
                className="glass-card p-4 h-100"
                whileHover={{ y: -5 }}
              >
                <div className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3">
                  <FaBullseye size={28} />
                </div>
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <p className="text-muted mb-0">
                  To deliver quality healthcare in a healthy environment
                </p>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div
                className="glass-card p-4 h-100"
                whileHover={{ y: -5 }}
              >
                <div className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3">
                  <FaShieldAlt size={28} />
                </div>
                <h3 className="fw-bold mb-3">Our Objectives</h3>
                <ul className="text-muted text-start ps-3 mb-0 small" style={{ lineHeight: '1.6' }}>
                  <li className="mb-2">To impart education by providing a conducive environment for learning</li>
                  <li className="mb-2">To deliver quality healthcare</li>
                  <li>To develop, improvise, customize technologies and teaching methodologies</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Story & Journey */}
      <section className="section-padding bg-gradient-sainik-light">
        <div className="container">
          <div className="row align-items-center gy-4 text-start">
            <div className="col-lg-6">
              <img
                src="/modular-ot.jpg"
                alt="Modular Operation Theatre"
                className="img-fluid rounded-4 shadow-lg w-100"
              />
            </div>
            <div className="col-lg-6">
              <span className="section-subtitle">Our History</span>
              <h2 className="section-title text-gradient-green">Quarter Century of Clinical Leadership</h2>
              <p className="text-dark mb-3">
                Established with a vision to make tertiary clinical care accessible, SAINIK Multi-Speciality Hospital has grown into a 300+ bed institution featuring cutting-edge modular OTs, Level-III NICU, and 24/7 Trauma Emergency centers.
              </p>
              <p className="text-muted mb-4">
                Our surgical teams have pioneered advanced joint replacements, minimal access laparoscopy, and acute stroke management units. Every floor and facility is designed to reduce infection risk and foster rapid recovery.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 bg-white rounded-3 shadow-sm">
                    <h3 className="fw-bold text-success mb-1">100+</h3>
                    <span className="text-muted small">Inpatient Beds</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-white rounded-3 shadow-sm">
                    <h3 className="fw-bold text-success mb-1">12</h3>
                    <span className="text-muted small">Modular OTs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations & Quality Policy */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Accreditations</span>
            <h2 className="section-title text-gradient-green">Recognized Standards of Quality</h2>
          </div>
          <div className="row g-4 text-start">
            <div className="col-md-3 col-sm-6">
              <div className="glass-card p-4 text-center h-100">
                <FaAward className="text-success mb-3" size={40} />
                <h5 className="fw-bold">NABL Certified</h5>
                <p className="text-muted small mb-0">Pathology & diagnostic lab precision accreditation.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="glass-card p-4 text-center h-100">
                <FaShieldAlt className="text-success mb-3" size={40} />
                <h5 className="fw-bold">NABH Standards</h5>
                <p className="text-muted small mb-0">High-level hospital safety and clinical protocols.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="glass-card p-4 text-center h-100">
                <FaUserCheck className="text-success mb-3" size={40} />
                <h5 className="fw-bold">Cashless TPAs</h5>
                <p className="text-muted small mb-0">Empaneled with 40+ national health insurance providers.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="glass-card p-4 text-center h-100">
                <FaMicroscope className="text-success mb-3" size={40} />
                <h5 className="fw-bold">Laparoscopic OT</h5>
                <p className="text-muted small mb-0">State-of-the-art navigation and minimally invasive tech.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmergencyCTA />
    </div>
  );
};

export default About;
