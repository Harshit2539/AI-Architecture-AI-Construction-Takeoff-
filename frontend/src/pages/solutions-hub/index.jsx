import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleSelector from './components/RoleSelector';
import IndustrySpecialization from './components/IndustrySpecialization';
import WorkflowDiagram from './components/WorkflowDiagram';
import ComparisonMatrix from './components/ComparisonMatrix';
import PersonalizedDemo from './components/PersonalizedDemo';

const SolutionsHub = () => {
  const [selectedRole, setSelectedRole] = useState('quantity-surveyor');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
  };

  const roleData = {
    'quantity-surveyor': {
      title: 'Quantity Surveyor Solutions',
      subtitle: 'AI-powered takeoff and measurement automation',
      description: 'Transform manual measurements into accurate, automated takeoffs with AI detection that recognizes building elements and calculates quantities in minutes, not hours.',
      icon: 'Calculator',
      benefits: [
        '95% measurement accuracy improvement',
        '70% reduction in takeoff time',
        'Real-time collaboration with team members',
        'Automated material quantity reports'
      ],
      painPoints: [
        'Manual measurement errors costing projects',
        'Time-consuming calculation processes',
        'Version control and collaboration issues',
        'Inconsistent reporting formats'
      ]
    },
    'cost-estimator': {
      title: 'Cost Estimator Solutions',
      subtitle: 'Intelligent pricing and bid preparation',
      description: 'Leverage real-time market data and automated calculations to create competitive, accurate estimates with integrated pricing databases and instant bid generation.',
      icon: 'DollarSign',
      benefits: [
        'Real-time market pricing integration',
        '60% faster estimate preparation',
        'Historical cost analysis and trends',
        'Automated competitive bid generation'
      ],
      painPoints: [
        'Outdated pricing database management',
        'Market rate fluctuation challenges',
        'Time-intensive bid preparation',
        'Manual cost calculation errors'
      ]
    },
    'contractor': {
      title: 'General Contractor Solutions',
      subtitle: 'Unified project coordination and management',
      description: 'Streamline project workflows with integrated tools for subcontractor coordination, progress tracking, and automated change order management.',
      icon: 'HardHat',
      benefits: [
        'Unified project dashboard and visibility',
        '40% improvement in project efficiency',
        'Automated progress reporting',
        'Integrated subcontractor management'
      ],
      painPoints: [
        'Fragmented communication channels',
        'Subcontractor coordination challenges',
        'Manual progress tracking processes',
        'Change order management delays'
      ]
    },
    'project-manager': {
      title: 'Project Manager Solutions',
      subtitle: 'Data-driven project oversight and team collaboration',
      description: 'Gain complete project visibility with real-time dashboards, automated reporting, and centralized communication for faster decision-making.',
      icon: 'Users',
      benefits: [
        'Real-time project visibility and insights',
        '50% faster decision-making process',
        'Centralized team communication hub',
        'Automated status and progress reports'
      ],
      painPoints: [
        'Limited project visibility and control',
        'Communication gaps between teams',
        'Manual reporting and status updates',
        'Delayed decision-making processes'
      ]
    }
  };

  const currentRoleData = roleData?.[selectedRole];

  return (
    <>
      <Helmet>
        <title>Solutions Hub - Role-Based Construction AI | BCBP</title>
        <meta name="description" content="Discover tailored AI solutions for Quantity Surveyors, Cost Estimators, Contractors, and Project Managers. Transform your construction workflow with industry-specific tools and automation." />
        <meta name="keywords" content="construction AI, quantity surveyor software, cost estimating tools, contractor management, project management, construction technology" />
        <meta property="og:title" content="Solutions Hub - Role-Based Construction AI | BCBP" />
        <meta property="og:description" content="Tailored AI solutions for construction professionals. See how BCBP transforms workflows for your specific role and industry." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/solutions-hub" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-brand-primary via-brand-secondary to-accent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Icon name="Zap" size={16} className="text-white" />
                <span className="text-white text-sm font-medium">AI-Powered Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Solutions Built for
                <span className="block text-conversion">Your Construction Role</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                Discover how BCBP AI transforms your specific workflow with tailored solutions for Quantity Surveyors, 
                Cost Estimators, Contractors, and Project Managers
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                  iconName="Play"
                  iconPosition="left"
                  asChild
                >
                  <Link to="/product-demo">Watch Live Demo</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-primary"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Role Selector */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <RoleSelector 
              selectedRole={selectedRole} 
              onRoleChange={handleRoleChange} 
            />
          </div>
        </section>

        {/* Selected Role Details */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={currentRoleData?.icon} size={24} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-brand-primary">
                      {currentRoleData?.title}
                    </h2>
                    <p className="text-lg text-accent font-medium">
                      {currentRoleData?.subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-text-secondary mb-8">
                  {currentRoleData?.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-brand-primary mb-4">
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {currentRoleData?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon name="CheckCircle" size={20} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="default"
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                  iconName="ArrowRight"
                  iconPosition="right"
                  asChild
                >
                  <Link to="/free-trial">Start Free Trial</Link>
                </Button>
              </div>

              {/* Pain Points */}
              <div className="bg-muted rounded-xl p-8">
                <h3 className="text-xl font-semibold text-brand-primary mb-6">
                  Common Challenges We Solve
                </h3>
                <div className="space-y-4">
                  {currentRoleData?.painPoints?.map((painPoint, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg">
                      <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-text-secondary">{painPoint}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Zap" size={16} className="text-success" />
                    <span className="font-semibold text-success">BCBP Solution</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Our AI-powered platform addresses all these challenges with automated workflows, 
                    real-time collaboration, and intelligent insights tailored to your role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Diagram */}
        <WorkflowDiagram selectedRole={selectedRole} />

        {/* Industry Specializations */}
        <IndustrySpecialization />

        {/* Comparison Matrix */}
        <ComparisonMatrix selectedRole={selectedRole} />

        {/* Success Metrics */}
        <section className="py-16 bg-gradient-to-r from-accent/5 to-conversion/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-primary mb-4">
                Proven Results Across Roles
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Construction professionals worldwide trust BCBP to transform their workflows and deliver measurable results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-professional">
                <div className="text-4xl font-bold text-accent mb-2">15,000+</div>
                <div className="text-text-secondary">Active Users</div>
                <div className="text-sm text-text-secondary mt-1">Across all roles</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-professional">
                <div className="text-4xl font-bold text-success mb-2">85%</div>
                <div className="text-text-secondary">Time Reduction</div>
                <div className="text-sm text-text-secondary mt-1">Average across workflows</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-professional">
                <div className="text-4xl font-bold text-conversion mb-2">$2.3M</div>
                <div className="text-text-secondary">Cost Savings</div>
                <div className="text-sm text-text-secondary mt-1">Total customer savings</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-professional">
                <div className="text-4xl font-bold text-brand-primary mb-2">98%</div>
                <div className="text-text-secondary">Satisfaction Rate</div>
                <div className="text-sm text-text-secondary mt-1">Customer feedback</div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Demo */}
        <PersonalizedDemo selectedRole={selectedRole} />

        {/* Final CTA */}
        <section className="py-16 bg-brand-primary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Construction Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of construction professionals who have already revolutionized their processes with  AI-powered solutions
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
                iconName="MessageSquare"
                iconPosition="left"
              >
                Talk to Sales
              </Button>
            </div>
            
            <p className="text-white/70 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Link to="/homepage" className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M3 21V7L12 3L21 7V21H15V14H9V21H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-brand-primary">BCBP</span>
                    <span className="text-xs text-muted-foreground -mt-1">Construction AI</span>
                  </div>
                </Link>
                <p className="text-text-secondary mb-4 max-w-md">
                  AI-powered construction takeoff and estimating platform that transforms pre-construction workflows 
                  through intelligent automation and real-time collaboration.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                    <Icon name="Linkedin" size={20} />
                  </a>
                  <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                    <Icon name="Twitter" size={20} />
                  </a>
                  <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                    <Icon name="Youtube" size={20} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-brand-primary mb-4">Solutions</h3>
                <ul className="space-y-2">
                  <li><Link to="/solutions-hub" className="text-text-secondary hover:text-accent transition-colors">By Role</Link></li>
                  <li><Link to="/solutions-hub" className="text-text-secondary hover:text-accent transition-colors">By Industry</Link></li>
                  <li><Link to="/product-demo" className="text-text-secondary hover:text-accent transition-colors">Product Demo</Link></li>
                  <li><Link to="/pricing" className="text-text-secondary hover:text-accent transition-colors">Pricing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-brand-primary mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">About Us</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Careers</a></li>
                  <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Contact</a></li>
                  <li><Link to="/resources" className="text-text-secondary hover:text-accent transition-colors">Resources</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-text-secondary text-sm">
                © {new Date()?.getFullYear()} BCBP Construction AI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SolutionsHub;