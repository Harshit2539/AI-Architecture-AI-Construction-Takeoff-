import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "AI Takeoff", href: "/product-demo" },
        { name: "Cost Estimation", href: "/solutions-hub" },
        { name: "Collaboration Tools", href: "/solutions-hub" },
        { name: "Reporting & Analytics", href: "/solutions-hub" },
        { name: "Integrations", href: "/solutions-hub" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "For Quantity Surveyors", href: "/solutions-hub" },
        { name: "For Cost Estimators", href: "/solutions-hub" },
        { name: "For Contractors", href: "/solutions-hub" },
        { name: "For Project Managers", href: "/solutions-hub" },
        { name: "Enterprise Solutions", href: "/solutions-hub" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/resources" },
        { name: "Best Practices", href: "/resources" },
        { name: "Case Studies", href: "/resources" },
        { name: "Webinars", href: "/resources" },
        { name: "Construction Blog", href: "/resources" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About BCBP", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press & Media", href: "/press" },
        { name: "Partner Program", href: "/partners" },
        { name: "Contact Us", href: "/contact" }
      ]
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com/company/BCBP" },
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com/BCBP" },
    { name: "YouTube", icon: "Youtube", href: "https://youtube.com/BCBP" },
    { name: "GitHub", icon: "Github", href: "https://github.com/BCBP" }
  ];

  const trustBadges = [
    { name: "SOC 2 Compliant", icon: "Shield" },
    { name: "GDPR Ready", icon: "Lock" },
    { name: "ISO 27001", icon: "Award" },
    { name: "Enterprise Grade", icon: "Star" }
  ];

  return (
    <footer className="bg-brand-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/homepage" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <svg 
                  width="28" 
                  height="28" 
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
                <span className="text-2xl font-bold">BCBP</span>
                <span className="text-sm text-slate-300 -mt-1">Construction AI</span>
              </div>
            </Link>
            
            <p className="text-slate-300 leading-relaxed max-w-sm">
              Revolutionizing construction workflows with AI-powered takeoffs, 
              precise measurements, and intelligent cost estimation for the modern construction industry.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Stay Updated</h4>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <Button
                  variant="default"
                  className="bg-accent hover:bg-accent/90 text-white px-6"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
              <p className="text-xs text-slate-400">
                Get construction technology insights and product updates
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections?.map((section) => (
              <div key={section?.title} className="space-y-4">
                <h4 className="font-semibold text-white">{section?.title}</h4>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.name}>
                      <Link
                        to={link?.href}
                        className="text-slate-300 hover:text-accent transition-colors duration-300 text-sm"
                      >
                        {link?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm text-slate-300">Enterprise Security & Compliance</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              {trustBadges?.map((badge) => (
                <div key={badge?.name} className="flex items-center space-x-2">
                  <Icon name={badge?.icon} size={16} className="text-slate-400" />
                  <span className="text-xs text-slate-400">{badge?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-slate-400">
                © {currentYear} BCBP Construction AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/privacy" className="text-xs text-slate-400 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-xs text-slate-400 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-xs text-slate-400 hover:text-accent transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">All systems operational</span>
              </div>
              <Link 
                to="/status" 
                className="text-xs text-slate-400 hover:text-accent transition-colors"
              >
                System Status
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          variant="default"
          size="lg"
          className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary rounded-full shadow-professional-lg"
          asChild
        >
          <Link to="/free-trial">
            <Icon name="Zap" size={20} className="mr-2" />
            Try Free
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;