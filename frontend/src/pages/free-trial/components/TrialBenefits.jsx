import React from 'react';
import Icon from '../../../components/AppIcon';

const TrialBenefits = () => {
  const benefits = [
    {
      icon: 'Clock',
      title: '85% Time Savings',
      description: 'Reduce takeoff time from hours to minutes with AI automation',
      color: 'text-success'
    },
    {
      icon: 'Target',
      title: '99.5% Accuracy',
      description: 'Eliminate human errors with precise AI measurements',
      color: 'text-accent'
    },
    {
      icon: 'TrendingUp',
      title: '40% More Bids',
      description: 'Win more projects with faster, more competitive estimates',
      color: 'text-conversion'
    },
    {
      icon: 'DollarSign',
      title: '$50K+ Annual Savings',
      description: 'Average cost savings per estimator using BCBP',
      color: 'text-success'
    }
  ];

  const testimonials = [
    {
      quote: "BCBP transformed our estimating process. What used to take 8 hours now takes 45 minutes.",
      author: "Sarah Chen",
      role: "Senior Quantity Surveyor",
      company: "BuildTech Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "The accuracy is incredible. We\'ve reduced our estimation errors by over 90%.",
      author: "Michael Rodriguez",
      role: "Cost Estimator",
      company: "Premier Construction",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Benefits Grid */}
      <div>
        <h3 className="text-2xl font-bold text-brand-primary text-center mb-8">
          Why Construction Professionals Choose BCBP
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits?.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-professional hover:shadow-professional-lg transition-shadow duration-normal">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  benefit?.color === 'text-success' ? 'bg-success/10' :
                  benefit?.color === 'text-accent' ? 'bg-accent/10' :
                  benefit?.color === 'text-conversion'? 'bg-conversion/10' : 'bg-muted'
                }`}>
                  <Icon name={benefit?.icon} size={32} className={benefit?.color} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-primary mb-2">
                {benefit?.title}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div>
        <h3 className="text-2xl font-bold text-brand-primary text-center mb-8">
          Trusted by Construction Professionals
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-professional">
              <div className="flex items-start space-x-4">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.author}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-text-primary mb-4 italic">
                    "{testimonial?.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-brand-primary">
                      {testimonial?.author}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {testimonial?.role} at {testimonial?.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="bg-muted rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-brand-primary mb-2">
            Trusted by Industry Leaders
          </h3>
          <p className="text-text-secondary">
            Join thousands of construction professionals using BCBP
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="flex items-center space-x-2">
            <Icon name="Building" size={24} className="text-brand-primary" />
            <span className="font-semibold text-brand-primary">Turner Construction</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Home" size={24} className="text-brand-primary" />
            <span className="font-semibold text-brand-primary">Skanska</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Hammer" size={24} className="text-brand-primary" />
            <span className="font-semibold text-brand-primary">Bechtel</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Wrench" size={24} className="text-brand-primary" />
            <span className="font-semibold text-brand-primary">Fluor</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBenefits;