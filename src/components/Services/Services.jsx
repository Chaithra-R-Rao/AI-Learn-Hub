import React from 'react'
import './Services.css'

export default function Services() {
  return (
    <div className="services-container container my-5 py-5">
    <div className="text-center mb-5">
      <h1 className="fw-bold">An investment in knowledge pays the best interest</h1>
    </div>

    <div className="row g-4">
      {/* Who We Are Section */}
      <div className="col-md-6">
        <div className="service-block p-4 h-100">
          <h4 className="fw-bold mb-3">Who we are</h4>
          <p className="service-content">
            AI Learn Hub provides both adults and children with a practice-oriented education.
            Our team of professionals consists of award-winning teachers and mentors who are
            committed to bringing value to every student's life. We ensure that each and every
            student will achieve their full academic potential and build a successful career
            outside our institution.
          </p>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="col-md-6">
        <div className="service-block p-4 h-100">
          <h4 className="fw-bold mb-3">What we do</h4>
          <p className="service-content">
            We offer a wide range of private and group classes tested and optimized during the
            10 years of our existence. Our experienced teachers always take into consideration
            the student's learning preferences, professional needs, and personal interests to
            help them realize their full potential.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
