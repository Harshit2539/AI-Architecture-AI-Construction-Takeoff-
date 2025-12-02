import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TrialSuccess = ({ userEmail, onContinue }) => {
  const nextSteps = [
    {
      step: 1,
      title: 'Check Your Email',
      description: 'We\'ve sent login credentials and setup instructions to your email',
      icon: 'Mail'
    },
    {
      step: 2,
      title: 'Complete Setup',
      description: 'Follow the guided onboarding to configure your workspace',
      icon: 'Settings'
    },
    {
      step: 3,
      title: 'Upload Your First Project',
      description: 'Start with our sample projects or upload your own blueprints',
      icon: 'Upload'
    },
    {
      step: 4,
      title: 'Experience AI Takeoffs',
      description: 'Watch BCBP automatically detect and measure construction elements',
      icon: 'Zap'
    }
  ];

  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={40} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-brand-primary mb-4">
          Welcome to BCBP!
        </h1>
        
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Your 14-day free trial has been activated. We've sent setup instructions to{' '}
          <span className="font-semibold text-accent">{userEmail}</span>
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-professional-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-brand-primary mb-6">
          Get Started in 4 Simple Steps
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nextSteps?.map((step) => (
            <div key={step?.step} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted transition-colors duration-fast">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name={step?.icon} size={24} className="text-white" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <span className="w-6 h-6 bg-conversion text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">
                    {step?.step}
                  </span>
                  <h3 className="font-semibold text-brand-primary">
                    {step?.title}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary">
                  {step?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
          onClick={onContinue}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Access Your Trial Dashboard
        </Button>
        
        <p className="text-sm text-text-secondary">
          Need help? Our support team is available 24/7 via live chat
        </p>
      </div>
      <div className="mt-12 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Shield" size={20} />
            <span className="font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Clock" size={20} />
            <span className="font-medium">14 Days Free</span>
          </div>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CreditCard" size={20} />
            <span className="font-medium">No Credit Card</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialSuccess;