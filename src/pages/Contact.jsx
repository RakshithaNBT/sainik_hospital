import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaAmbulance, FaPaperPlane } from 'react-icons/fa';
import { departments, doctors } from '../utils/dummyData';
import EmergencyCTA from '../components/CTA/EmergencyCTA';
import CustomSelect from '../components/CustomSelect/CustomSelect';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "916361611986";
    const text = `*New Appointment Request - SAINIK Hospital*
📌 *Patient Name:* ${formData.name}
📞 *Phone Number:* ${formData.phone}
${formData.email ? `✉️ *Email:* ${formData.email}\n` : ''}🏥 *Department:* ${formData.department || 'Not specified'}
👨‍⚕️ *Doctor:* ${formData.doctor || 'Any Available Specialist'}
📅 *Date:* ${formData.date}
⏰ *Time:* ${formData.time}
${formData.message ? `📝 *Notes:* ${formData.message}` : ''}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        doctor: '',
        date: '',
        time: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Banner */}
      <section className="bg-gradient-sainik text-white page-header-banner">
        <div className="container py-4 text-start">
          <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">Connect With Us</span>
          <h1 className="display-4 fw-bold text-white mb-3">Schedule Your Visit or General Inquiry</h1>
          <p className="lead text-white-50 max-width-700">
            Our Central Patient Desk is operational 24/7 to answer questions, guide appointments, or dispatch emergency life support.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-5 text-start">
            {/* Contact Info Cards */}
            <div className="col-lg-5">
              <span className="section-subtitle">Hospital Help Desk</span>
              <h2 className="section-title text-gradient-green mb-4">Contact Details</h2>

              <div className="contact-info-card glass-card p-4 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 rounded-circle bg-danger-subtle text-danger">
                    <FaAmbulance size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-danger">24/7 Emergency &amp; Ambulance</h5>
                    <p className="mb-0 text-dark fw-bold" style={{ fontSize: '1.3rem', lineHeight: '1.6' }}>
                      <a href="tel:6361611986" className="text-dark text-decoration-none">6361611986</a>
                      <span className="text-muted fw-normal mx-2">/</span>
                      <a href="tel:7337668946" className="text-dark text-decoration-none">7337668946</a>
                    </p>
                    <span className="text-muted small">Instant ACLS Ambulance Dispatch</span>
                  </div>
                </div>
              </div>

              <div className="contact-info-card glass-card p-4 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 rounded-circle bg-success-subtle text-success">
                    <FaPhoneAlt size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">General OPD & Mobile Desk</h5>
                    <p className="mb-0 text-dark fw-bold lead">
                      <a href="tel:6361611986" className="text-dark text-decoration-none me-2">6361611986</a> / 
                      <a href="tel:7022630692" className="text-dark text-decoration-none ms-2">7022630692</a>
                    </p>
                    <span className="text-muted small">Open 24 Hours &bull; Mon - Sun</span>
                  </div>
                </div>
              </div>

              <div className="contact-info-card glass-card p-4 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 rounded-circle bg-success-subtle text-success">
                    <FaEnvelope size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Email Address</h5>
                    <p className="mb-0 text-muted">
                      <a href="mailto:appointments@sainikhospital.com" className="text-dark text-decoration-none fw-medium">appointments@sainikhospital.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card glass-card p-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 rounded-circle bg-success-subtle text-success">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Hospital Location</h5>
                    <p className="mb-0 text-dark fw-medium">CA-03, E & F Block, Dakshineshwara Road, Ramakrishna Nagar, Near Andolana Circle, Mysuru, Karnataka 570023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment / Inquiry Form */}
            <div className="col-lg-7">
              <div className="glass-card p-4 p-md-5">
                {submitted ? (
                  <div className="text-center py-5">
                    <div className="success-pulse-ring mx-auto mb-4">✓</div>
                    <h2 className="text-gradient-green fw-bold mb-2">Request Received!</h2>
                    <p className="lead text-dark mb-3">Thank you for contacting SAINIK Multi-Speciality Hospital.</p>
                    <p className="text-muted">Our desk coordinator will reach out to you within 10 minutes to finalize your schedule.</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="fw-bold text-success mb-1">Book an Appointment</h3>
                    <p className="text-muted mb-4">Fill out the fields below and our patient desk will call you back immediately.</p>

                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Patient Name *</label>
                          <input 
                            type="text" 
                            name="name" 
                            className="form-control text-dark bg-white" 
                            required 
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Phone Number *</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            className="form-control text-dark bg-white" 
                            required 
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="form-label fw-semibold">Email Address</label>
                          <input 
                            type="email" 
                            name="email" 
                            className="form-control text-dark bg-white" 
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Department *</label>
                          <CustomSelect 
                            name="department"
                            value={formData.department}
                            placeholder="Choose Specialty..."
                            options={departments.map((d) => ({ value: d.name, label: d.name }))}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Preferred Doctor</label>
                          <CustomSelect 
                            name="doctor"
                            value={formData.doctor}
                            placeholder="Any Available Specialist"
                            options={doctors.map((doc) => ({ value: doc.name, label: `${doc.name} (${doc.specialization})` }))}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Date *</label>
                          <input 
                            type="date" 
                            name="date" 
                            className="form-control text-dark bg-white" 
                            required 
                            value={formData.date}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Preferred Time *</label>
                          <input 
                            type="time" 
                            name="time" 
                            className="form-control text-dark bg-white" 
                            required 
                            value={formData.time}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="form-label fw-semibold">Symptoms / Medical Notes</label>
                          <textarea 
                            name="message" 
                            rows="3" 
                            className="form-control text-dark bg-white" 
                            placeholder="Brief description of your health concern..." 
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>

                      <button type="submit" className="btn-premium-primary w-100 justify-content-center py-3 mt-4">
                        <FaPaperPlane /> Submit Appointment Request
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Location Map iframe */}
      <section className="map-embed-section bg-light py-5">
        <div className="container">
          <div className="rounded-4 overflow-hidden shadow-lg border position-relative">
            <iframe 
              title="SAINIK Hospital Location Map - Mysuru"
              src="https://maps.google.com/maps?q=Sainik+Multi+Speciality+Hospital+Mysore&output=embed" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-3 px-2 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-start gap-2 text-muted small">
              <FaMapMarkerAlt style={{ color: '#5E7D37', marginTop: 3, flexShrink: 0 }} />
              <span><strong className="text-dark">SAINIK Multi-Speciality Hospital:</strong> CA-03, E &amp; F Block, Dakshineshwara Road, Ramakrishna Nagar, Near Andolana Circle, Mysuru, Karnataka 570023</span>
            </div>
            <a 
              href="https://maps.google.com/?q=Sainik+Multi+Speciality+Hospital+Mysore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-sm fw-semibold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2"
              style={{ background: '#3B4E23', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              <FaMapMarkerAlt /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <EmergencyCTA />
    </div>
  );
};

export default Contact;

