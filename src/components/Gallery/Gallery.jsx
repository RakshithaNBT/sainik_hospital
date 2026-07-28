import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { galleryItems } from '../../utils/dummyData';
import { getPublicUrl } from '../../utils/publicUrl';
import './Gallery.css';

const Gallery = ({ limit = null }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter Categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'hospital', name: 'Hospital' },
    { id: 'events', name: 'Events' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'equipment', name: 'Equipment' }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // If a limit is passed (e.g. for Home Page preview)
  const itemsToDisplay = limit ? filteredItems.slice(0, limit) : filteredItems;

  const openLightbox = (index) => {
    // We map index of displayed list to actual index
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? itemsToDisplay.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === itemsToDisplay.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="hospital-gallery-widget">
      {/* Category Navigation */}
      <div className="gallery-filter-buttons-row mb-5 text-center d-flex flex-wrap justify-content-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`btn-gallery-filter ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
            aria-label={`Filter by ${cat.name}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      {itemsToDisplay.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <p className="mb-0 fs-5">No gallery images available.</p>
        </div>
      ) : (
        <motion.div layout className="row g-4 gallery-grid-row">
          <AnimatePresence mode="popLayout">
            {itemsToDisplay.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                className="col-lg-6 col-md-6 gallery-grid-col"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="gallery-thumbnail-card" onClick={() => openLightbox(index)}>
                  <img src={getPublicUrl(item.image)} alt={item.title} className="thumbnail-img" loading="lazy" />
                  <div className="thumbnail-hover-overlay">
                    <div className="overlay-info">
                      <FaEye className="eye-icon mb-2" size={24} />
                      <h5>{item.title}</h5>
                      <span className="text-uppercase category-tag">{item.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="gallery-lightbox-overlay" onClick={closeLightbox}>
            <button className="close-lightbox-btn" onClick={closeLightbox} aria-label="Close Lightbox">
              <FaTimes size={28} />
            </button>

            {/* Left navigation arrow */}
            <button className="lightbox-nav-arrow left" onClick={prevSlide} aria-label="Previous Slide">
              <FaChevronLeft size={24} />
            </button>

            {/* Lightbox Content frame */}
            <motion.div
              className="lightbox-content-frame"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={lightboxIndex}
            >
              <img
                src={getPublicUrl(itemsToDisplay[lightboxIndex].image)}
                alt={itemsToDisplay[lightboxIndex].title}
                className="lightbox-main-img"
              />
              <div className="lightbox-caption-box text-start">
                <h4>{itemsToDisplay[lightboxIndex].title}</h4>
                <p className="mb-0 text-white-50">{itemsToDisplay[lightboxIndex].description}</p>
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button className="lightbox-nav-arrow right" onClick={nextSlide} aria-label="Next Slide">
              <FaChevronRight size={24} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
