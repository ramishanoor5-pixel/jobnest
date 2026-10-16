import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchJobs } from '../services/jobsApi';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ApplyModal from '../components/ApplyModal';

export default function Home() {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const allJobs = await fetchJobs();
        if (isMounted) {
          const featured = allJobs.filter((j) => j.featured).slice(0, 4);
          setFeaturedJobs(featured);
        }
      } catch (err) {
        console.error('Error fetching featured jobs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/jobs`);
    } else {
      navigate('/jobs');
    }
  };

  const categories = [
    { title: 'Software Engineering', icon: '💻', count: '120+ Jobs', color: '#2563eb' },
    { title: 'UI/UX & Product Design', icon: '🎨', count: '45+ Jobs', color: '#7c3aed' },
    { title: 'DevOps & Cloud Systems', icon: '☁️', count: '38+ Jobs', color: '#ea580c' },
    { title: 'Data Science & AI', icon: '📊', count: '52+ Jobs', color: '#0d9488' },
    { title: 'Digital Growth & Marketing', icon: '📈', count: '29+ Jobs', color: '#db2777' },
    { title: 'Product & Project Mgmt', icon: '🚀', count: '34+ Jobs', color: '#0284c7' }
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-pill">✨ Over 2,500+ Verified Tech & Business Jobs</span>
          <h1 className="hero-title">
            Land Your Next <span>Dream Career</span> with JobNest
          </h1>
          <p className="hero-subtitle">
            Connecting ambitious professionals with high-growth startups and leading enterprises.
            Search remote, hybrid, and on-site opportunities in Pakistan and globally.
          </p>

          <form onSubmit={handleHeroSearch} className="hero-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by job title, skill (e.g. React, Python, Designer)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Find Jobs
            </button>
          </form>

          <div className="hero-popular-tags">
            <span>Popular searches:</span>
            <Link to="/jobs">React Developer</Link>
            <Link to="/jobs">UI/UX Designer</Link>
            <Link to="/jobs">DevOps</Link>
            <Link to="/jobs">Remote</Link>
          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h3>2,500+</h3>
            <p>Active Job Openings</p>
          </div>
          <div className="stat-card">
            <h3>450+</h3>
            <p>Hiring Companies</p>
          </div>
          <div className="stat-card">
            <h3>18,000+</h3>
            <p>Applications Processed</p>
          </div>
          <div className="stat-card">
            <h3>96%</h3>
            <p>Candidate Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="section-container categories-section">
        <div className="section-header">
          <h2>Explore Popular Categories</h2>
          <p>Find roles suited to your specific skillset and career trajectory.</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <Link to="/jobs" key={idx} className="category-card">
              <div className="category-icon" style={{ backgroundColor: `${cat.color}15` }}>
                <span>{cat.icon}</span>
              </div>
              <h4>{cat.title}</h4>
              <span className="category-count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="section-container featured-section">
        <div className="section-header-flex">
          <div>
            <h2>Featured Job Openings</h2>
            <p>Hand-picked opportunities from our top verified partner employers.</p>
          </div>
          <Link to="/jobs" className="btn btn-outline">
            View All Jobs &rarr;
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading featured opportunities..." />
        ) : (
          <div className="jobs-grid">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={(j) => setSelectedJobForApply(j)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose JobNest */}
      <section className="why-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Why Job Seekers Choose JobNest</h2>
            <p>We build hiring experiences that respect your time and expertise.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>1-Click Streamlined Apply</h3>
              <p>Apply directly without filling repetitive 20-page forms. Submit and track easily.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Transparent Salary Ranges</h3>
              <p>No guessing games. Every listing features verified compensation and benefit ranges.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Direct Employer Access</h3>
              <p>Your profile goes directly to engineering and product managers who make hiring decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Ready to Take the Next Step in Your Career?</h2>
          <p>Browse hundreds of active openings or reach out to our team for recruitment guidance.</p>
          <div className="cta-actions">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              Explore All Jobs Now
            </Link>
            <Link to="/contact" className="btn btn-outline-white btn-lg">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {selectedJobForApply && (
        <ApplyModal
          job={selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
        />
      )}
    </div>
  );
}
