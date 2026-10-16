import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../services/jobsApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ApplyModal from '../components/ApplyModal';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobById(id);
        if (isMounted) setJob(data);
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load details for this position.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page-container job-detail-page">
        <LoadingSpinner message="Loading job specifications..." />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="page-container job-detail-page">
        <ErrorMessage
          message={error || 'Job not found'}
          onRetry={() => navigate('/jobs')}
        />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/jobs" className="btn btn-outline">
            &larr; Back to all jobs
          </Link>
        </div>
      </div>
    );
  }

  const initials = job.company
    ? job.company
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'JN';

  return (
    <div className="page-container job-detail-page">
      {/* Navigation Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">&larr; Home</Link>
        <span>/</span>
        <Link to="/jobs">Jobs</Link>
        <span>/</span>
        <span className="current">{job.title}</span>
      </nav>

      {/* Hero Header */}
      <div className="detail-hero-card">
        <div className="detail-hero-main">
          <div
            className="company-logo-avatar-lg"
            style={{ backgroundColor: job.logoColor || '#2563eb' }}
          >
            {initials}
          </div>
          <div>
            <h1 className="detail-title">{job.title}</h1>
            <p className="detail-company-sub">
              <strong>{job.company}</strong> &bull; {job.location}
            </p>
          </div>
        </div>

        <div className="detail-hero-action">
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="btn btn-primary btn-lg"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Meta Highlights Pill Bar */}
      <div className="detail-meta-bar">
        <div className="meta-pill-item">
          <span className="meta-pill-label">Category</span>
          <span className="meta-pill-val">{job.category}</span>
        </div>
        <div className="meta-pill-item">
          <span className="meta-pill-label">Employment Type</span>
          <span className="meta-pill-val">{job.type}</span>
        </div>
        <div className="meta-pill-item">
          <span className="meta-pill-label">Experience</span>
          <span className="meta-pill-val">{job.experience}</span>
        </div>
        <div className="meta-pill-item">
          <span className="meta-pill-label">Salary Range</span>
          <span className="meta-pill-val highlight">{job.salary}</span>
        </div>
        <div className="meta-pill-item">
          <span className="meta-pill-label">Posted</span>
          <span className="meta-pill-val">{job.postedDate}</span>
        </div>
      </div>

      {/* Content Layout: 2 Columns */}
      <div className="detail-content-layout">
        <div className="detail-body-left">
          <section className="detail-section">
            <h2>Role Overview</h2>
            <p>{job.description}</p>
          </section>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <section className="detail-section">
              <h2>Key Responsibilities</h2>
              <ul className="bullet-list">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <section className="detail-section">
              <h2>Required Qualifications & Skills</h2>
              <ul className="bullet-list">
                {job.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <section className="detail-section">
              <h2>Perks & Benefits</h2>
              <ul className="bullet-list perks-list">
                {job.benefits.map((item, idx) => (
                  <li key={idx}>✨ {item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="detail-body-right">
          <div className="company-info-card">
            <h3>About {job.company}</h3>
            <p>
              A leading company partnering with JobNest to hire high-performing
              talent in Pakistan and globally.
            </p>
            <div className="company-quick-facts">
              <div>
                <strong>Industry:</strong> {job.category}
              </div>
              <div>
                <strong>Hiring Status:</strong> Actively Reviewing
              </div>
              <div>
                <strong>Location:</strong> {job.location}
              </div>
            </div>
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="btn btn-primary btn-block"
            >
              Apply for this Role
            </button>
            <Link to="/jobs" className="btn btn-outline btn-block" style={{ marginTop: '12px' }}>
              &larr; Browse Other Jobs
            </Link>
          </div>
        </aside>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <ApplyModal job={job} onClose={() => setIsApplyModalOpen(false)} />
      )}
    </div>
  );
}
