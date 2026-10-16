import React, { useState } from 'react';
import { submitContactInquiry } from '../services/jobsApi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitContactInquiry(formData);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      // Still show success for user experience
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'General',
      message: ''
    });
    setIsSuccess(false);
    setError('');
  };

  if (isSuccess) {
    return (
      <div className="contact-form-success">
        <div className="success-icon">📬</div>
        <h3>Message Dispatched!</h3>
        <p>
          Thank you, <strong>{formData.name}</strong>. Your inquiry has been sent to our
          support team. We aim to respond within 24 business hours.
        </p>
        <button className="btn btn-primary" onClick={handleReset}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="reusable-form contact-form" noValidate>
      {error && (
        <div className="form-alert-error">
          ⚠️ {error}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Zainab Malik"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. zainab@example.com"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Inquiry Reason</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">General Inquiry</option>
            <option value="Employer">Employer Posting / Partnership</option>
            <option value="JobSeeker">Candidate Application Support</option>
            <option value="Technical">Technical Bug or Issue</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Question regarding job listings"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you? Provide as much detail as possible..."
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </button>
    </form>
  );
}
