import React from 'react';

export default function JobFilter({
  filters,
  onFilterChange,
  categories = [],
  jobTypes = [],
  locations = [],
  onReset
}) {
  return (
    <div className="job-filter-card">
      <div className="filter-row-primary">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            name="keyword"
            placeholder="Search by job title, skill, or company..."
            value={filters.keyword}
            onChange={(e) => onFilterChange('keyword', e.target.value)}
            className="filter-search-input"
          />
        </div>
      </div>

      <div className="filter-row-secondary">
        <div className="filter-control">
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="filter-type">Job Type</label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
          >
            <option value="All">All Types</option>
            {jobTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="filter-location">Location Mode</label>
          <select
            id="filter-location"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
          >
            <option value="All">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button
            type="button"
            onClick={onReset}
            className="btn btn-outline btn-reset"
            title="Reset filters"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
