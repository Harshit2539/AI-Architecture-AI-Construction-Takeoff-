import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonTable = () => {
  const [activeCategory, setActiveCategory] = useState('core');

  const categories = [
    { id: 'core', name: 'Core Features', icon: 'Zap' },
    { id: 'ai', name: 'AI & Automation', icon: 'Brain' },
    { id: 'collaboration', name: 'Collaboration', icon: 'Users' },
    { id: 'integrations', name: 'Integrations', icon: 'Link' },
    { id: 'support', name: 'Support & Training', icon: 'HeadphonesIcon' }
  ];

  const features = {
    core: [
      { name: 'AI-Powered Takeoffs', starter: true, professional: true, enterprise: true },
      { name: 'Digital Plan Upload', starter: true, professional: true, enterprise: true },
      { name: 'Measurement Tools', starter: 'Basic', professional: 'Advanced', enterprise: 'Advanced' },
      { name: 'Material Calculations', starter: true, professional: true, enterprise: true },
      { name: 'Export Capabilities', starter: 'PDF', professional: 'PDF, Excel, CSV', enterprise: 'All Formats' },
      { name: 'Project Templates', starter: '5', professional: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Cloud Storage', starter: '5GB', professional: '100GB', enterprise: 'Unlimited' }
    ],
    ai: [
      { name: 'Auto-Detection Accuracy', starter: '85%', professional: '95%', enterprise: '99%' },
      { name: 'Machine Learning Models', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
      { name: 'Pattern Recognition', starter: true, professional: true, enterprise: true },
      { name: 'Smart Suggestions', starter: false, professional: true, enterprise: true },
      { name: 'Custom AI Training', starter: false, professional: false, enterprise: true },
      { name: 'Batch Processing', starter: '10 files', professional: '100 files', enterprise: 'Unlimited' }
    ],
    collaboration: [
      { name: 'Team Members', starter: '3', professional: '25', enterprise: 'Unlimited' },
      { name: 'Real-time Collaboration', starter: false, professional: true, enterprise: true },
      { name: 'Comment System', starter: false, professional: true, enterprise: true },
      { name: 'Version Control', starter: 'Basic', professional: 'Advanced', enterprise: 'Enterprise' },
      { name: 'Role-based Permissions', starter: false, professional: true, enterprise: true },
      { name: 'Client Portal Access', starter: false, professional: false, enterprise: true }
    ],
    integrations: [
      { name: 'API Access', starter: false, professional: 'Limited', enterprise: 'Full' },
      { name: 'Estimating Software', starter: '2', professional: '10+', enterprise: 'All' },
      { name: 'BIM Integration', starter: false, professional: true, enterprise: true },
      { name: 'ERP Systems', starter: false, professional: false, enterprise: true },
      { name: 'Custom Integrations', starter: false, professional: false, enterprise: true },
      { name: 'Webhook Support', starter: false, professional: true, enterprise: true }
    ],
    support: [
      { name: 'Email Support', starter: true, professional: true, enterprise: true },
      { name: 'Live Chat', starter: false, professional: true, enterprise: true },
      { name: 'Phone Support', starter: false, professional: false, enterprise: true },
      { name: 'Dedicated Account Manager', starter: false, professional: false, enterprise: true },
      { name: 'Training Sessions', starter: '1', professional: '5', enterprise: 'Unlimited' },
      { name: 'Implementation Support', starter: false, professional: true, enterprise: 'White-glove' }
    ]
  };

  const renderFeatureValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="Check" size={20} className="text-success mx-auto" />
      ) : (
        <Icon name="X" size={20} className="text-text-secondary mx-auto" />
      );
    }
    return <span className="text-sm font-medium text-brand-primary">{value}</span>;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-2xl font-bold text-brand-primary mb-2">Feature Comparison</h3>
        <p className="text-text-secondary">
          Compare features across all BCBP plans to find the perfect fit for your team
        </p>
      </div>
      {/* Category Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-fast ${
                activeCategory === category?.id
                  ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-text-secondary hover:text-brand-primary hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="text-left p-4 font-semibold text-brand-primary">Feature</th>
              <th className="text-center p-4 font-semibold text-brand-primary min-w-[120px]">Starter</th>
              <th className="text-center p-4 font-semibold text-brand-primary min-w-[120px] bg-accent/10">
                Professional
                <div className="text-xs text-accent font-normal mt-1">Most Popular</div>
              </th>
              <th className="text-center p-4 font-semibold text-brand-primary min-w-[120px]">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features?.[activeCategory]?.map((feature, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors duration-fast">
                <td className="p-4 font-medium text-text-primary">{feature?.name}</td>
                <td className="p-4 text-center">{renderFeatureValue(feature?.starter)}</td>
                <td className="p-4 text-center bg-accent/5">{renderFeatureValue(feature?.professional)}</td>
                <td className="p-4 text-center">{renderFeatureValue(feature?.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-muted">
        <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
          <Icon name="Info" size={16} />
          <span>Need a custom plan? Contact our sales team for enterprise pricing and features.</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;