import React from 'react';
import Icon from '../../../components/AppIcon';

const TrialFeatures = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'AI-Powered Takeoffs',
      description: 'Automatically detect and measure construction elements from blueprints with 99.5% accuracy'
    },
    {
      icon: 'Calculator',
      title: 'Smart Estimating',
      description: 'Generate detailed cost estimates with real-time material pricing and labor calculations'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Share projects, review estimates, and collaborate with team members in real-time'
    },
    {
      icon: 'FileText',
      title: 'Professional Reports',
      description: 'Export detailed takeoff reports and estimates in multiple formats (PDF, Excel, CSV)'
    },
    {
      icon: 'Layers',
      title: 'Multi-Trade Support',
      description: 'Handle electrical, plumbing, HVAC, concrete, framing, and more construction trades'
    },
    {
      icon: 'Cloud',
      title: 'Cloud Storage',
      description: 'Secure cloud storage for all your projects with automatic backup and sync'
    }
  ];

  return (
    <div className="bg-muted rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-primary mb-2">
          Everything You Need to Get Started
        </h3>
        <p className="text-text-secondary">
          Full access to all BCBP features during your 14-day trial
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={24} className="text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-brand-primary mb-1">
                {feature?.title}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-white rounded-xl border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-brand-primary mb-1">
              Need Help Getting Started?
            </h4>
            <p className="text-sm text-text-secondary">
              Our onboarding specialists are here to help you succeed
            </p>
          </div>
          <div className="flex items-center space-x-2 text-accent">
            <Icon name="MessageCircle" size={20} />
            <span className="font-medium">Live Chat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialFeatures;