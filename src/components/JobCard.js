import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job, onApply }) {
  if (!job) return null;

  const initials = job.company
    ? job.company
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'JN';

  return (
    <article className={`job-card ${job.featured ? 'job-card-featured' : ''}`}>
      {job.featured && <span className="featured-badge">Featured</span>}
      <div className="job-card-header">
        <div
          className="company-logo-avatar"
          style={{ backgroundColor: job.logoColor || '#2563eb' }}
        >
          {initials}
        </div>
        <div className="job-title-group">
          <Link to={`/jobs/${job.id}`} className="job-card-title">
            <h3>{job.title}</h3>
          </Link>
          <span className="job-company-name">{job.company}</span>
        </div>
      </div>

      <div className="job-meta-row">
        <span className="meta-tag meta-location">
          📍 {job.location}
        </span>
        <span className={`meta-tag meta-type tag-${job.type?.toLowerCase().replace(/\s+/g, '-')}`}>
          💼 {job.type}
        </span>
        <span className="meta-tag meta-salary">
          💰 {job.salary}
        </span>
      </div>

      <p className="job-card-description">
        {job.description?.length > 140
          ? `${job.description.slice(0, 140)}...`
          : job.description}
      </p>

      <div className="job-card-footer">
        <span className="job-posted-time">Posted {job.postedDate}</span>
        <div className="job-card-actions">
          <Link to={`/jobs/${job.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
          {onApply && (
            <button
              onClick={() => onApply(job)}
              className="btn btn-primary btn-sm"
            >
              Quick Apply
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
