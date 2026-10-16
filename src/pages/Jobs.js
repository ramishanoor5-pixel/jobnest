import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchJobs } from '../services/jobsApi';
import JobCard from '../components/JobCard';
import JobFilter from '../components/JobFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ApplyModal from '../components/ApplyModal';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);

  const [filters, setFilters] = useState({
    keyword: '',
    category: 'All',
    type: 'All',
    location: 'All'
  });

  const loadJobsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message || 'Unable to retrieve jobs. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobsData();
  }, [loadJobsData]);

  // Extract unique filter dropdown values from loaded jobs
  const categories = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.category).filter(Boolean)));
  }, [jobs]);

  const jobTypes = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.type).filter(Boolean)));
  }, [jobs]);

  const locations = useMemo(() => {
    return ['Remote', 'On-site', 'Hybrid'];
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      category: 'All',
      type: 'All',
      location: 'All'
    });
  };

  // Filtered jobs memoization
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword match (title, company, description)
      const q = filters.keyword.toLowerCase().trim();
      const matchesKeyword =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q);

      // Category match
      const matchesCategory =
        filters.category === 'All' || job.category === filters.category;

      // Type match
      const matchesType =
        filters.type === 'All' || job.type === filters.type;

      // Location match
      const matchesLocation =
        filters.location === 'All' ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesKeyword && matchesCategory && matchesType && matchesLocation;
    });
  }, [jobs, filters]);

  return (
    <div className="page-container jobs-page">
      <header className="jobs-header">
        <h1>Discover Open <span>Positions</span></h1>
        <p className="subtitle">
          Explore curated roles across top engineering, design, and growth teams.
        </p>
      </header>

      {/* Filter component */}
      <JobFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
        jobTypes={jobTypes}
        locations={locations}
        onReset={handleResetFilters}
      />

      {/* Results Header */}
      <div className="results-status-bar">
        <span>
          Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> available jobs
        </span>
      </div>

      {/* Conditional Rendering: Loading, Error, or Results */}
      {loading && <LoadingSpinner message="Fetching latest opportunities from JobNest API..." />}

      {error && !loading && (
        <ErrorMessage message={error} onRetry={loadJobsData} />
      )}

      {!loading && !error && filteredJobs.length === 0 && (
        <div className="no-jobs-found">
          <div className="no-jobs-icon">🔍</div>
          <h3>No matching positions found</h3>
          <p>Try adjusting your search keywords or clearing some filters to see more results.</p>
          <button className="btn btn-outline" onClick={handleResetFilters}>
            Clear All Filters
          </button>
        </div>
      )}

      {!loading && !error && filteredJobs.length > 0 && (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={(j) => setSelectedJobForApply(j)}
            />
          ))}
        </div>
      )}

      {/* Reusable Apply Modal */}
      {selectedJobForApply && (
        <ApplyModal
          job={selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
        />
      )}
    </div>
  );
}
