import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { testimonials } from '../../utils/dummyData';
import { getPublicUrl } from '../../utils/publicUrl';
import './Testimonials.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
  return (
    <section className="testimonials-slider-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title text-gradient-green">What Our Patients Say</h2>
          <p className="text-muted max-width-600 mx-auto">
            Read real feedback from patient families who experienced high-end surgical treatments, neonatal diagnostics, and clinical care at SAINIK Hospital.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            }
          }}
          className="testimonials-swiper py-5"
        >
          {testimonials.map((test) => (
            <SwiperSlide key={test.id}>
              <div className="testimonial-card-item glass-card">
                <div className="quote-icon-badge">
                  <FaQuoteLeft />
                </div>
                
                {/* Star Ratings */}
                <div className="stars-wrapper mb-3">
                  {[...Array(test.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>

                <p className="patient-comment">"{test.comment}"</p>

                <div className="patient-info-row mt-4">
                  <img src={getPublicUrl(test.avatar)} alt={test.name} className="patient-avatar" loading="lazy" />
                  <div className="patient-text-block text-start">
                    <h5 className="patient-name">{test.name}</h5>
                    <span className="patient-relation">{test.relation}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
