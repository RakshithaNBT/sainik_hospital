import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaChevronRight, FaPlus, FaMinus } from 'react-icons/fa';
import Hero from '../components/Hero/Hero';
import DepartmentCard from '../components/DepartmentCard/DepartmentCard';
import DoctorCard from '../components/DoctorCard/DoctorCard';
import Counter from '../components/Counter/Counter';
import EmergencyCTA from '../components/CTA/EmergencyCTA';
import Testimonials from '../components/Testimonials/Testimonials';
import Gallery from '../components/Gallery/Gallery';
import BlogSection from '../components/BlogSection/BlogSection';
import { departments, doctors, faqs, healthPackages } from '../utils/dummyData';

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleReadMoreDept = (dept) => {
    navigate(`/departments?id=${dept.id}`);
  };

  const handleViewDocProfile = (doc) => {
    navigate(`/doctors?id=${doc.id}`);
  };

  return (
    <div className="home-page-container">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Key Counter Stats Section */}
      <section className="counter-stats-section py-5 bg-white border-bottom">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="counter-item-card p-3">
                <div className="counter-number-wrapper">
                  <Counter target={24} suffix="/7" />
                </div>
                <h5 className="counter-label-text">Ambulance Facilities</h5>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-item-card p-3">
                <div className="counter-number-wrapper">
                  <Counter target={24} suffix="/7" />
                </div>
                <h5 className="counter-label-text">Pharmacy Services</h5>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-item-card p-3">
                <div className="counter-number-wrapper">
                  <Counter target={50} suffix="+" />
                </div>
                <h5 className="counter-label-text">Specialized Doctors</h5>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="counter-item-card p-3">
                <div className="counter-number-wrapper">
                  <Counter target={24} suffix="/7" />
                </div>
                <h5 className="counter-label-text">Emergency Trauma Unit</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About SAINIK Hospital Overview */}
      <section className="section-padding bg-gradient-sainik-light">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 text-start">
              <span className="section-subtitle">About SAINIK Hospital</span>
              <h2 className="section-title text-gradient-green">Redefining Multi-Speciality Clinical Excellence</h2>
              <p className="text-dark lead mb-4">
                SAINIK Multi-Speciality Hospital is built on a foundation of medical precision, cutting-edge technology, and patient-centered empathy.
              </p>
              <p className="text-muted mb-4">
                With NABL-accredited diagnostic labs, laminar-flow ultra-clean surgical suites, Level-III NICU facilities, and 24/7 cardiac emergency dispatch, SAINIK Hospital ensures every patient receives rapid, top-tier clinical care.
              </p>
              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <FaCheckCircle className="text-success" size={20} />
                    <span className="fw-semibold">NABL Standards</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <FaCheckCircle className="text-success" size={20} />
                    <span className="fw-semibold">Laparoscopic Surgery</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <FaCheckCircle className="text-success" size={20} />
                    <span className="fw-semibold">24/7 ACLS Ambulances</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <FaCheckCircle className="text-success" size={20} />
                    <span className="fw-semibold">Cashless TPA Insurance</span>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn-premium-primary">
                Learn More About Us <FaChevronRight size={12} />
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="about-image-stack position-relative p-2">
                <img
                  src="/banner/sainik-building-banner.png"
                  alt="SAINIK Multi-Speciality Hospital Main Building"
                  className="img-fluid rounded-4 shadow-lg w-100 about-building-portrait-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Departments / Specialties Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Clinical Specialties</span>
            <h2 className="section-title text-gradient-green">Comprehensive Medical Care</h2>
            <p className="text-muted max-width-600 mx-auto">
              Our multidisciplinary clinical departments combine world-renowned specialists with advanced diagnostic tech to deliver optimal patient outcomes.
            </p>
          </div>
          <div className="row g-4">
            {departments.slice(0, 6).map((dept) => (
              <div key={dept.id} className="col-lg-4 col-md-6">
                <DepartmentCard department={dept} onReadMore={handleReadMoreDept} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/departments" className="btn-premium-secondary">
              View All Departments <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Doctors Directory Preview */}
      <section className="section-padding bg-gradient-sainik-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Medical Roster</span>
            <h2 className="section-title text-gradient-green">Meet Our Leading Specialists</h2>
            <p className="text-muted max-width-600 mx-auto">
              Our doctors are leaders in interventional cardiology, robotic orthopaedics, neonatal critical care, and minimally invasive surgery.
            </p>
          </div>
          <div className="row g-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="col-lg-4 col-md-6">
                <DoctorCard doctor={doc} onViewProfile={handleViewDocProfile} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/doctors" className="btn-premium-primary">
              View Full Doctor Directory <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Health Packages Strip */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Preventive Care</span>
            <h2 className="section-title text-gradient-green">Featured Health Checkup Packages</h2>
            <p className="text-muted max-width-600 mx-auto">
              Proactive health monitoring helps detect illness before symptoms surface. Explore our curated checkup bundles.
            </p>
          </div>
          <div className="row g-4">
            {healthPackages.map((pkg) => (
              <div key={pkg.id} className="col-lg-4 col-md-6 text-start">
                <div className="health-package-card glass-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill">Comprehensive</span>
                      <h3 className="fw-bold text-success mb-0">{pkg.price}</h3>
                    </div>
                    <h4 className="fw-bold mb-2">{pkg.name}</h4>
                    <p className="text-muted small mb-4">{pkg.description}</p>
                    <ul className="list-unstyled mb-4">
                      {pkg.tests.slice(0, 5).map((test, i) => (
                        <li key={i} className="mb-2 d-flex align-items-center gap-2 small">
                          <FaCheckCircle className="text-success flex-shrink-0" />
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/services" className="btn-premium-primary w-100 justify-content-center text-center">
                    Book Health Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Emergency CTA Strip */}
      <EmergencyCTA />

      {/* 8. Health Blog Section */}
      <BlogSection />

      {/* 9. Patient Testimonials */}
      <Testimonials />

      {/* 9. Hospital Photo Gallery Preview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Hospital Tour</span>
            <h2 className="section-title text-gradient-green">State-of-the-Art Facilities Gallery</h2>
          </div>
          <Gallery limit={4} />
          <div className="text-center mt-4">
            <Link to="/gallery" className="btn-premium-secondary">
              View Full Gallery <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions (FAQ) Accordion */}
      <section className="section-padding bg-gradient-sainik-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Help & Queries</span>
            <h2 className="section-title text-gradient-green">Frequently Asked Questions</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-start">
              <div className="accordion-custom">
                {faqs.map((faq, index) => (
                  <div key={faq.id} className="accordion-item-custom glass-card mb-3 p-3">
                    <div
                      className="accordion-header-custom d-flex justify-content-between align-items-center"
                      onClick={() => toggleFaq(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <h5 className="fw-bold mb-0 text-dark">{faq.question}</h5>
                      <span className="text-success">
                        {activeFaq === index ? <FaMinus /> : <FaPlus />}
                      </span>
                    </div>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="accordion-body-custom mt-3 text-muted border-top pt-3"
                        >
                          <p className="mb-0">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Home;
