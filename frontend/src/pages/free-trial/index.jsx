import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import TrialHeader from './components/TrialHeader';
import TrialForm from './components/TrialForm';
import TrialFeatures from './components/TrialFeatures';
import TrialBenefits from './components/TrialBenefits';
import TrialSuccess from './components/TrialSuccess';
import TrialFAQ from './components/TrialFAQ';

const FreeTrialPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleTrialSubmit = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful trial creation
      setUserEmail(formData?.email);
      setShowSuccess(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Trial signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToDashboard = () => {
    // In a real app, this would redirect to the trial dashboard
    window.location.href = '/dashboard';
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-muted">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <TrialSuccess 
              userEmail={userEmail}
              onContinue={handleContinueToDashboard}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-16">
            <TrialHeader />
          </section>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Trial Form */}
            <div>
              <TrialForm onSubmit={handleTrialSubmit} isLoading={isLoading} />
            </div>

            {/* Trial Features */}
            <div>
              <TrialFeatures />
            </div>
          </div>

          {/* Benefits Section */}
          <section className="mb-16">
            <TrialBenefits />
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <TrialFAQ />
          </section>

          {/* Security & Trust Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-professional-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-primary mb-2">
                  Enterprise-Grade Security
                </h2>
                <p className="text-text-secondary">
                  Your data is protected with industry-leading security measures
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center">
                      <Icon name="Shield" size={32} className="text-success" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-brand-primary mb-2">
                    SOC 2 Compliant
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Independently audited security controls and data protection
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <Icon name="Lock" size={32} className="text-accent" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-brand-primary mb-2">
                    256-bit Encryption
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Bank-level encryption for all data in transit and at rest
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-conversion/10 rounded-2xl flex items-center justify-center">
                      <Icon name="Server" size={32} className="text-conversion" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-brand-primary mb-2">
                    99.9% Uptime
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Reliable cloud infrastructure with automatic backups
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Construction Workflow?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of construction professionals who trust BCBP for accurate, 
                efficient takeoffs and estimates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                  onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                  iconName="ArrowUp"
                  iconPosition="right"
                >
                  Start Free Trial Above
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-primary"
                  asChild
                >
                  <Link to="/product-demo">
                    <Icon name="Play" size={20} className="mr-2" />
                    Watch Demo First
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-brand-primary text-white py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">BCBP</span>
              </div>
              <p className="text-sm opacity-80">
                AI-powered construction takeoff and estimating platform
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/product-demo" className="hover:opacity-100">Features</Link></li>
                <li><Link to="/pricing" className="hover:opacity-100">Pricing</Link></li>
                <li><Link to="/solutions-hub" className="hover:opacity-100">Solutions</Link></li>
                <li><Link to="/free-trial" className="hover:opacity-100">Free Trial</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/resources" className="hover:opacity-100">Documentation</Link></li>
                <li><Link to="/resources" className="hover:opacity-100">Tutorials</Link></li>
                <li><Link to="/resources" className="hover:opacity-100">Case Studies</Link></li>
                <li><Link to="/resources" className="hover:opacity-100">Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/homepage" className="hover:opacity-100">About</Link></li>
                <li><Link to="/homepage" className="hover:opacity-100">Careers</Link></li>
                <li><Link to="/homepage" className="hover:opacity-100">Contact</Link></li>
                <li><Link to="/homepage" className="hover:opacity-100">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-80">
              © {new Date()?.getFullYear()} BCBP Construction AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreeTrialPage;