import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PricingToggle from './components/PricingToggle';
import PricingCard from './components/PricingCard';
import ROICalculator from './components/ROICalculator';
import ComparisonTable from './components/ComparisonTable';
import FAQSection from './components/FAQSection';
import TestimonialCard from './components/TestimonialCard';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for individual contractors and small teams getting started with AI takeoffs',
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        'AI-powered takeoffs for up to 10 projects/month',
        'Basic measurement tools and calculations',
        'PDF and image upload support',
        'Standard export formats (PDF, Excel)',
        '5 project templates',
        '5GB cloud storage',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 3 team members',
        'Basic AI accuracy (85%)',
        'No real-time collaboration',
        'No API access'
      ]
    },
    {
      name: 'Professional',
      description: 'Ideal for growing construction companies and established estimating teams',
      monthlyPrice: 149,
      annualPrice: 119,
      features: [
        'Unlimited AI-powered takeoffs',
        'Advanced measurement tools and smart suggestions',
        'All file format support including BIM',
        'Advanced export capabilities',
        'Unlimited project templates',
        '100GB cloud storage',
        'Real-time team collaboration',
        'Comment system and version control',
        'Role-based permissions',
        'Live chat support',
        '5 training sessions included',
        'Integration with 10+ estimating software',
        'Mobile and desktop apps'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive solution for large organizations with custom requirements',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      features: [
        'Everything in Professional',
        'Custom AI model training',
        '99% AI accuracy guarantee',
        'Unlimited team members',
        'Client portal access',
        'Full API access and webhooks',
        'Custom integrations development',
        'ERP system integrations',
        'White-glove implementation',
        'Dedicated account manager',
        'Phone support (24/7)',
        'Unlimited training sessions',
        'Advanced security and compliance',
        'Custom reporting and analytics',
        'On-premise deployment options'
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Senior Quantity Surveyor",
      company: "BuildTech Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "BCBP has transformed our takeoff process completely. What used to take us 8 hours now takes 2 hours with 95% accuracy. The ROI was evident within the first month.",
      timeSaved: "75% faster",
      accuracyImprovement: "95% accurate",
      plan: "Professional"
    },
    {
      name: "Michael Rodriguez",
      role: "Cost Estimator",
      company: "Premier Construction Group",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The AI detection is incredibly accurate, and the team collaboration features have streamlined our entire pre-construction workflow. Best investment we've made.",
      timeSaved: "80% faster",
      accuracyImprovement: "98% accurate",
      plan: "Enterprise"
    },
    {
      name: "Jennifer Chen",
      role: "Project Manager",
      company: "Urban Development Corp",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Starting with the Starter plan was perfect for our small team. As we grew, upgrading to Professional was seamless. The scalability is exactly what we needed.",
      timeSaved: "60% faster",
      accuracyImprovement: "90% accurate",
      plan: "Professional"
    }
  ];

  const currencyOptions = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' }
  ];

  const currentYear = new Date()?.getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pricing & Plans - BCBP Construction AI Platform</title>
        <meta name="description" content="Transparent pricing for BCBP AI-powered construction takeoff and estimating platform. Compare plans, calculate ROI, and start your free trial today." />
        <meta name="keywords" content="construction software pricing, AI takeoff pricing, estimating software cost, construction technology plans" />
      </Helmet>
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Zap" size={16} />
              <span>Transparent Pricing</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-primary mb-6">
              Choose Your
              <span className="text-accent block">Perfect Plan</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Start with our free trial and scale as you grow. No hidden fees, no surprises. 
              Just powerful AI-driven construction takeoffs that pay for themselves.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-sm text-text-secondary">Currency:</span>
              <div className="flex space-x-2">
                {currencyOptions?.map((curr) => (
                  <button
                    key={curr?.code}
                    onClick={() => setCurrency(curr?.code)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-fast ${
                      currency === curr?.code
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-text-secondary hover:bg-border'
                    }`}
                  >
                    {curr?.symbol} {curr?.code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Toggle */}
          <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {pricingPlans?.map((plan, index) => (
              <PricingCard
                key={plan?.name}
                plan={plan}
                isAnnual={isAnnual}
                isPopular={index === 1}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-text-secondary mb-6">Trusted by 500+ construction companies worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={24} className="text-success" />
                <span className="font-medium text-brand-primary">SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={24} className="text-success" />
                <span className="font-medium text-brand-primary">Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={24} className="text-success" />
                <span className="font-medium text-brand-primary">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ROI Calculator Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ROICalculator />
        </div>
      </section>
      {/* Feature Comparison Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ComparisonTable />
        </div>
      </section>
      {/* Customer Testimonials */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-primary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              See how construction professionals are transforming their workflows with BCBP
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {testimonials?.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="hover:bg-accent hover:text-accent-foreground"
              iconName="ExternalLink"
              iconPosition="right"
              asChild
            >
              <Link to="/customer-stories">View All Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Takeoffs?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of construction professionals who trust BCBP for accurate, 
            AI-powered takeoffs and estimating.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
              iconName="Zap"
              iconPosition="left"
              asChild
            >
              <Link to="/free-trial">Start Free Trial</Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-primary"
              iconName="Play"
              iconPosition="left"
              asChild
            >
              <Link to="/product-demo">Watch Demo</Link>
            </Button>
          </div>

          <p className="text-sm opacity-75 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-brand-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">BCBP</span>
              </div>
              <p className="text-sm opacity-80 mb-4">
                AI-powered construction takeoff and estimating platform trusted by professionals worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/product-demo" className="hover:opacity-100 transition-opacity">Features</Link></li>
                <li><Link to="/pricing" className="hover:opacity-100 transition-opacity">Pricing</Link></li>
                <li><Link to="/free-trial" className="hover:opacity-100 transition-opacity">Free Trial</Link></li>
                <li><Link to="/integrations" className="hover:opacity-100 transition-opacity">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/solutions-hub" className="hover:opacity-100 transition-opacity">By Role</Link></li>
                <li><Link to="/industries" className="hover:opacity-100 transition-opacity">By Industry</Link></li>
                <li><Link to="/use-cases" className="hover:opacity-100 transition-opacity">Use Cases</Link></li>
                <li><Link to="/customer-stories" className="hover:opacity-100 transition-opacity">Success Stories</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/resources" className="hover:opacity-100 transition-opacity">Help Center</Link></li>
                <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
                <li><Link to="/training" className="hover:opacity-100 transition-opacity">Training</Link></li>
                <li><Link to="/api-docs" className="hover:opacity-100 transition-opacity">API Docs</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80">
              © {currentYear} BCBP Construction AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
              <Link to="/security" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;