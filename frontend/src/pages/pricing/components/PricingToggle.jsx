import React from 'react';

const PricingToggle = ({ isAnnual, onToggle }) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="bg-muted rounded-lg p-1 flex items-center">
        <button
          onClick={() => onToggle(false)}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-fast ${
            !isAnnual
              ? 'bg-background text-brand-primary shadow-sm'
              : 'text-text-secondary hover:text-brand-primary'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-fast relative ${
            isAnnual
              ? 'bg-background text-brand-primary shadow-sm'
              : 'text-text-secondary hover:text-brand-primary'
          }`}
        >
          Annual
          <span className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
            Save 20%
          </span>
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;