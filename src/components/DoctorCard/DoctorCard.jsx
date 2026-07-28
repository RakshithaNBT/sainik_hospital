import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './DoctorCard.css';

const DoctorCard = ({ doctor, onViewProfile }) => {
  const { id, name, qualification, experience, specialization, image, timings } = doctor;
  const navigate = useNavigate();

  const handleClick = () => {
    if (onViewProfile) {
      onViewProfile(doctor);
    } else {
      navigate(`/doctors?id=${id}`);
    }
  };

  return (
    <motion.div 
      className="hospital-doctor-card glass-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="doc-image-wrapper">
        <img src={image} alt={name} className="doc-img" loading="lazy" />
        <div className="doc-experience-badge">
          {experience}
        </div>
      </div>
      
      <div className="doc-card-body text-start">
        <span className="doc-specialty-tag text-uppercase">{specialization}</span>
        <h4 className="doc-card-name">{name}</h4>
        
        <div className="doc-meta-item mb-2">
          <FaGraduationCap className="meta-icon text-success" />
          <span className="doc-qualification">{qualification}</span>
        </div>
        
        <div className="doc-meta-item mb-3">
          <FaCalendarAlt className="meta-icon text-success" />
          <span className="doc-timings">{timings}</span>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); handleClick(); }} 
          className="btn-premium-primary btn-sm w-100 justify-content-center py-2 text-center"
          aria-label={`View profile details of ${name}`}
        >
          View Full Profile Details &rarr;
        </button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
