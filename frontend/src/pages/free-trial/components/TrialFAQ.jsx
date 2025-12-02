import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TrialFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What\'s included in the 14-day free trial?',
      answer: `You get full access to all BCBP features including AI-powered takeoffs, smart estimating, team collaboration tools, professional reporting, multi-trade support, and cloud storage. There are no feature limitations during your trial period.`
    },
    {
      question: 'Do I need to provide a credit card to start my trial?',
      answer: `No credit card required! You can start your free trial immediately and explore all features without any payment information. You'll only need to add payment details if you choose to continue after the trial period.`
    },
    {
      question: 'What happens after my 14-day trial ends?',
      answer: `After your trial ends, you can choose to upgrade to a paid plan to continue using BCBP. If you don't upgrade, your account will be paused, but your project data will be safely stored for 30 days in case you decide to return.`
    },
    {
      question: 'Can I upload my own construction drawings during the trial?',
      answer: `Absolutely! You can upload your own blueprints, drawings, and project files in various formats including PDF, DWG, and image files. We also provide sample projects to help you get started quickly.`
    },
    {
      question: 'Is there a limit on the number of projects during the trial?',
      answer: `No limits! Create as many projects as you need during your 14-day trial. Test BCBP with different types of construction projects to see how it fits your workflow.`
    },
    {
      question: 'What kind of support is available during the trial?',
      answer: `You get full access to our support team via live chat, email, and phone. We also provide guided onboarding, video tutorials, and documentation to help you get the most out of your trial.`
    },
    {
      question: 'Can my team members access the trial account?',
      answer: `Yes! You can invite team members to collaborate on projects during your trial. This helps you evaluate how BCBP works for your entire team\'s workflow and collaboration needs.`
    },
    {
      question: 'What file formats does BCBP support?',
      answer: `BCBP supports all major construction file formats including PDF, DWG, DXF, JPG, PNG, TIFF, and more. Our AI can process both vector and raster drawings with high accuracy.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-professional-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-primary mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary">
          Everything you need to know about your free trial
        </p>
      </div>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors duration-fast"
            >
              <span className="font-semibold text-brand-primary pr-4">
                {faq?.question}
              </span>
              <Icon 
                name={openIndex === index ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                className="text-text-secondary flex-shrink-0"
              />
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4 border-t border-border bg-muted/50">
                <p className="text-text-secondary leading-relaxed pt-4">
                  {faq?.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-accent/5 rounded-xl border border-accent/20">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="HelpCircle" size={24} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-brand-primary mb-2">
              Still have questions?
            </h3>
            <p className="text-text-secondary mb-4">
              Our team is here to help you get started with BCBP. Reach out anytime!
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="MessageCircle" size={16} />
                <span className="text-sm font-medium">Live Chat</span>
              </div>
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="Mail" size={16} />
                <span className="text-sm font-medium">support@BCBP.com</span>
              </div>
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="Phone" size={16} />
                <span className="text-sm font-medium">1-800-BCBP-AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialFAQ;