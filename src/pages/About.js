import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Is JobNest free for job seekers?',
      a: 'Yes, 100%! Candidates can browse all openings, search, filter, and apply to unlimited jobs completely free of charge.'
    },
    {
      q: 'How does the application process work?',
      a: 'When you find a position you like, click "Apply Now", fill in your contact information and qualifications, and submit. The hiring team receives your application instantly.'
    },
    {
      q: 'Are the posted salary ranges accurate?',
      a: 'Yes. JobNest requires verified salary and benefit ranges for all posted opportunities so candidates can make informed decisions.'
    },
    {
      q: 'Can employers post remote positions?',
      a: 'Absolutely. We support remote, on-site, and hybrid job opportunities across Pakistan and internationally.'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Talent First',
      desc: 'We prioritize candidate experience, offering transparent job descriptions and streamlined applications.'
    },
    {
      icon: '💎',
      title: 'Complete Transparency',
      desc: 'No hidden salaries or vague role expectations. We encourage upfront compensation disclosure.'
    },
    {
      icon: '🚀',
      title: 'Continuous Growth',
      desc: 'Connecting candidates with companies that offer clear mentorship and long-term career progression.'
    },
    {
      icon: '🤝',
      title: 'Trust & Authenticity',
      desc: 'Every company and opening listed on JobNest undergoes verification to prevent fraudulent listings.'
    }
  ];

  return (
    <div className="about-wrapper">
      {/* Hero Header */}
      <section className="about-hero">
        <div className="section-container">
          <span className="hero-pill">About Our Mission</span>
          <h1>Building the Future of <span>Career Discovery</span></h1>
          <p className="subtitle">
            JobNest was founded to bridge the gap between world-class talent and high-growth
            tech companies through modern, frictionless recruiting.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-container">
        <div className="about-split-grid">
          <div className="about-card highlight-card">
            <h2>Our Mission 🎯</h2>
            <p>
              To democratize career opportunities for professionals across Pakistan and
              globally by providing a transparent, responsive, and intuitive hiring ecosystem.
            </p>
          </div>
          <div className="about-card highlight-card">
            <h2>Our Vision 🔭</h2>
            <p>
              To become the leading platform where top talent finds purposeful work, and
              forward-thinking organizations build dream teams without borders.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-container">
        <div className="section-header">
          <h2>Our Core Values</h2>
          <p>Principles that guide every product feature and partnership at JobNest.</p>
        </div>

        <div className="values-grid">
          {values.map((val, idx) => (
            <div key={idx} className="value-item-card">
              <span className="value-icon">{val.icon}</span>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-container faqs-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about JobNest and the application process.</p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Have more questions?</h2>
          <p>We are always eager to assist. Reach out to our dedicated support and recruitment team.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Us
            </Link>
            <Link to="/jobs" className="btn btn-outline-white btn-lg">
              Explore Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
