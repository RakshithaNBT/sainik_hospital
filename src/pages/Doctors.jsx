import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaGraduationCap, FaCalendarAlt, FaEnvelope, FaPhoneAlt, FaAmbulance } from 'react-icons/fa';
import DoctorCard from '../components/DoctorCard/DoctorCard';
import { doctors, departments } from '../utils/dummyData';
import EmergencyCTA from '../components/CTA/EmergencyCTA';
import CustomSelect from '../components/CustomSelect/CustomSelect';
import { getPublicUrl } from '../utils/publicUrl';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Read URL query parameters for auto-selecting doctor profile
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const docId = queryParams.get('id');
    const searchParam = queryParams.get('search');
    
    if (docId) {
      const matchedDoc = doctors.find((d) => d.id === docId);
      if (matchedDoc) {
        setSelectedDoc(matchedDoc);
      } else {
        setSelectedDoc(null);
      }
    } else {
      setSelectedDoc(null);
    }

    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location]);

  const handleSelectDoc = (doc) => {
    navigate(`/doctors?id=${doc.id}`);
  };

  const handleBackToAll = () => {
    navigate('/doctors');
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDeptFilter === 'all' || doc.department === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="doctors-page-wrapper">
      {selectedDoc ? (
        /* DEDICATED DOCTOR PROFILE PAGE VIEW */
        <div className="doc-detail-page-view">
          {/* Header Banner */}
          <section className="bg-gradient-sainik text-white page-header-banner">
            <div className="container py-4 text-start">
              <button 
                onClick={handleBackToAll} 
                className="btn btn-outline-light btn-sm mb-3 d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2"
              >
                <FaArrowLeft /> Back to All Doctors
              </button>
              <br />
              <span className="subpage-badge-text text-uppercase mb-2 d-inline-block">Doctor Profile & Schedule</span>
              <h1 className="display-3 fw-bold text-white mb-2">{selectedDoc.name}</h1>
              <p className="lead text-white-50 max-width-700">
                {selectedDoc.specialization} &bull; {selectedDoc.qualification}
              </p>
            </div>
          </section>

          {/* Main Doctor Profile Content */}
          <section className="section-padding bg-white overflow-hidden">
            <div className="container">
              <div className="row g-4 text-start">
                {/* Left Column: Doctor Bio & Details */}
                <div className="col-lg-8">
                  <div className="glass-card p-4 mb-4">
                    <div className="row align-items-center gy-4">
                      <div className="col-md-4 text-center">
                        <img 
                          src={getPublicUrl(selectedDoc.image)} 
                          alt={selectedDoc.name} 
                          className="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" 
                          style={{ maxHeight: '260px', objectPosition: 'top center' }} 
                        />
                      </div>
                      <div className="col-md-8">
                        <span 
                          className="badge bg-success-subtle text-success text-uppercase fw-bold px-3 py-2 rounded-pill mb-2 d-inline-block text-wrap text-start lh-base"
                          style={{ whiteSpace: 'normal', maxWidth: '100%' }}
                        >
                          {selectedDoc.specialization}
                        </span>
                        <h2 className="fw-bold mb-2 text-dark">{selectedDoc.name}</h2>
                        <p className="text-muted fw-semibold mb-3"><FaGraduationCap className="text-success me-2" />{selectedDoc.qualification}</p>
                        
                        <div className="p-3 bg-light rounded-3 border">
                          <p className="mb-1 text-muted small">Clinical Experience:</p>
                          <h4 className="fw-bold text-success mb-0">{selectedDoc.experience}</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="glass-card p-4 mb-4">
                    <h3 className="fw-bold text-success mb-3">Doctor Biography & Clinical Expertise</h3>
                    <p className="lead text-dark mb-0" style={{ lineHeight: '1.8' }}>
                      {selectedDoc.bio}
                    </p>
                  </div>

                  {/* Treatments & Services */}
                  {selectedDoc.treatments && selectedDoc.treatments.length > 0 && (
                    <div className="glass-card p-4 mb-4">
                      <h4 className="fw-bold text-success mb-3">Specialized Treatments & Clinical Services</h4>
                      <div className="row g-2">
                        {selectedDoc.treatments.map((treatment, idx) => (
                          <div key={idx} className="col-12 col-md-6">
                            <div className="p-3 bg-light rounded-3 border h-100 d-flex align-items-center gap-2">
                              <span className="badge bg-success rounded-circle p-1">✓</span>
                              <span className="text-dark fw-medium small">{treatment}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* OPD Consultation Timings */}
                  <div className="glass-card p-4 mb-4">
                    <h4 className="fw-bold text-dark mb-3"><FaCalendarAlt className="text-success me-2" />OPD Consultation Schedule</h4>
                    <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3 border">
                      <FaCalendarAlt className="text-success flex-shrink-0" size={26} />
                      <div>
                        <strong className="d-block text-dark lead">{selectedDoc.timings}</strong>
                        <span className="text-muted small">Available at SAINIK Multi-Speciality Hospital, Mysuru</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Info */}
                  <div className="glass-card p-4">
                    <h4 className="fw-bold text-dark mb-3">Direct Contact Details</h4>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="p-3 bg-light rounded-3 border">
                          <p className="mb-1 text-muted small"><FaPhoneAlt className="text-success me-2" />Appointment Desk:</p>
                          <strong className="text-dark">{selectedDoc.phone}</strong>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="p-3 bg-light rounded-3 border">
                          <p className="mb-1 text-muted small"><FaEnvelope className="text-success me-2" />Email Inquiries:</p>
                          <strong className="text-dark">{selectedDoc.email}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Emergency Assistance Box */}
                <div className="col-lg-4">
                  <div className="sticky-top" style={{ top: '140px', zIndex: 5 }}>
                    <div className="glass-card p-4 text-start bg-danger-subtle border-danger shadow-sm mb-4">
                      <div className="d-flex align-items-center gap-2 text-danger mb-2">
                        <FaAmbulance size={24} />
                        <h5 className="fw-bold mb-0">Emergency 24/7</h5>
                      </div>
                      <p className="small text-dark mb-3">
                        Need immediate medical rescue? Call our ACLS Ambulance Response.
                      </p>
                      <a href="tel:6361611986" className="btn btn-danger w-100 py-2 fw-bold">
                        Call Emergency: 6361611986
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* ALL DOCTORS ROSTER GRID VIEW */
        <div className="doc-grid-page-view">
          {/* Hero Header */}
          <section className="bg-gradient-sainik text-white page-header-banner">
            <div className="container py-4 text-start">
              <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">Medical Roster</span>
              <h1 className="display-4 fw-bold text-white mb-3">Find a Specialist &amp; Book Appointment</h1>
              <p className="lead text-white-50 max-width-700">
                Our team of internationally trained surgeons, physicians, gynecologists, and pediatricians provide specialized medical care.
              </p>
            </div>
          </section>

          {/* Search & Filter Controls — below banner so dropdown opens downward */}
          <section className="bg-white py-4 border-bottom shadow-sm">
            <div className="container">
              <div className="row g-3 align-items-center">
                <div className="col-md-7">
                  <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden border">
                    <span className="input-group-text bg-white border-0 text-muted">
                      <FaSearch />
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-0 text-dark" 
                      placeholder="Search doctor by name or specialty..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <CustomSelect 
                    value={selectedDeptFilter}
                    placeholder="All Specialties"
                    options={[
                      { value: 'all', label: 'All Specialties' },
                      ...departments.map((d) => ({ value: d.id, label: d.name }))
                    ]}
                    onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Roster Grid */}
          <section className="section-padding bg-white">
            <div className="container">
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-5">
                  <h4 className="text-muted">No doctors found matching your criteria.</h4>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedDeptFilter('all'); }} 
                    className="btn-premium-secondary mt-3"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredDoctors.map((doc) => (
                    <div key={doc.id} className="col-lg-4 col-md-6">
                      <DoctorCard doctor={doc} onViewProfile={handleSelectDoc} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      <EmergencyCTA />
    </div>
  );
};

export default Doctors;

