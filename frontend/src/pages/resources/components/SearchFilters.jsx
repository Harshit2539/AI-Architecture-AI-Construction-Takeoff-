import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const resourceTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'tutorial', label: 'Tutorials' },
    { value: 'guide', label: 'Guides' },
    { value: 'webinar', label: 'Webinars' },
    { value: 'case-study', label: 'Case Studies' },
    { value: 'tool', label: 'Tools' },
    { value: 'whitepaper', label: 'Whitepapers' },
    { value: 'blog', label: 'Blog Posts' },
    { value: 'template', label: 'Templates' }
  ];

  const experienceLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const userRoles = [
    { value: 'all', label: 'All Roles' },
    { value: 'quantity-surveyor', label: 'Quantity Surveyor' },
    { value: 'cost-estimator', label: 'Cost Estimator' },
    { value: 'project-manager', label: 'Project Manager' },
    { value: 'contractor', label: 'Contractor' },
    { value: 'bim-specialist', label: 'BIM Specialist' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-viewed', label: 'Most Viewed' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'relevance', label: 'Most Relevant' }
  ];

  const handleInputChange = (field, value) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleCheckboxChange = (field, checked) => {
    onFiltersChange({ ...filters, [field]: checked });
  };

  return (
    <div className="bg-white rounded-lg shadow-professional p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-brand-primary flex items-center">
          <Icon name="Search" size={20} className="mr-2" />
          Search & Filter Resources
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {isExpanded ? 'Less Filters' : 'More Filters'}
        </Button>
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search resources, tutorials, guides..."
          value={filters?.searchQuery}
          onChange={(e) => handleInputChange('searchQuery', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Resource Type"
          options={resourceTypes}
          value={filters?.type}
          onChange={(value) => handleInputChange('type', value)}
        />
        
        <Select
          label="Experience Level"
          options={experienceLevels}
          value={filters?.level}
          onChange={(value) => handleInputChange('level', value)}
        />
        
        <Select
          label="Target Role"
          options={userRoles}
          value={filters?.role}
          onChange={(value) => handleInputChange('role', value)}
        />
        
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleInputChange('sortBy', value)}
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Content Preferences */}
            <div>
              <h3 className="font-medium text-brand-primary mb-3">Content Preferences</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Premium Content Only"
                  checked={filters?.premiumOnly}
                  onChange={(e) => handleCheckboxChange('premiumOnly', e?.target?.checked)}
                />
                <Checkbox
                  label="Recently Updated"
                  checked={filters?.recentlyUpdated}
                  onChange={(e) => handleCheckboxChange('recentlyUpdated', e?.target?.checked)}
                />
                <Checkbox
                  label="Interactive Tools"
                  checked={filters?.interactiveOnly}
                  onChange={(e) => handleCheckboxChange('interactiveOnly', e?.target?.checked)}
                />
                <Checkbox
                  label="Downloadable Resources"
                  checked={filters?.downloadable}
                  onChange={(e) => handleCheckboxChange('downloadable', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Industry Focus */}
            <div>
              <h3 className="font-medium text-brand-primary mb-3">Industry Focus</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Residential Construction"
                  checked={filters?.residential}
                  onChange={(e) => handleCheckboxChange('residential', e?.target?.checked)}
                />
                <Checkbox
                  label="Commercial Construction"
                  checked={filters?.commercial}
                  onChange={(e) => handleCheckboxChange('commercial', e?.target?.checked)}
                />
                <Checkbox
                  label="Infrastructure Projects"
                  checked={filters?.infrastructure}
                  onChange={(e) => handleCheckboxChange('infrastructure', e?.target?.checked)}
                />
                <Checkbox
                  label="Renovation & Retrofit"
                  checked={filters?.renovation}
                  onChange={(e) => handleCheckboxChange('renovation', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Technology Topics */}
            <div>
              <h3 className="font-medium text-brand-primary mb-3">Technology Topics</h3>
              <div className="space-y-3">
                <Checkbox
                  label="AI & Machine Learning"
                  checked={filters?.aiMl}
                  onChange={(e) => handleCheckboxChange('aiMl', e?.target?.checked)}
                />
                <Checkbox
                  label="BIM Integration"
                  checked={filters?.bim}
                  onChange={(e) => handleCheckboxChange('bim', e?.target?.checked)}
                />
                <Checkbox
                  label="Digital Transformation"
                  checked={filters?.digitalTransformation}
                  onChange={(e) => handleCheckboxChange('digitalTransformation', e?.target?.checked)}
                />
                <Checkbox
                  label="Workflow Optimization"
                  checked={filters?.workflow}
                  onChange={(e) => handleCheckboxChange('workflow', e?.target?.checked)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;