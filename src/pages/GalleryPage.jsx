import React from 'react';
import Gallery from '../components/Gallery/Gallery';
import EmergencyCTA from '../components/CTA/EmergencyCTA';

const GalleryPage = () => {
  return (
    <div className="gallery-page-wrapper">
      {/* Banner */}
      <section className="bg-gradient-sainik text-white page-header-banner">
        <div className="container py-4 text-start">
          <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">Media Gallery</span>
          <h1 className="display-4 fw-bold text-white mb-3">Hospital Infrastructure & Events Gallery</h1>
          <p className="lead text-white-50 max-width-700">
            Explore our state-of-the-art operation suites, MRI facilities, luxury patient wards, and health awareness camps.
          </p>
        </div>
      </section>

      {/* Full Gallery Component */}
      <section className="section-padding bg-white">
        <div className="container">
          <Gallery />
        </div>
      </section>

      <EmergencyCTA />
    </div>
  );
};

export default GalleryPage;
