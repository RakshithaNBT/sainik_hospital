import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaCheckCircle, FaArrowLeft, FaCalendarCheck, FaPhoneAlt, FaAmbulance } from 'react-icons/fa';
import DepartmentCard from '../components/DepartmentCard/DepartmentCard';
import { departments, doctors } from '../utils/dummyData';
import EmergencyCTA from '../components/CTA/EmergencyCTA';
import { getPublicUrl } from '../utils/publicUrl';

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check URL query parameters for auto-selecting department
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const deptId = queryParams.get('id');
    if (deptId) {
      const matchedDept = departments.find((d) => d.id === deptId);
      if (matchedDept) {
        setSelectedDept(matchedDept);
      } else {
        setSelectedDept(null);
      }
    } else {
      setSelectedDept(null);
    }
  }, [location]);

  const handleSelectDept = (dept) => {
    navigate(`/departments?id=${dept.id}`);
  };

  const handleBackToAll = () => {
    navigate('/departments');
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find doctors associated with selected department
  const deptDoctors = selectedDept
    ? doctors.filter((doc) => doc.department === selectedDept.id)
    : [];

  return (
    <div className="departments-page-wrapper">
      {selectedDept ? (
        /* DEDICATED DEPARTMENT DETAIL PAGE VIEW */
        <div className="dept-detail-page-view">
          {/* Header Banner */}
          <section className="bg-gradient-sainik text-white page-header-banner">
            <div className="container py-4 text-start">
              <button 
                onClick={handleBackToAll} 
                className="btn btn-outline-light btn-sm mb-3 d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2"
              >
                <FaArrowLeft /> Back to All Departments
              </button>
              <br />
              <span className="subpage-badge-text text-uppercase mb-2 d-inline-block">Specialty Overview</span>
              <h1 className="display-3 fw-bold text-white mb-3">{selectedDept.name}</h1>
              <p className="lead text-white-50 max-width-700">
                {selectedDept.shortDescription}
              </p>
            </div>
          </section>

          {/* Main Detail Content */}
          <section className="section-padding bg-white">
            <div className="container">
              <div className="row g-5 text-start">
                {/* Main Content Area */}
                <div className="col-lg-8">
                  <div className="rounded-4 overflow-hidden shadow-sm mb-4">
                    <img 
                      src={getPublicUrl(selectedDept.image)} 
                      alt={selectedDept.name} 
                      className="img-fluid w-100" 
                      style={{ maxHeight: '420px', objectFit: 'cover' }} 
                    />
                  </div>

                  <h3 className="fw-bold text-success mb-3">About {selectedDept.name}</h3>
                  <p className="lead text-dark mb-4" style={{ lineHeight: '1.8' }}>
                    {selectedDept.description}
                  </p>

                  <h4 className="fw-bold text-dark mt-5 mb-3">Key Services & Procedures Offered:</h4>
                  <div className="row g-3 mb-5">
                    {selectedDept.services.map((srv, idx) => (
                      <div key={idx} className="col-md-6">
                        <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3 border">
                          <FaCheckCircle className="text-success flex-shrink-0" size={22} />
                          <span className="fw-semibold text-dark">{srv}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Doctors Roster in this Department */}
                  {deptDoctors.length > 0 && (
                    <div className="dept-specialists-section mt-5 pt-4 border-top">
                      <h3 className="fw-bold text-success mb-4">Specialists in {selectedDept.name}</h3>
                      <div className="row g-4">
                        {deptDoctors.map((doc) => (
                          <div key={doc.id} className="col-md-6">
                            <div className="glass-card p-3 d-flex align-items-center gap-3 h-100">
                              <img 
                                src={getPublicUrl(doc.image)} 
                                alt={doc.name} 
                                className="rounded-circle shadow-sm" 
                                style={{ width: '75px', height: '75px', objectFit: 'cover' }} 
                              />
                              <div>
                                <h5 className="fw-bold mb-1 text-dark">{doc.name}</h5>
                                <span className="badge bg-success-subtle text-success text-uppercase fw-semibold mb-1">
                                  {doc.specialization}
                                </span>
                                <p className="small text-muted mb-0">{doc.experience} Experience</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar Card */}
                <div className="col-lg-4">
                  <div className="sticky-top" style={{ top: '130px', zIndex: 10 }}>
                    <div className="glass-card p-4 text-start mb-4 border-success">
                      <h4 className="fw-bold text-success mb-3">Schedule Consultation</h4>
                      <p className="text-muted small mb-4">
                        Book a priority OPD slot or video consultation with our {selectedDept.name} consultants.
                      </p>
                      <button 
                        onClick={() => navigate('/contact')} 
                        className="btn-premium-primary w-100 justify-content-center py-3 mb-3"
                      >
                        <FaCalendarCheck /> Book Appointment
                      </button>
                      <a 
                        href="tel:+918044556677" 
                        className="btn btn-outline-secondary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaPhoneAlt /> Call Desk: +91 80 4455 6677
                      </a>
                    </div>

                    <div className="glass-card p-4 text-start bg-danger-subtle border-danger">
                      <div className="d-flex align-items-center gap-2 text-danger mb-2">
                        <FaAmbulance size={24} />
                        <h5 className="fw-bold mb-0">Emergency Unit</h5>
                      </div>
                      <p className="small text-dark mb-3">
                        24/7 ACLS Emergency & Trauma Care is standby for immediate patient dispatch.
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
        /* ALL DEPARTMENTS GRID VIEW */
        <div className="dept-grid-page-view">
          {/* Page Banner */}
          <section className="bg-gradient-sainik text-white page-header-banner">
            <div className="container py-4 text-start">
              <span className="subpage-badge-text text-uppercase mb-3 d-inline-block">Clinical Specialties</span>
              <h1 className="display-4 fw-bold text-white mb-3">Our Departments & Centres of Excellence</h1>
              <p className="lead text-white-50 max-width-700">
                From Advanced Cardiology and Laparoscopic Surgery to Pediatrics and Critical Care, explore our specialized medical departments.
              </p>

              {/* Search Box */}
              <div className="dept-search-box mt-4 max-width-600">
                <div className="input-group input-group-lg shadow-sm">
                  <span className="input-group-text bg-white border-0 text-muted">
                    <FaSearch />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-0 text-dark" 
                    placeholder="Search department or specialty..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Grid of Departments */}
          <section className="section-padding bg-white">
            <div className="container">
              {filteredDepartments.length === 0 ? (
                <div className="text-center py-5">
                  <h4 className="text-muted">No department found matching "{searchTerm}"</h4>
                  <button onClick={() => setSearchTerm('')} className="btn-premium-secondary mt-3">Clear Search</button>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredDepartments.map((dept) => (
                    <div key={dept.id} className="col-lg-4 col-md-6">
                      <DepartmentCard department={dept} onReadMore={handleSelectDept} />
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

export default Departments;

