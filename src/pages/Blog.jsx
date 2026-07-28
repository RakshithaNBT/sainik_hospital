import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaClock, 
  FaUserMd, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaArrowLeft,
  FaTimes,
  FaPhoneAlt, 
  FaStethoscope,
  FaChevronRight
} from 'react-icons/fa';
import { blogPosts, blogCategories } from '../utils/blogData';
import { doctors } from '../utils/dummyData';
import { processBlogSEOContent } from '../utils/seoLinker';
import EmergencyCTA from '../components/CTA/EmergencyCTA';
import { getPublicUrl } from '../utils/publicUrl';
import './Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Read URL query parameter for single article full page view
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get('id');

  const selectedPost = useMemo(() => {
    if (!postId) return null;
    return blogPosts.find((p) => p.id === postId) || null;
  }, [postId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);

  // Filter blog posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = 
        selectedCategory === "All Articles" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q || 
        post.title.toLowerCase().includes(q) || 
        post.summary.toLowerCase().includes(q) || 
        post.category.toLowerCase().includes(q) ||
        post.keywords.some(k => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenPost = (id) => {
    navigate(`/blog?id=${id}`);
  };

  const handleBackToRoster = () => {
    navigate('/blog');
  };

  return (
    <div className="blog-page-wrapper">
      {selectedPost ? (
        /* ------------------------------------------------------------- */
        /* FULL ARTICLE SINGLE PAGE VIEW (NO MODAL / POPUP CARD)         */
        /* ------------------------------------------------------------- */
        <div className="single-blog-page-view">
          {/* Header Banner */}
          <section className="bg-gradient-sainik text-white page-header-banner blog-hero text-start">
            <div className="container position-relative" style={{ zIndex: 2 }}>
              <button
                onClick={handleBackToRoster}
                className="btn btn-outline-light rounded-pill btn-sm mb-4 px-3 py-2 d-inline-flex align-items-center gap-2 fw-semibold"
              >
                <FaArrowLeft /> Back to All Articles
              </button>

              <div>
                <span className="subpage-badge-text text-uppercase mb-2 d-inline-block">
                  {selectedPost.category}
                </span>
                <h1 className="display-4 fw-bold mb-3 text-white blog-hero-title" style={{ fontSize: '2.5rem', lineHeight: '1.25' }}>
                  {selectedPost.title}
                </h1>
                
                {/* Meta details bar */}
                <div className="d-flex flex-wrap align-items-center gap-4 text-white-50 small mt-3">
                  <span className="d-flex align-items-center gap-2">
                    <FaUserMd className="text-success" /> 
                    <strong className="text-white">{selectedPost.author}</strong> ({selectedPost.authorRole})
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <FaCalendarAlt className="text-success" /> {selectedPost.date}
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <FaClock className="text-success" /> {selectedPost.readTime}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Article Body & Sidebar */}
          <section className="section-padding bg-white">
            <div className="container">
              <div className="row g-5">
                {/* Left 8 cols: Full Article Content */}
                <div className="col-lg-8 text-start">
                  {/* Hero Featured Image */}
                  <div className="rounded-4 overflow-hidden mb-5 shadow-sm" style={{ maxHeight: '420px' }}>
                    <img
                      src={getPublicUrl(selectedPost.image)}
                      alt={selectedPost.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  {/* HTML Content */}
                  <div
                    className="single-blog-article-body mb-5"
                    dangerouslySetInnerHTML={{ __html: processBlogSEOContent(selectedPost.content) }}
                  />

                  {/* Doctor Consultation CTA Box */}
                  <div className="p-4 p-md-5 rounded-4 bg-light border border-success-subtle text-start shadow-sm mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-8 mb-3 mb-md-0">
                        <h4 className="fw-bold text-success mb-2">Need a Specialist Consultation?</h4>
                        <p className="text-muted small mb-0">
                          Consult our experienced consultants, lady gynaecologists, dermatologists, and trichology specialists at SAINIK Multi-Speciality Hospital, Mysuru.
                        </p>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <Link
                          to="/doctors"
                          className="btn-premium-primary w-100 justify-content-center py-3 text-center"
                        >
                          Book Appointment
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 4 cols: Sidebar Widgets */}
                <div className="col-lg-4 text-start">
                  <div className="d-flex flex-column gap-4">
                    {/* Widget 1: Recent Articles */}
                    <div className="blog-sidebar-widget">
                      <h5 className="fw-bold text-dark mb-4 border-bottom pb-2">Related Articles</h5>
                      {blogPosts
                        .filter((p) => p.id !== selectedPost.id)
                        .slice(0, 3)
                        .map((post) => (
                          <div
                            key={post.id}
                            className="blog-recent-item"
                            onClick={() => handleOpenPost(post.id)}
                          >
                            <img src={post.image} alt={post.title} className="blog-recent-thumb" />
                            <div>
                              <span className="badge bg-success-subtle text-success small mb-1" style={{ fontSize: '0.7rem' }}>
                                {post.category}
                              </span>
                              <h6 className="fw-bold text-dark mb-1 line-clamp-2" style={{ fontSize: '0.92rem', lineHeight: '1.3' }}>
                                {post.title}
                              </h6>
                              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{post.date}</span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Widget 2: Senior Doctors Quick List */}
                    <div className="blog-sidebar-widget bg-light">
                      <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Our Senior Specialists</h5>
                      <p className="text-muted small mb-3">
                        Over 25+ experienced consultants available for OPD & Emergency care.
                      </p>
                      <ul className="list-unstyled mb-4">
                        {doctors.slice(0, 4).map((doc) => (
                          <li key={doc.id} className="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between">
                            <div>
                              <strong className="d-block text-dark small">{doc.name}</strong>
                              <span className="text-success small" style={{ fontSize: '0.75rem' }}>{doc.specialization}</span>
                            </div>
                            <Link to={`/doctors?id=${doc.id}`} className="btn btn-sm btn-outline-success rounded-circle p-1">
                              <FaChevronRight size={10} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link to="/doctors" className="btn btn-success w-100 rounded-pill btn-sm fw-bold py-2">
                        View All Doctors
                      </Link>
                    </div>

                    {/* Widget 3: Emergency Helpline Card */}
                    <div className="p-4 rounded-4 text-white text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>
                      <FaPhoneAlt className="fs-2 mb-2" style={{ color: '#4ade80' }} />
                      <h5 className="fw-bold text-white mb-2">24/7 Emergency Line</h5>
                      <p className="text-white-50 small mb-3">ICU, NICU, Dialysis & ACLS Ambulance Response Desk</p>
                      <a href="tel:6361611986" className="btn btn-success text-white w-100 fw-bold py-2 rounded-pill shadow-sm" style={{ backgroundColor: '#0D3A27', borderColor: '#0D3A27' }}>
                        Call 6361611986
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Emergency Banner */}
          <EmergencyCTA />
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* ALL BLOG ARTICLES LISTING ROSTER VIEW                         */
        /* ------------------------------------------------------------- */
        <div className="blog-list-page-view">
          {/* 1. Blog Hero Header */}
          <section className="bg-gradient-sainik text-white page-header-banner blog-hero text-start">
            <div className="container position-relative text-start" style={{ zIndex: 2 }}>
              <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">
                Official Health Blog & Medical Insights
              </span>
              <h1 className="display-4 fw-bold mb-3 blog-hero-title">
                Healthcare Tips & Specialist Guides
              </h1>
              <p className="lead max-width-700 text-white-50 mb-4">
                Discover expert medical advice, health guidelines, and clinical insights from senior consultants at SAINIK Multi-Speciality Hospital, Mysuru.
              </p>

              {/* Search Box */}
              <div className="row justify-content-start">
                <div className="col-lg-6 col-md-8">
                  <div className="blog-search-box d-flex align-items-center">
                    <FaSearch className="text-white-50 me-2 fs-5" />
                    <input
                      type="text"
                      className="blog-search-input flex-grow-1"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        className="btn btn-sm text-white-50 p-0 me-2"
                        onClick={() => setSearchQuery('')}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Category Filter Tabs */}
          <section className="bg-light py-4 border-bottom">
            <div className="container">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${
                      selectedCategory === cat 
                        ? 'btn-success text-white shadow-sm' 
                        : 'btn-outline-success bg-white text-dark border-0'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Main Blog Posts Grid */}
          <section className="section-padding bg-white">
            <div className="container">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-5">
                  <FaStethoscope className="text-muted display-3 mb-3" />
                  <h3 className="fw-bold text-dark">No Articles Found</h3>
                  <p className="text-muted">Try clearing your search query or selecting a different category filter.</p>
                  <button
                    className="btn btn-premium-primary mt-2"
                    onClick={() => {
                      setSelectedCategory("All Articles");
                      setSearchQuery("");
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredPosts.map((post, idx) => (
                    <div key={post.id} className="col-lg-4 col-md-6 text-start">
                      <motion.div
                        className="blog-card glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <div className="blog-card-img-wrapper">
                          <img src={getPublicUrl(post.image)} alt={post.title} />
                          <span className="blog-category-badge">{post.category}</span>
                        </div>

                        <div className="p-4 d-flex flex-column flex-grow-1 justify-content-between">
                          <div>
                            {/* Meta info */}
                            <div className="d-flex align-items-center gap-3 text-muted small mb-2">
                              <span className="d-flex align-items-center gap-1">
                                <FaCalendarAlt className="text-success" /> {post.date}
                              </span>
                              <span className="d-flex align-items-center gap-1">
                                <FaClock className="text-success" /> {post.readTime}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="fw-bold text-dark mb-2 line-clamp-2 hover-text-success" style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>
                              {post.title}
                            </h4>

                            {/* Summary */}
                            <p className="text-muted small mb-4 line-clamp-3">
                              {post.summary}
                            </p>
                          </div>

                          {/* Read Full Article Button -> Navigates to full page */}
                          <button
                            className="btn-premium-primary w-100 justify-content-center btn-sm text-center py-2"
                            onClick={() => handleOpenPost(post.id)}
                          >
                            Read Full Article <FaArrowRight className="ms-2" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 4. Patient Helpline CTA Strip */}
          <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #0D3A27 0%, #175238 100%)' }}>
            <div className="container">
              <div className="row align-items-center gy-4">
                <div className="col-lg-8 text-center text-lg-start">
                  <h3 className="fw-bold mb-2 text-white">Looking for Good Doctors Near You in Mysuru?</h3>
                  <p className="text-white-50 mb-0">
                    Book a consultation with our experienced specialists, lady gynaecologists, dermatologists, and hair doctors today at SAINIK Multi-Speciality Hospital.
                  </p>
                </div>
                <div className="col-lg-4 text-center text-lg-end">
                  <a
                    href="tel:6361611986"
                    className="btn btn-light btn-lg px-4 py-3 fw-bold text-success rounded-pill me-2 mb-2 shadow-sm"
                  >
                    <FaPhoneAlt className="me-2" /> Call 6361611986
                  </a>
                  <Link
                    to="/doctors"
                    className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill mb-2"
                  >
                    View Doctors
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Blog;
