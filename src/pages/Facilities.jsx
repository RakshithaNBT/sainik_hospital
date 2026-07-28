import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPhoneAlt, FaMicroscope, FaNotesMedical, FaPills } from 'react-icons/fa';
import { hospitalFacilities } from '../utils/dummyData';
import EmergencyCTA from '../components/CTA/EmergencyCTA';
import { getPublicUrl } from '../utils/publicUrl';

const Facilities = () => {
  const allServicesList = [
    "General Medicine",
    "General Surgery",
    "Orthopaedic & Joint Care",
    "Gynaecology & Obstetrics",
    "Cardiology",
    "ENT (Ear, Nose, Throat)",
    "Neurology",
    "Gastro Science",
    "Urology",
    "Nephrology",
    "Pulmonology",
    "Plastics & Cosmetics Surgery",
    "Dermatology",
    "Psychiatry",
    "Oncology",
    "Thoracic Surgery",
    "Vascular Surgery",
    "Dialysis Unit",
    "Neonatal Intensive Care Unit (NICU)",
    "Intensive Care Unit (ICU)",
    "Radiology Service (MRI, CT, USG, X-Ray)",
    "24x7 In-House Pharmacy",
    "Facio Maxillary Surgery",
    "Physiotherapy & Rehab",
    "24x7 Automated Lab Services",
    "Health Checkup Packages & Corporate Health Check",
    "24/7 ACLS Ambulance Service"
  ];

  return (
    <div className="facilities-page-wrapper">
      {/* Banner */}
      <section className="bg-gradient-sainik text-white page-header-banner">
        <div className="container py-4 text-start">
          <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">Hospital Facilities & Services</span>
          <h1 className="display-4 fw-bold text-white mb-3">Treatments, Infrastructure & 24/7 Emergency Care</h1>
          <p className="lead text-white-50 max-width-700">
            SAINIK Multi-Speciality Hospital Mysuru is built to international healthcare standards, featuring advanced ICUs, NABL-accredited diagnostic labs, and round-the-clock critical rescue.
          </p>
        </div>
      </section>

      {/* Featured Infrastructure Facilities */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-start mb-5">
            <span className="badge bg-success-subtle text-success text-uppercase fw-bold px-3 py-2 rounded-pill mb-2">
              Advanced Infrastructure
            </span>
            <h2 className="fw-bold text-dark display-5">Key Hospital Facilities</h2>
            <p className="text-muted lead">Explore our state-of-the-art diagnostic, surgical, and emergency units.</p>
          </div>

          <div className="row g-4 text-start">
            {hospitalFacilities.map((facility) => (
              <div key={facility.id} className="col-lg-6">
                <motion.div 
                  className="glass-card overflow-hidden h-100 d-flex flex-column flex-sm-row"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={getPublicUrl(facility.image)} 
                    alt={facility.title} 
                    className="facility-card-img" 
                    style={{ width: '100%', maxWidth: '210px', objectFit: 'cover' }} 
                  />
                  <div className="p-4 d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-success text-uppercase small px-2 py-1">{facility.badge}</span>
                      <span className="text-muted small fw-semibold">{facility.category}</span>
                    </div>
                    <h4 className="fw-bold mb-2 text-dark">{facility.title}</h4>
                    <p className="text-muted small mb-0">{facility.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Always At Your Service 24x7 Banner Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #2C3A1A 0%, #3B4E23 60%, #5E7D37 100%)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge px-4 py-2 rounded-pill mb-3 d-inline-block fw-bold" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', letterSpacing: '2px', fontSize: '0.75rem' }}>
              ALWAYS AT YOUR SERVICE
            </span>
            <h2 className="fw-bold text-white display-5 mb-2">24x7 <span style={{ color: '#a8c96c' }}>Round-the-Clock</span> Services</h2>
            <p className="text-white-50 lead">Available every hour of the day, every day of the year.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {/* Lab Services */}
            <div className="col-lg-4 col-md-6">
              <motion.div
                className="text-center p-5 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: 80, height: 80, background: 'rgba(168,201,108,0.2)', border: '2px solid rgba(168,201,108,0.5)' }}>
                  <FaMicroscope size={36} color="#a8c96c" />
                </div>
                <span className="badge rounded-pill px-3 py-1 mb-3 fw-bold" style={{ background: '#a8c96c', color: '#1a2a0a', fontSize: '0.7rem' }}>DIAGNOSTICS 24x7</span>
                <h4 className="fw-bold text-white mb-2">24x7 Lab Services</h4>
                <p className="text-white-50 mb-0">NABL-compliant automated pathology, biochemistry, microbiology, hematology &amp; hormone assays — results anytime.</p>
              </motion.div>
            </div>
            {/* Health Checkup */}
            <div className="col-lg-4 col-md-6">
              <motion.div
                className="text-center p-5 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: 80, height: 80, background: 'rgba(168,201,108,0.2)', border: '2px solid rgba(168,201,108,0.5)' }}>
                  <FaNotesMedical size={36} color="#a8c96c" />
                </div>
                <span className="badge rounded-pill px-3 py-1 mb-3 fw-bold" style={{ background: '#a8c96c', color: '#1a2a0a', fontSize: '0.7rem' }}>PREVENTIVE CARE</span>
                <h4 className="fw-bold text-white mb-2">Health Checkup Packages</h4>
                <p className="text-white-50 mb-0">Individual, family &amp; Corporate Health Check packages — cardiac, executive whole-body, and women wellness profiles.</p>
              </motion.div>
            </div>
            {/* Pharmacy */}
            <div className="col-lg-4 col-md-6">
              <motion.div
                className="text-center p-5 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: 80, height: 80, background: 'rgba(168,201,108,0.2)', border: '2px solid rgba(168,201,108,0.5)' }}>
                  <FaPills size={36} color="#a8c96c" />
                </div>
                <span className="badge rounded-pill px-3 py-1 mb-3 fw-bold" style={{ background: '#a8c96c', color: '#1a2a0a', fontSize: '0.7rem' }}>PHARMACY 24x7</span>
                <h4 className="fw-bold text-white mb-2">24x7 Pharmacy</h4>
                <p className="text-white-50 mb-0">In-house pharmacy stocked with genuine prescription medicines, vaccines, cardiac life-saving drugs &amp; surgical supplies.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Official Treatments & Services List */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="glass-card p-5 text-start border-success">
            <div className="row align-items-center mb-4">
              <div className="col-md-8">
                <span className="badge bg-success text-uppercase px-3 py-2 rounded-pill mb-2">Official Directory</span>
                <h2 className="fw-bold text-success display-5">All Treatments & Clinical Services Offered</h2>
                <p className="text-muted lead mb-0">
                  Comprehensive 27 multi-speciality clinical services and diagnostic setups available at SAINIK Hospital Mysuru.
                </p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <a href="tel:6361611986" className="btn-premium-primary d-inline-flex align-items-center gap-2 px-4 py-3">
                  <FaPhoneAlt /> Call Desk: 6361611986
                </a>
              </div>
            </div>

            <hr className="my-4" />

            <div className="row g-3">
              {allServicesList.map((service, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <div className="p-3 bg-white rounded-3 shadow-sm d-flex align-items-center gap-3 border h-100">
                    <FaCheckCircle className="text-success flex-shrink-0" size={20} />
                    <span className="fw-semibold text-dark">{service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EmergencyCTA />
    </div>
  );
};

export default Facilities;
