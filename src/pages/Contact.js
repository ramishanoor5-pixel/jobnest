import React from 'react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="contact-wrapper">
      <div className="section-container">
        <header className="contact-header">
          <span className="hero-pill">Get In Touch</span>
          <h1>We'd Love to Hear From <span>You</span></h1>
          <p className="subtitle">
            Whether you have a question about open job positions, hiring on JobNest,
            or anything else, our team is ready to answer all your questions.
          </p>
        </header>

        <div className="contact-main-grid">
          {/* Contact Details Card */}
          <aside className="contact-info-panel">
            <div className="info-card">
              <h3>Contact Information</h3>
              <p>Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="contact-detail-items">
                <div className="detail-item">
                  <span className="icon">📧</span>
                  <div>
                    <strong>Direct Email</strong>
                    <p>support@jobnest.com</p>
                    <p>careers@jobnest.com</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📞</span>
                  <div>
                    <strong>Phone Support</strong>
                    <p>+92 (021) 3589-2234</p>
                    <p>Mon - Fri, 9:00 AM - 6:00 PM PKT</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📍</span>
                  <div>
                    <strong>Headquarters</strong>
                    <p>JobNest Tech Hub, Main Boulevard, Gulberg III, Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="quick-help-box">
                <h4>Are you an Employer?</h4>
                <p>
                  Looking to list multiple vacancies or partner for high-volume recruitment?
                  Email our enterprise team at <strong>partnerships@jobnest.com</strong>.
                </p>
              </div>
            </div>
          </aside>

          {/* Reusable Contact Form */}
          <section className="contact-form-panel">
            <div className="form-card-container">
              <h2>Send us a Message</h2>
              <p className="form-subtext">
                Please provide accurate details so we can assist your inquiry promptly.
              </p>
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
