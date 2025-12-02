import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalizedDemo = ({ selectedRole }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: selectedRole || 'quantity-surveyor',
    industry: '',
    projectSize: '',
    currentTools: '',
    challenges: '',
    demoType: 'live'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const roleOptions = [
    { value: 'quantity-surveyor', label: 'Quantity Surveyor' },
    { value: 'cost-estimator', label: 'Cost Estimator' },
    { value: 'contractor', label: 'General Contractor' },
    { value: 'project-manager', label: 'Project Manager' },
    { value: 'bim-specialist', label: 'BIM Specialist' },
    { value: 'other', label: 'Other' }
  ];

  const industryOptions = [
    { value: 'commercial', label: 'Commercial Construction' },
    { value: 'residential', label: 'Residential Construction' },
    { value: 'industrial', label: 'Industrial Construction' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'specialty', label: 'Specialty Trades' },
    { value: 'other', label: 'Other' }
  ];

  const projectSizeOptions = [
    { value: 'small', label: 'Small ($100K - $1M)' },
    { value: 'medium', label: 'Medium ($1M - $10M)' },
    { value: 'large', label: 'Large ($10M - $100M)' },
    { value: 'enterprise', label: 'Enterprise ($100M+)' }
  ];

  const currentToolsOptions = [
    { value: 'excel', label: 'Excel/Spreadsheets' },
    { value: 'autocad', label: 'AutoCAD' },
    { value: 'revit', label: 'Revit' },
    { value: 'bluebeam', label: 'Bluebeam' },
    { value: 'planswift', label: 'PlanSwift' },
    { value: 'sage', label: 'Sage Estimating' },
    { value: 'procore', label: 'Procore' },
    { value: 'other', label: 'Other' }
  ];

  const challengesOptions = [
    { value: 'accuracy', label: 'Measurement Accuracy' },
    { value: 'time', label: 'Time Consumption' },
    { value: 'collaboration', label: 'Team Collaboration' },
    { value: 'version-control', label: 'Version Control' },
    { value: 'reporting', label: 'Report Generation' },
    { value: 'integration', label: 'Tool Integration' },
    { value: 'training', label: 'Team Training' },
    { value: 'cost', label: 'Cost Management' }
  ];

  const demoTypeOptions = [
    { value: 'live', label: 'Live Demo (30 min)' },
    { value: 'recorded', label: 'Recorded Demo (15 min)' },
    { value: 'trial', label: 'Free Trial Access' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Mock form submission
    setIsSubmitted(true);
  };

  const getDemoContent = () => {
    const roleContent = {
      'quantity-surveyor': {
        title: 'Quantity Surveyor Demo',
        features: ['AI-powered takeoff automation', 'Measurement accuracy validation', 'Material quantity reports'],
        duration: '30 minutes',
        highlights: 'See how AI detects and measures building elements automatically'
      },
      'cost-estimator': {
        title: 'Cost Estimator Demo',
        features: ['Real-time pricing integration', 'Automated cost calculations', 'Competitive bid generation'],
        duration: '30 minutes',
        highlights: 'Experience instant cost analysis with market-rate pricing'
      },
      'contractor': {
        title: 'General Contractor Demo',
        features: ['Project coordination tools', 'Subcontractor management', 'Progress tracking dashboard'],
        duration: '30 minutes',
        highlights: 'Discover unified project management and team coordination'
      },
      'project-manager': {
        title: 'Project Manager Demo',
        features: ['Real-time project dashboards', 'Team communication hub', 'Automated reporting'],
        duration: '30 minutes',
        highlights: 'See complete project visibility and data-driven insights'
      }
    };

    return roleContent?.[selectedRole] || roleContent?.['quantity-surveyor'];
  };

  const demoContent = getDemoContent();

  if (isSubmitted) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-6">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>
            <h2 className="text-3xl font-bold text-brand-primary mb-4">
              Demo Scheduled Successfully!
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Thank you for your interest in BCBP. We'll send you a calendar invite within the next hour with your personalized demo details.
            </p>
            
            <div className="bg-muted rounded-xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-brand-primary mb-4">What to Expect</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <Icon name="Calendar" size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-brand-primary">Scheduled Demo</h4>
                    <p className="text-sm text-text-secondary">Personalized {demoContent?.duration} session</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="User" size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-brand-primary">Expert Guide</h4>
                    <p className="text-sm text-text-secondary">Construction technology specialist</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Zap" size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-brand-primary">Live AI Demo</h4>
                    <p className="text-sm text-text-secondary">Real-time feature demonstration</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="MessageSquare" size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-brand-primary">Q&A Session</h4>
                    <p className="text-sm text-text-secondary">Address your specific questions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                iconName="Play"
                iconPosition="left"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white"
                iconName="Download"
                iconPosition="left"
              >
                Download Resources
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary mb-4">
            Get Your Personalized Demo
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            See BCBP in action with a demo tailored to your specific role, industry, and challenges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Demo Information */}
          <div>
            <div className="bg-gradient-to-br from-accent/5 to-conversion/5 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">
                {demoContent?.title}
              </h3>
              <p className="text-text-secondary mb-6">
                {demoContent?.highlights}
              </p>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-brand-primary">Demo Includes:</h4>
                <ul className="space-y-2">
                  {demoContent?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>{demoContent?.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>1-on-1 session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Flexible scheduling</span>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <Icon name="Shield" size={20} className="text-success" />
                <div>
                  <h4 className="font-medium text-brand-primary">Secure & Private</h4>
                  <p className="text-sm text-text-secondary">Your information is protected and never shared</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <Icon name="Award" size={20} className="text-accent" />
                <div>
                  <h4 className="font-medium text-brand-primary">Expert Guidance</h4>
                  <p className="text-sm text-text-secondary">Led by construction technology specialists</p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Form */}
          <div className="bg-muted rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="Enter company name"
                  value={formData?.company}
                  onChange={(e) => handleInputChange('company', e?.target?.value)}
                  required
                />
                <Select
                  label="Your Role"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Industry Focus"
                  options={industryOptions}
                  value={formData?.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  required
                />
                <Select
                  label="Typical Project Size"
                  options={projectSizeOptions}
                  value={formData?.projectSize}
                  onChange={(value) => handleInputChange('projectSize', value)}
                  required
                />
              </div>

              <Select
                label="Current Tools"
                description="What tools do you currently use?"
                options={currentToolsOptions}
                value={formData?.currentTools}
                onChange={(value) => handleInputChange('currentTools', value)}
                multiple
                searchable
              />

              <Select
                label="Main Challenges"
                description="What are your biggest pain points?"
                options={challengesOptions}
                value={formData?.challenges}
                onChange={(value) => handleInputChange('challenges', value)}
                multiple
                searchable
              />

              <Select
                label="Demo Preference"
                options={demoTypeOptions}
                value={formData?.demoType}
                onChange={(value) => handleInputChange('demoType', value)}
                required
              />

              <Button
                type="submit"
                variant="default"
                fullWidth
                className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule My Demo
              </Button>

              <p className="text-xs text-text-secondary text-center">
                By scheduling a demo, you agree to our terms of service and privacy policy. 
                No spam, unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDemo;