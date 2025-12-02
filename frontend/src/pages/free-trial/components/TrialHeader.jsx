import React from 'react';
import Icon from '../../../components/AppIcon';

const TrialHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
            <Icon name="Zap" size={32} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-conversion rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={14} className="text-white" />
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-4">
        Start Your Free Trial
      </h1>
      
      <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
        Experience the power of AI-driven construction takeoffs and estimating. 
        No credit card required. Full access to all features for 14 days.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <div className="flex items-center space-x-2 text-success">
          <Icon name="Check" size={20} />
          <span className="font-medium">14-day free trial</span>
        </div>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="Check" size={20} />
          <span className="font-medium">No credit card required</span>
        </div>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="Check" size={20} />
          <span className="font-medium">Full feature access</span>
        </div>
      </div>
    </div>
  );
};

export default TrialHeader;