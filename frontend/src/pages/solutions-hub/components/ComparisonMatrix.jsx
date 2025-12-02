import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonMatrix = ({ selectedRole }) => {
  const [comparisonView, setComparisonView] = useState('features');

  const roleComparisons = {
    'quantity-surveyor': {
      title: 'Quantity Surveyor Solutions',
      traditional: {
        name: 'Traditional Methods',
        features: [
          { name: 'Manual measurements', status: 'limited', description: 'Time-consuming and error-prone' },
          { name: 'Basic CAD tools', status: 'partial', description: 'Limited automation capabilities' },
          { name: 'Excel calculations', status: 'manual', description: 'Manual formulas and updates' },
          { name: 'Version control', status: 'poor', description: 'Email-based file sharing' },
          { name: 'Collaboration', status: 'limited', description: 'Sequential workflow only' },
          { name: 'Reporting', status: 'manual', description: 'Manual report generation' }
        ],
        metrics: {
          accuracy: '75%',
          speed: '1x',
          collaboration: 'Limited',
          cost: 'High labor cost'
        }
      },
      BCBP: {
        name: 'BCBP AI Solution',
        features: [
          { name: 'AI-powered detection', status: 'advanced', description: 'Automatic element recognition' },
          { name: 'Smart measurements', status: 'automated', description: 'Instant accurate calculations' },
          { name: 'Real-time updates', status: 'automatic', description: 'Live synchronization across team' },
          { name: 'Cloud collaboration', status: 'excellent', description: 'Real-time team collaboration' },
          { name: 'Integrated workflows', status: 'seamless', description: 'End-to-end process automation' },
          { name: 'Smart reporting', status: 'automated', description: 'One-click professional reports' }
        ],
        metrics: {
          accuracy: '95%',
          speed: '10x',
          collaboration: 'Real-time',
          cost: '70% reduction'
        }
      }
    },
    'cost-estimator': {
      title: 'Cost Estimator Solutions',
      traditional: {
        name: 'Traditional Methods',
        features: [
          { name: 'Manual pricing lookup', status: 'limited', description: 'Time-intensive research' },
          { name: 'Static databases', status: 'outdated', description: 'Infrequent price updates' },
          { name: 'Spreadsheet calculations', status: 'manual', description: 'Error-prone formulas' },
          { name: 'Market analysis', status: 'limited', description: 'Basic historical data' },
          { name: 'Bid preparation', status: 'manual', description: 'Manual document creation' },
          { name: 'Change orders', status: 'reactive', description: 'Manual recalculation needed' }
        ],
        metrics: {
          accuracy: '78%',
          speed: '1x',
          marketData: 'Quarterly',
          cost: 'High overhead'
        }
      },
      BCBP: {
        name: 'BCBP AI Solution',
        features: [
          { name: 'Automated pricing', status: 'advanced', description: 'Real-time market integration' },
          { name: 'Dynamic databases', status: 'live', description: 'Daily price updates' },
          { name: 'Smart calculations', status: 'automated', description: 'AI-powered cost modeling' },
          { name: 'Predictive analysis', status: 'excellent', description: 'Market trend forecasting' },
          { name: 'Instant proposals', status: 'automated', description: 'Professional bid generation' },
          { name: 'Change management', status: 'proactive', description: 'Automatic impact analysis' }
        ],
        metrics: {
          accuracy: '92%',
          speed: '8x',
          marketData: 'Real-time',
          cost: '60% reduction'
        }
      }
    },
    'contractor': {
      title: 'General Contractor Solutions',
      traditional: {
        name: 'Traditional Methods',
        features: [
          { name: 'Manual coordination', status: 'limited', description: 'Phone and email communication' },
          { name: 'Paper documentation', status: 'outdated', description: 'Physical file management' },
          { name: 'Weekly meetings', status: 'scheduled', description: 'Fixed update intervals' },
          { name: 'Change order processing', status: 'slow', description: 'Multi-step approval process' },
          { name: 'Progress tracking', status: 'manual', description: 'Visual inspection based' },
          { name: 'Subcontractor management', status: 'basic', description: 'Limited visibility' }
        ],
        metrics: {
          efficiency: '65%',
          communication: 'Delayed',
          visibility: 'Limited',
          cost: 'High admin'
        }
      },
      BCBP: {
        name: 'BCBP AI Solution',
        features: [
          { name: 'Digital coordination', status: 'advanced', description: 'Unified communication platform' },
          { name: 'Cloud documentation', status: 'modern', description: 'Centralized digital files' },
          { name: 'Real-time updates', status: 'instant', description: 'Live project monitoring' },
          { name: 'Automated workflows', status: 'streamlined', description: 'Digital approval processes' },
          { name: 'AI progress tracking', status: 'intelligent', description: 'Automated milestone detection' },
          { name: 'Integrated management', status: 'comprehensive', description: 'Complete trade visibility' }
        ],
        metrics: {
          efficiency: '90%',
          communication: 'Instant',
          visibility: 'Complete',
          cost: '40% reduction'
        }
      }
    },
    'project-manager': {
      title: 'Project Manager Solutions',
      traditional: {
        name: 'Traditional Methods',
        features: [
          { name: 'Status meetings', status: 'scheduled', description: 'Weekly or bi-weekly updates' },
          { name: 'Email communication', status: 'fragmented', description: 'Scattered information' },
          { name: 'Manual reporting', status: 'time-consuming', description: 'Hours of data compilation' },
          { name: 'Decision delays', status: 'slow', description: 'Information gathering bottlenecks' },
          { name: 'Risk identification', status: 'reactive', description: 'Issue-based responses' },
          { name: 'Team coordination', status: 'challenging', description: 'Multiple tool management' }
        ],
        metrics: {
          decisionSpeed: '3-5 days',
          teamAlignment: '70%',
          riskMitigation: 'Reactive',
          cost: 'High overhead'
        }
      },
      BCBP: {
        name: 'BCBP AI Solution',
        features: [
          { name: 'Live dashboards', status: 'real-time', description: 'Instant project visibility' },
          { name: 'Unified communication', status: 'centralized', description: 'Single source of truth' },
          { name: 'Automated reporting', status: 'instant', description: 'One-click status reports' },
          { name: 'Data-driven decisions', status: 'fast', description: 'Real-time insights available' },
          { name: 'Predictive analytics', status: 'proactive', description: 'Early risk identification' },
          { name: 'Integrated workflows', status: 'seamless', description: 'Single platform management' }
        ],
        metrics: {
          decisionSpeed: 'Same day',
          teamAlignment: '95%',
          riskMitigation: 'Proactive',
          cost: '50% reduction'
        }
      }
    }
  };

  const currentComparison = roleComparisons?.[selectedRole] || roleComparisons?.['quantity-surveyor'];

  const getStatusIcon = (status) => {
    const statusConfig = {
      'limited': { icon: 'AlertTriangle', color: 'text-warning' },
      'partial': { icon: 'Minus', color: 'text-warning' },
      'manual': { icon: 'Hand', color: 'text-error' },
      'poor': { icon: 'X', color: 'text-error' },
      'outdated': { icon: 'Clock', color: 'text-error' },
      'scheduled': { icon: 'Calendar', color: 'text-warning' },
      'slow': { icon: 'Turtle', color: 'text-warning' },
      'basic': { icon: 'Circle', color: 'text-warning' },
      'challenging': { icon: 'AlertCircle', color: 'text-warning' },
      'fragmented': { icon: 'Zap', color: 'text-warning' },
      'time-consuming': { icon: 'Clock', color: 'text-error' },
      'reactive': { icon: 'RotateCcw', color: 'text-warning' },
      'advanced': { icon: 'Zap', color: 'text-success' },
      'automated': { icon: 'Bot', color: 'text-success' },
      'automatic': { icon: 'RefreshCw', color: 'text-success' },
      'excellent': { icon: 'Star', color: 'text-success' },
      'seamless': { icon: 'Link', color: 'text-success' },
      'live': { icon: 'Radio', color: 'text-success' },
      'modern': { icon: 'Smartphone', color: 'text-success' },
      'instant': { icon: 'Zap', color: 'text-success' },
      'streamlined': { icon: 'ArrowRight', color: 'text-success' },
      'intelligent': { icon: 'Brain', color: 'text-success' },
      'comprehensive': { icon: 'Grid', color: 'text-success' },
      'real-time': { icon: 'Activity', color: 'text-success' },
      'centralized': { icon: 'Target', color: 'text-success' },
      'fast': { icon: 'Zap', color: 'text-success' },
      'proactive': { icon: 'Shield', color: 'text-success' }
    };

    const config = statusConfig?.[status] || { icon: 'Circle', color: 'text-text-secondary' };
    return <Icon name={config?.icon} size={16} className={config?.color} />;
  };

  return (
    <div className="bg-muted py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary mb-4">
            {currentComparison?.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            See how BCBP transforms your workflow compared to traditional methods
          </p>
        </div>

        {/* Comparison Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setComparisonView('features')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-normal ${
                comparisonView === 'features' ?'bg-accent text-white shadow-sm' :'text-text-secondary hover:text-brand-primary'
              }`}
            >
              Feature Comparison
            </button>
            <button
              onClick={() => setComparisonView('metrics')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-normal ${
                comparisonView === 'metrics' ?'bg-accent text-white shadow-sm' :'text-text-secondary hover:text-brand-primary'
              }`}
            >
              Performance Metrics
            </button>
          </div>
        </div>

        {comparisonView === 'features' ? (
          /* Feature Comparison */
          (<div className="bg-white rounded-xl shadow-professional overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Traditional Column */}
              <div className="p-8 border-r border-border">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto bg-error/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="AlertTriangle" size={32} className="text-error" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-2">
                    {currentComparison?.traditional?.name}
                  </h3>
                  <p className="text-text-secondary">Current industry standard</p>
                </div>

                <div className="space-y-4">
                  {currentComparison?.traditional?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      {getStatusIcon(feature?.status)}
                      <div className="flex-1">
                        <h4 className="font-medium text-brand-primary mb-1">{feature?.name}</h4>
                        <p className="text-sm text-text-secondary">{feature?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BCBP Column */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Zap" size={32} className="text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-2">
                    {currentComparison?.BCBP?.name}
                  </h3>
                  <p className="text-text-secondary">AI-powered transformation</p>
                </div>

                <div className="space-y-4">
                  {currentComparison?.BCBP?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-success/5 border border-success/20">
                      {getStatusIcon(feature?.status)}
                      <div className="flex-1">
                        <h4 className="font-medium text-brand-primary mb-1">{feature?.name}</h4>
                        <p className="text-sm text-text-secondary">{feature?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>)
        ) : (
          /* Metrics Comparison */
          (<div className="bg-white rounded-xl shadow-professional p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Metrics */}
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-6 text-center">
                  Traditional Performance
                </h3>
                <div className="space-y-4">
                  {Object.entries(currentComparison?.traditional?.metrics)?.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-4 bg-error/5 rounded-lg border border-error/20">
                      <span className="font-medium text-brand-primary capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </span>
                      <span className="text-error font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/*  Metrics */}
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-6 text-center">
                  BCBP Performance
                </h3>
                <div className="space-y-4">
                  {Object.entries(currentComparison?.BCBP?.metrics)?.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-4 bg-success/5 rounded-lg border border-success/20">
                      <span className="font-medium text-brand-primary capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </span>
                      <span className="text-success font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>)
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-brand-primary mb-4">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of construction professionals who have already made the switch to AI-powered efficiency
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
              iconName="Play"
              iconPosition="left"
            >
              Watch Demo
            </Button>
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-white"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMatrix;