import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceCategories = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Essential guides for new users and implementation basics',
      icon: 'Rocket',
      color: 'bg-blue-500',
      count: 24,
      resources: [
        'Quick Start Guide',
        'First Project Setup',
        'Basic Navigation',
        'Account Configuration'
      ]
    },
    {
      id: 'ai-takeoffs',
      name: 'AI-Powered Takeoffs',
      description: 'Master automated quantity takeoffs and measurement tools',
      icon: 'Zap',
      color: 'bg-purple-500',
      count: 18,
      resources: [
        'AI Detection Training',
        'Measurement Accuracy',
        'Custom Templates',
        'Quality Control'
      ]
    },
    {
      id: 'estimating',
      name: 'Cost Estimating',
      description: 'Advanced estimating techniques and pricing strategies',
      icon: 'DollarSign',
      color: 'bg-green-500',
      count: 15,
      resources: [
        'Pricing Databases',
        'Labor Calculations',
        'Material Costs',
        'Bid Preparation'
      ]
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      description: 'Workflow optimization and team management best practices',
      icon: 'Users',
      color: 'bg-orange-500',
      count: 12,
      resources: [
        'Project Sharing',
        'Review Workflows',
        'Team Permissions',
        'Communication Tools'
      ]
    },
    {
      id: 'integrations',
      name: 'Integrations',
      description: 'Connect BCBP with your existing construction software stack',
      icon: 'Link',
      color: 'bg-cyan-500',
      count: 21,
      resources: [
        'BIM Integration',
        'ERP Connections',
        'API Documentation',
        'Data Export'
      ]
    },
    {
      id: 'industry-insights',
      name: 'Industry Insights',
      description: 'Construction technology trends and market analysis',
      icon: 'TrendingUp',
      color: 'bg-red-500',
      count: 33,
      resources: [
        'Market Reports',
        'Technology Trends',
        'Case Studies',
        'ROI Analysis'
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      description: 'Proven methodologies and workflow optimization strategies',
      icon: 'Award',
      color: 'bg-indigo-500',
      count: 27,
      resources: [
        'Quality Standards',
        'Efficiency Tips',
        'Error Prevention',
        'Process Optimization'
      ]
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      description: 'Common issues, solutions, and technical support guides',
      icon: 'HelpCircle',
      color: 'bg-gray-500',
      count: 19,
      resources: [
        'Common Issues',
        'Error Messages',
        'Performance Tips',
        'Support Contacts'
      ]
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2">Browse by Category</h2>
          <p className="text-text-secondary">Find resources organized by topic and expertise level</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <div
            key={category?.id}
            className="bg-white rounded-lg shadow-professional hover:shadow-professional-lg transition-all duration-normal group cursor-pointer"
            onClick={() => onCategorySelect(category?.id)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${category?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-normal`}>
                  <Icon name={category?.icon} size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {category?.count} resources
                </span>
              </div>

              <h3 className="text-lg font-semibold text-brand-primary mb-2 group-hover:text-accent transition-colors duration-fast">
                {category?.name}
              </h3>
              
              <p className="text-sm text-text-secondary mb-4">
                {category?.description}
              </p>

              <div className="space-y-2 mb-4">
                {category?.resources?.map((resource, index) => (
                  <div key={index} className="flex items-center text-xs text-muted-foreground">
                    <Icon name="ChevronRight" size={12} className="mr-2 text-accent" />
                    {resource}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="group-hover:bg-accent group-hover:text-white group-hover:border-accent"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Explore Category
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Access Section */}
      <div className="mt-12 bg-gradient-to-r from-accent/10 to-conversion/10 rounded-lg p-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-brand-primary mb-2">Need Help Getting Started?</h3>
          <p className="text-text-secondary mb-6">
            Our customer success team is here to help you find the right resources for your needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              asChild
              className="bg-accent hover:bg-accent/90"
              iconName="MessageCircle"
              iconPosition="left"
            >
              <Link to="/support">Contact Support</Link>
            </Button>
            
            <Button
              variant="outline"
              asChild
              iconName="Calendar"
              iconPosition="left"
            >
              <Link to="/demo-request">Schedule Demo</Link>
            </Button>
            
            <Button
              variant="ghost"
              asChild
              iconName="BookOpen"
              iconPosition="left"
            >
              <Link to="/documentation">View Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceCategories;