import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "How does the free trial work?",
      answer: `Our 14-day free trial gives you full access to BCBP Professional features with no credit card required. You can upload up to 10 projects, invite 5 team members, and experience our AI-powered takeoff capabilities. After the trial, you can choose to upgrade to a paid plan or continue with our Starter plan limitations.`
    },
    {
      question: "Can I change plans anytime?",
      answer: `Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to new features and your billing will be prorated. When downgrading, changes take effect at your next billing cycle, and you'll retain access to premium features until then.`
    },
    {
      question: "What file formats do you support?",
      answer: `BCBP supports all major construction drawing formats including PDF, DWG, DXF, TIFF, JPEG, PNG, and BIM files (IFC, RVT). Our AI works best with high-resolution PDFs and CAD files, but can process hand-drawn sketches and photos as well.`
    },
    {
      question: "How accurate is the AI takeoff?",
      answer: `Our AI achieves 95%+ accuracy on Professional plans and 99%+ on Enterprise plans. Accuracy depends on drawing quality and complexity. The system continuously learns from user corrections, improving accuracy over time. We also provide confidence scores for each measurement.`
    },
    {
      question: "Do you offer training and support?",
      answer: `Yes! All plans include email support and access to our knowledge base. Professional plans include live chat and 5 training sessions. Enterprise customers get dedicated account management, phone support, and unlimited training sessions with white-glove implementation support.`
    },
    {
      question: "What integrations are available?",
      answer: `BCBP integrates with popular estimating software like Sage, ProEst, STACK, and PlanSwift. We also connect with BIM tools (Revit, AutoCAD), project management platforms (Procore, Autodesk Construction Cloud), and ERP systems. Enterprise plans include custom integration development.`
    },
    {
      question: "Is my data secure?",
      answer: `Absolutely. We use enterprise-grade security with SOC 2 Type II compliance, end-to-end encryption, and secure cloud infrastructure. Your project data is stored in geographically distributed data centers with 99.9% uptime guarantee and regular security audits.`
    },
    {
      question: "Can I use BCBP offline?",
      answer: `BCBP is primarily cloud-based for real-time collaboration and AI processing. However, our mobile app offers limited offline viewing of downloaded projects. All measurements and AI processing require an internet connection for accuracy and data synchronization.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-primary mb-2">Frequently Asked Questions</h3>
        <p className="text-text-secondary">
          Get answers to common questions about BCBP pricing and features
        </p>
      </div>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-all duration-normal hover:shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors duration-fast"
            >
              <span className="font-semibold text-brand-primary pr-4">{faq?.question}</span>
              <Icon
                name={openFAQ === index ? 'ChevronUp' : 'ChevronDown'}
                size={20}
                className="text-text-secondary flex-shrink-0"
              />
            </button>
            
            <div
              className={`transition-all duration-normal overflow-hidden ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-text-primary leading-relaxed">
                {faq?.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-text-secondary mb-4">Still have questions?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-muted rounded-lg hover:bg-border transition-colors duration-fast">
            <Icon name="MessageCircle" size={20} className="text-accent" />
            <span className="text-brand-primary font-medium">Live Chat</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-muted rounded-lg hover:bg-border transition-colors duration-fast">
            <Icon name="Mail" size={20} className="text-accent" />
            <span className="text-brand-primary font-medium">Email Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;