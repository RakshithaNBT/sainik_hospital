import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaLaptopMedical, FaVial, FaAmbulance, FaShieldAlt, FaTimes } from 'react-icons/fa';
import { healthPackages } from '../utils/dummyData';
import EmergencyCTA from '../components/CTA/EmergencyCTA';

const Services = () => {
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const handlePackageSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedPkg(null);
      setBookingSuccess(false);
      setPatientName('');
      setPatientPhone('');
    }, 4000);
  };

  const servicesOverview = [
    {
      id: 1,
      title: "Home Sample Collection",
      icon: FaVial,
      desc: "Our lab technicians collect blood & urine samples from your doorstep with cold-chain storage and instant digital reports."
    },
    {
      id: 2,
      title: "Tele-Consultation & Online OPD",
      icon: FaLaptopMedical,
      desc: "Consult our senior specialists remotely via high-definition video conferencing from the safety of your home."
    },
    {
      id: 3,
      title: "24/7 ACLS Emergency Pickup",
      icon: FaAmbulance,
      desc: "GPS-enabled ICU ambulances with paramedic teams available for immediate emergency rescue within 15 minutes."
    },
    {
      id: 4,
      title: "Cashless TPA Insurance Desk",
      icon: FaShieldAlt,
      desc: "Instant pre-authorization support for 40+ national health insurance providers and corporate empaneled schemes."
    }
  ];

  return (
    <div className="services-page-wrapper">
      {/* Header Banner */}
      <section className="bg-gradient-sainik text-white page-header-banner">
        <div className="container py-4 text-start">
          <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">Health & Preventive Care</span>
          <h1 className="display-4 fw-bold text-white mb-3">Preventive Health Checkups & Patient Services</h1>
          <p className="lead text-white-50 max-width-700">
            Proactive health evaluations and specialized patient care services designed to ensure total family wellness.
          </p>
        </div>
      </section>

      {/* Specialty Patient Services */}
      <section className="section-padding bg-gradient-sainik-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Specialized Care</span>
            <h2 className="section-title text-gradient-green">Patient Care Services</h2>
          </div>
          <div className="row g-4 text-start">
            {servicesOverview.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div key={srv.id} className="col-lg-3 col-md-6">
                  <div className="glass-card p-4 h-100">
                    <div className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3">
                      <IconComp size={28} />
                    </div>
                    <h4 className="fw-bold mb-2">{srv.title}</h4>
                    <p className="text-muted small mb-0">{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Health Checkup Packages */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Comprehensive Checkups</span>
            <h2 className="section-title text-gradient-green">Curated Preventive Health Packages</h2>
          </div>
          <div className="row g-4 text-start">
            {healthPackages.map((pkg) => (
              <div key={pkg.id} className="col-lg-4 col-md-6">
                <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill">Popular</span>
                      <h3 className="fw-bold text-success mb-0">{pkg.price}</h3>
                    </div>
                    <h4 className="fw-bold mb-2">{pkg.name}</h4>
                    <p className="text-muted small mb-4">{pkg.description}</p>
                    <h6 className="fw-bold mb-2">Tests & Consultations Included:</h6>
                    <ul className="list-unstyled mb-4">
                      {pkg.tests.map((test, i) => (
                        <li key={i} className="mb-2 d-flex align-items-center gap-2 small">
                          <FaCheckCircle className="text-success flex-shrink-0" />
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => setSelectedPkg(pkg)} 
                    className="btn-premium-primary w-100 justify-content-center text-center py-3"
                  >
                    <span className="d-block text-center">
                      {pkg.name.includes("Checkup") ? (
                        <>
                          Book {pkg.name.replace(" Checkup", "")}
                          <br />
                          Checkup
                        </>
                      ) : pkg.name.includes("Package") ? (
                        <>
                          Book {pkg.name.replace(" Package", "")}
                          <br />
                          Package
                        </>
                      ) : (
                        `Book ${pkg.name}`
                      )}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Booking Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <div className="appointment-modal-overlay" onClick={() => setSelectedPkg(null)}>
            <motion.div 
              className="appointment-modal-content glass-card p-4 text-start"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button className="modal-close-x" onClick={() => setSelectedPkg(null)}>
                <FaTimes size={20} />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-4">
                  <div className="success-pulse-ring mx-auto mb-3">✓</div>
                  <h3 className="text-gradient-green fw-bold">Package Booked!</h3>
                  <p className="text-muted">Our health checkup coordinator will call you to confirm your preferred slot.</p>
                </div>
              ) : (
                <div>
                  <h3 className="fw-bold text-success mb-1">Book Health Package</h3>
                  <p className="text-muted small mb-4">{selectedPkg.name} ({selectedPkg.price})</p>

                  <form onSubmit={handlePackageSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control text-dark bg-white" 
                        required 
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        className="form-control text-dark bg-white" 
                        required 
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn-premium-primary w-100 justify-content-center py-3 mt-3">
                      Confirm Package Reservation
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <EmergencyCTA />
    </div>
  );
};

export default Services;
