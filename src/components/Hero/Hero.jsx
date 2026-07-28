import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { FaCalendarCheck, FaAmbulance, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { doctors, departments } from '../../utils/dummyData';
import CustomSelect from '../CustomSelect/CustomSelect';
import './Hero.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    time: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        doctor: '',
        date: '',
        time: ''
      });
    }, 4000);
  };

  const slidesData = [
    {
      id: 1,
      image: "/banner/sainik-building-banner.png",
      subtitle: "Welcome to SAINIK Multi-Speciality Hospital",
      title: "Advanced Healthcare, Compassionate Healing",
      desc: "SAINIK is dedicated to delivering premium, NABL-certified, and patient-centric healthcare solutions, backed by top clinical expertise and 24/7 emergency services.",
    },
    {
      id: 2,
      image: "/banner/sainik-reception-banner.jpg",
      subtitle: "State-of-the-Art Hospital & Reception",
      title: "Pioneers in Advanced Clinical Care & Comfort",
      desc: "Our ultramodern facility combines world-class clinical standards with absolute patient comfort, spacious waiting lounges, and complete medical support.",
    }
  ];

  return (
    <>
      <section className="hero-swiper-section">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect={'fade'}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="hero-swiper"
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide-item" style={{ backgroundImage: `linear-gradient(rgba(13, 58, 39, 0.55), rgba(0, 0, 0, 0.70)), url(${slide.image})` }}>
                <div className="container h-100 d-flex align-items-center">
                  <div className="hero-text-content text-start">
                    <motion.span 
                      className="hero-badge"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {slide.subtitle}
                    </motion.span>
                    <motion.h1 
                      className="hero-title text-white"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      className="hero-desc text-white-50"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                    >
                      {slide.desc}
                    </motion.p>
                    <motion.div 
                      className="hero-action-buttons d-flex flex-wrap gap-3"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 }}
                    >
                      <button onClick={() => setShowModal(true)} className="btn-premium-primary">
                        <FaCalendarCheck /> Book Appointment
                      </button>
                      <a href="tel:6361611986" className="btn-premium-emergency">
                        <FaAmbulance /> Emergency: 6361611986
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Appointment Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="appointment-modal-overlay" onClick={() => setShowModal(false)}>
            <motion.div 
              className="appointment-modal-content glass-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <button className="modal-close-x" onClick={() => setShowModal(false)} aria-label="Close modal">
                <FaTimes size={20} />
              </button>

              {submitSuccess ? (
                <div className="submit-success-view text-center py-4">
                  <div className="success-pulse-ring mx-auto mb-4">✓</div>
                  <h3 className="text-gradient-green fw-bold">Appointment Confirmed!</h3>
                  <p className="mt-2 text-dark fw-semibold">SAINIK Central Desk has scheduled your visit.</p>
                  <div className="confirm-summary-box text-start mt-3">
                    <p><strong>Patient Name:</strong> {formData.name}</p>
                    <p><strong>Department:</strong> {formData.department || 'General Medicine'}</p>
                    <p><strong>Date & Time:</strong> {formData.date} at {formData.time || '10:00 AM'}</p>
                  </div>
                  <p className="text-muted small mt-4">A confirmation SMS and Email outline has been sent.</p>
                </div>
              ) : (
                <div className="modal-form-view">
                  <div className="modal-header-block mb-4 text-center">
                    <h3 className="text-gradient-green fw-bold mb-1">Schedule Appointment</h3>
                    <p className="text-muted small">Select your slot. SAINIK desk will call back within 10 minutes.</p>
                  </div>
                  
                  <form onSubmit={handleFormSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          className="form-control text-dark bg-white" 
                          required 
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          className="form-control text-dark bg-white" 
                          required 
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          className="form-control text-dark bg-white" 
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Department *</label>
                        <CustomSelect 
                          name="department" 
                          required
                          value={formData.department}
                          placeholder="Choose Specialty..."
                          options={departments.map(d => ({ value: d.name, label: d.name }))}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Doctor *</label>
                        <CustomSelect 
                          name="doctor" 
                          required
                          value={formData.doctor}
                          placeholder="Select Doctor..."
                          options={doctors.map(doc => ({ value: doc.name, label: `${doc.name} - ${doc.specialization}` }))}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Select Date *</label>
                        <input 
                          type="date" 
                          name="date" 
                          className="form-control text-dark bg-white" 
                          required 
                          value={formData.date}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Preferred Time *</label>
                        <input 
                          type="time" 
                          name="time" 
                          className="form-control text-dark bg-white" 
                          required 
                          value={formData.time}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-premium-primary w-100 justify-content-center py-3 mt-4">
                      Submit Appointment Request
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;

