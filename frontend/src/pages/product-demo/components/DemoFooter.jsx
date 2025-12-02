import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DemoFooter = () => {
  const currentYear = new Date()?.getFullYear();

  const nextSteps = [
    {
      title: 'Start Your Free Trial',
      description: 'Get full access to BCBP for 14 days with no credit card required',
      icon: 'Zap',
      action: 'Start Free Trial',
      link: '/free-trial',
      color: 'orange'
    },
    {
      title: 'Schedule a Live Demo',
      description: 'See BCBP in action with your own construction drawings',
      icon: 'Calendar',
      action: 'Book Demo',
      link: '/schedule-demo',
      color: 'blue'
    },
    {
      title: 'Explore Solutions',
      description: 'Discover how BCBP fits into your specific workflow',
      icon: 'Layers',
      action: 'View Solutions',
      link: '/solutions-hub',
      color: 'green'
    }
  ];

  const resources = [
    { name: 'Getting Started Guide', icon: 'BookOpen', link: '/resources/getting-started' },
    { name: 'Video Tutorials', icon: 'Play', link: '/resources/tutorials' },
    { name: 'API Documentation', icon: 'Code', link: '/resources/api-docs' },
    { name: 'Customer Success Stories', icon: 'Users', link: '/resources/case-studies' }
  ];

  const support = [
    { name: 'Help Center', icon: 'HelpCircle', link: '/support' },
    { name: 'Contact Support', icon: 'MessageCircle', link: '/contact' },
    { name: 'Community Forum', icon: 'Users', link: '/community' },
    { name: 'System Status', icon: 'Activity', link: '/status' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Takeoffs?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of construction professionals who have revolutionized their workflows with BCBP's AI-powered precision.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {nextSteps?.map((step, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={step?.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step?.title}</h3>
                <p className="text-white/80 text-sm mb-4">{step?.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to={step?.link}>{step?.action}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/homepage" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-white"
                  >
                    <path 
                      d="M3 21V7L12 3L21 7V21H15V14H9V21H3Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M9 9H15" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">BCBP</span>
                  <span className="text-xs text-slate-400 -mt-1">Construction AI</span>
                </div>
              </Link>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                Transforming construction workflows with AI-powered takeoff and estimating solutions that deliver unprecedented accuracy and efficiency.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Icon name="Twitter" size={20} className="text-slate-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Icon name="Linkedin" size={20} className="text-slate-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Icon name="Youtube" size={20} className="text-slate-400" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/product-demo" className="text-slate-400 hover:text-white transition-colors">Product Demo</Link></li>
                <li><Link to="/solutions-hub" className="text-slate-400 hover:text-white transition-colors">Solutions</Link></li>
                <li><Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/free-trial" className="text-slate-400 hover:text-white transition-colors">Free Trial</Link></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {resources?.map((resource, index) => (
                  <li key={index}>
                    <Link to={resource?.link} className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                      <Icon name={resource?.icon} size={16} />
                      <span>{resource?.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {support?.map((item, index) => (
                  <li key={index}>
                    <Link to={item?.link} className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                <h4 className="font-medium text-white mb-3">Contact Sales</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Icon name="Phone" size={14} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Icon name="Mail" size={14} />
                    <span>sales@BCBP.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>&copy; {currentYear} BCBP Construction AI. All rights reserved.</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
              <div className="text-sm text-slate-400">
                Last updated: Dec 23, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DemoFooter;