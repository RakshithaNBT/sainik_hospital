import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import { blogPosts } from '../../utils/blogData';
import './BlogSection.css';

const BlogSection = () => {
  // Select top 3 featured articles for home section display
  const featuredArticles = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle d-inline-flex align-items-center gap-1">
            <FaBookOpen className="text-success" /> Health Insights & Articles
          </span>
          <h2 className="section-title text-gradient-green">
            Latest Health Advice from Our Doctors
          </h2>
          <p className="text-muted max-width-600 mx-auto">
            Stay informed with clinical articles on skin health, hair restoration, women's wellness, and finding the best doctors near you in Mysuru.
          </p>
        </div>

        <div className="row g-4">
          {featuredArticles.map((post, index) => (
            <div key={post.id} className="col-lg-4 col-md-6 text-start">
              <motion.div
                className="blog-section-card glass-card h-100 d-flex flex-column justify-content-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <div>
                  <div className="blog-section-img-wrapper">
                    <img src={post.image} alt={post.title} />
                    <span className="blog-section-category">{post.category}</span>
                  </div>

                  <div className="p-4">
                    <div className="d-flex align-items-center gap-3 text-muted small mb-2">
                      <span className="d-flex align-items-center gap-1">
                        <FaCalendarAlt className="text-success" /> {post.date}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaClock className="text-success" /> {post.readTime}
                      </span>
                    </div>

                    <h4 className="fw-bold mb-2 text-dark" style={{ fontSize: '1.15rem', lineHeight: '1.4' }}>
                      {post.title}
                    </h4>

                    <p className="text-muted small mb-0 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <Link
                    to="/blog"
                    className="btn btn-outline-success w-100 rounded-pill fw-bold btn-sm py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    Read Article <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="text-center mt-5">
          <Link
            to="/blog"
            className="btn-premium-primary px-4 py-3 d-inline-flex align-items-center gap-2"
          >
            Explore All Health Articles <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
