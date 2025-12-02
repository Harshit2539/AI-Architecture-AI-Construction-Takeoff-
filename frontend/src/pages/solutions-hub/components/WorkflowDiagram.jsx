import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowDiagram = ({ selectedRole }) => {
  const [activeStep, setActiveStep] = useState(0);

  const workflows = {
    'quantity-surveyor': {
      title: 'Quantity Surveyor Workflow',
      description: 'From blueprint to accurate material quantities in minutes',
      steps: [
        {
          id: 1,
          title: 'Upload Plans',
          description: 'Import PDF drawings or CAD files',
          icon: 'Upload',
          time: '30 seconds',
          traditional: '5-10 minutes',
          improvement: '95% faster'
        },
        {
          id: 2,
          title: 'AI Detection',
          description: 'Automatic recognition of building elements',
          icon: 'Eye',
          time: '2 minutes',
          traditional: '2-4 hours',
          improvement: '90% time saved'
        },
        {
          id: 3,
          title: 'Review & Adjust',
          description: 'Verify measurements and make corrections',
          icon: 'Edit',
          time: '5 minutes',
          traditional: '30-60 minutes',
          improvement: '85% reduction'
        },
        {
          id: 4,
          title: 'Generate Report',
          description: 'Export detailed quantity schedules',
          icon: 'FileText',
          time: '1 minute',
          traditional: '15-30 minutes',
          improvement: '95% faster'
        }
      ]
    },
    'cost-estimator': {
      title: 'Cost Estimator Workflow',
      description: 'From quantities to competitive bids with real-time pricing',
      steps: [
        {
          id: 1,
          title: 'Import Quantities',
          description: 'Load takeoff data or create new estimates',
          icon: 'Database',
          time: '1 minute',
          traditional: '10-15 minutes',
          improvement: '90% faster'
        },
        {
          id: 2,
          title: 'Apply Pricing',
          description: 'Automated pricing from integrated databases',
          icon: 'DollarSign',
          time: '3 minutes',
          traditional: '1-2 hours',
          improvement: '85% time saved'
        },
        {
          id: 3,
          title: 'Market Analysis',
          description: 'Real-time market rates and historical trends',
          icon: 'TrendingUp',
          time: '2 minutes',
          traditional: '30-45 minutes',
          improvement: '92% reduction'
        },
        {
          id: 4,
          title: 'Bid Preparation',
          description: 'Professional proposals with detailed breakdowns',
          icon: 'FileCheck',
          time: '5 minutes',
          traditional: '45-90 minutes',
          improvement: '88% faster'
        }
      ]
    },
    'contractor': {
      title: 'General Contractor Workflow',
      description: 'From project planning to execution coordination',
      steps: [
        {
          id: 1,
          title: 'Project Setup',
          description: 'Initialize project with drawings and specifications',
          icon: 'FolderPlus',
          time: '5 minutes',
          traditional: '30-60 minutes',
          improvement: '85% faster'
        },
        {
          id: 2,
          title: 'Trade Coordination',
          description: 'Assign work packages to subcontractors',
          icon: 'Users',
          time: '10 minutes',
          traditional: '2-4 hours',
          improvement: '90% time saved'
        },
        {
          id: 3,
          title: 'Progress Tracking',
          description: 'Real-time updates and milestone monitoring',
          icon: 'BarChart3',
          time: 'Continuous',
          traditional: 'Weekly meetings',
          improvement: 'Real-time visibility'
        },
        {
          id: 4,
          title: 'Change Management',
          description: 'Automated change order processing',
          icon: 'RefreshCw',
          time: '5 minutes',
          traditional: '2-3 hours',
          improvement: '92% reduction'
        }
      ]
    },
    'project-manager': {
      title: 'Project Manager Workflow',
      description: 'From planning to delivery with complete visibility',
      steps: [
        {
          id: 1,
          title: 'Team Setup',
          description: 'Configure project team and permissions',
          icon: 'UserPlus',
          time: '3 minutes',
          traditional: '20-30 minutes',
          improvement: '85% faster'
        },
        {
          id: 2,
          title: 'Communication Hub',
          description: 'Centralized project communication',
          icon: 'MessageSquare',
          time: 'Instant',
          traditional: 'Email chains',
          improvement: '100% organized'
        },
        {
          id: 3,
          title: 'Progress Reports',
          description: 'Automated status reports and dashboards',
          icon: 'PieChart',
          time: 'Auto-generated',
          traditional: '2-4 hours weekly',
          improvement: '95% time saved'
        },
        {
          id: 4,
          title: 'Decision Making',
          description: 'Data-driven insights for faster decisions',
          icon: 'Lightbulb',
          time: 'Real-time',
          traditional: 'Days to weeks',
          improvement: '80% faster'
        }
      ]
    }
  };

  const currentWorkflow = workflows?.[selectedRole] || workflows?.['quantity-surveyor'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentWorkflow?.steps?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentWorkflow?.steps?.length]);

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary mb-4">
            {currentWorkflow?.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {currentWorkflow?.description}
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-border hidden lg:block">
            <div 
              className="h-full bg-accent transition-all duration-1000 ease-out"
              style={{ width: `${((activeStep + 1) / currentWorkflow?.steps?.length) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentWorkflow?.steps?.map((step, index) => (
              <div
                key={step?.id}
                className={`relative transition-all duration-500 ${
                  index <= activeStep ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-2'
                }`}
              >
                {/* Step Circle */}
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                  index <= activeStep 
                    ? 'bg-accent text-white shadow-lg scale-110' 
                    : 'bg-muted text-brand-primary'
                }`}>
                  <Icon name={step?.icon} size={24} />
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="font-semibold text-brand-primary mb-2">
                    {step?.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {step?.description}
                  </p>

                  {/* Time Comparison */}
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-text-secondary">With BCBP:</span>
                      <span className="text-sm font-semibold text-accent">{step?.time}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-text-secondary">Traditional:</span>
                      <span className="text-sm text-text-secondary">{step?.traditional}</span>
                    </div>
                    <div className="text-xs font-semibold text-success">
                      {step?.improvement}
                    </div>
                  </div>
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {step?.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Controls */}
        <div className="flex justify-center mt-12 space-x-2">
          {currentWorkflow?.steps?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep ? 'bg-accent' : 'bg-border hover:bg-accent/50'
              }`}
            />
          ))}
        </div>

        {/* Overall Benefits */}
        <div className="mt-16 bg-gradient-to-r from-accent/5 to-conversion/5 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-2">
              Transform Your Workflow Today
            </h3>
            <p className="text-text-secondary">
              Join thousands of construction professionals who have revolutionized their processes with BCBP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">85%</div>
              <div className="text-sm text-text-secondary">Average Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">92%</div>
              <div className="text-sm text-text-secondary">Accuracy Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-conversion mb-2">$50K+</div>
              <div className="text-sm text-text-secondary">Annual Cost Savings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram;