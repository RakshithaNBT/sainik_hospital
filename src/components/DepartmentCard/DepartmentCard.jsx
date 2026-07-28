import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { getPublicUrl } from '../../utils/publicUrl';
import './DepartmentCard.css';

const DepartmentCard = ({ department, onReadMore }) => {
  const { id, name, icon, image, shortDescription } = department;
  const navigate = useNavigate();
  
  // Dynamic motion values for mouse coordinates (0 to 1 scale)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map position to degree of rotation (-12 to 12 degrees)
  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 250, damping: 25 });

  // Resolve React Icons dynamically
  const IconComponent = FaIcons[icon] || FaIcons.FaStethoscope;

  const handleClick = () => {
    if (onReadMore) {
      onReadMore(department);
    } else {
      navigate(`/departments?id=${id}`);
    }
  };

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: '1000px', height: '100%' }}>
      <motion.div 
        className="hospital-dept-card glass-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          cursor: 'pointer',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onClick={handleClick}
      >
        <div className="dept-image-wrapper">
          <div className="dept-img-container">
            <img src={getPublicUrl(image)} alt={name} className="dept-img" loading="lazy" />
          </div>
          <div className="dept-icon-floating-badge">
            <IconComponent size={24} />
          </div>
        </div>
        <div className="dept-card-body text-start">
          <h4 className="dept-card-title">{name}</h4>
          <p className="dept-card-desc text-muted">{shortDescription}</p>
          <button 
            onClick={(e) => { e.stopPropagation(); handleClick(); }} 
            className="btn-dept-readmore"
            aria-label={`Read more about ${name}`}
          >
            View Specialty Details &rarr;
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DepartmentCard;
