import React, { useState, useMemo } from 'react';
// Using simple SVG icons instead of react-icons
import { useApp } from '../contexts/AppContext';
import { getAriaLabel } from '../utils/accessibility';

interface ProjectSearchProps {
  projects: any[];
  onFilteredProjects: (projects: any[]) => void;
  className?: string;
}

const ProjectSearch: React.FC<ProjectSearchProps> = ({ 
  projects, 
  onFilteredProjects, 
  className = '' 
}) => {
  const { searchQuery, selectedFilter, setSearchQuery, setSelectedFilter } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique technologies from projects
  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      if (project.tags) {
        project.tags.forEach((tag: string) => techSet.add(tag));
      }
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects based on search query and selected filter
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by technology
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.tags && project.tags.includes(selectedFilter)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.name?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, searchQuery, selectedFilter]);

  // Update filtered projects when filters change
  React.useEffect(() => {
    onFilteredProjects(filteredProjects);
  }, [filteredProjects, onFilteredProjects]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFilter('all');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search projects..."
            className="
              block w-full pl-10 pr-10 py-2
              border border-gray-300 dark:border-gray-600
              rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors duration-200
            "
            aria-label={getAriaLabel('search-projects')}
            aria-describedby="search-help"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="
              inline-flex items-center px-4 py-2
              border border-gray-300 dark:border-gray-600
              rounded-lg
              bg-white dark:bg-gray-800
              text-gray-700 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-colors duration-200
            "
            aria-label={getAriaLabel('filter-projects')}
            aria-expanded={isFilterOpen}
            aria-haspopup="true"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            <span className="hidden sm:inline">
              {selectedFilter === 'all' ? 'All Technologies' : selectedFilter}
            </span>
            <span className="sm:hidden">Filter</span>
          </button>

          {/* Filter Dropdown Menu */}
          {isFilterOpen && (
            <div
              className="
                absolute right-0 mt-2 w-48
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-lg shadow-lg
                z-10
              "
              role="menu"
              aria-orientation="vertical"
            >
              <div className="py-1">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`
                    block w-full text-left px-4 py-2 text-sm
                    ${selectedFilter === 'all' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                  role="menuitem"
                >
                  All Technologies
                </button>
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleFilterChange(tech)}
                    className={`
                      block w-full text-left px-4 py-2 text-sm
                      ${selectedFilter === tech 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                    role="menuitem"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear All Button */}
        {(searchQuery || selectedFilter !== 'all') && (
          <button
            onClick={clearFilters}
            className="
              inline-flex items-center px-3 py-2
              text-sm text-gray-600 dark:text-gray-400
              hover:text-gray-800 dark:hover:text-gray-200
              focus:outline-none focus:underline
              transition-colors duration-200
            "
            aria-label="Clear all filters"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Search Help Text */}
      <p id="search-help" className="text-sm text-gray-500 dark:text-gray-400">
        Search by project name, description, or technology. Use filters to narrow down by specific technologies.
      </p>

      {/* Results Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {filteredProjects.length === projects.length ? (
          <span>Showing all {projects.length} projects</span>
        ) : (
          <span>
            Showing {filteredProjects.length} of {projects.length} projects
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedFilter !== 'all' && ` in ${selectedFilter}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectSearch;
