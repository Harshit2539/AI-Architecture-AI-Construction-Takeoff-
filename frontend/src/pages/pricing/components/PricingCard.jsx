import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingCard = ({ plan, isAnnual, isPopular = false }) => {
  const monthlyPrice = plan?.monthlyPrice;
  const annualPrice = plan?.annualPrice;
  const currentPrice = isAnnual ? annualPrice : monthlyPrice;
  const originalPrice = isAnnual ? Math.round(monthlyPrice * 12) : null;

  return (
    <div className={`relative bg-card rounded-xl border-2 p-8 transition-all duration-normal hover:shadow-professional-lg ${
      isPopular 
        ? 'border-accent shadow-professional-lg scale-105' 
        : 'border-border hover:border-accent/50'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-primary mb-2">{plan?.name}</h3>
        <p className="text-text-secondary mb-6">{plan?.description}</p>
        
        <div className="mb-6">
          {currentPrice === 'Custom' ? (
            <div className="text-4xl font-bold text-brand-primary">Custom</div>
          ) : (
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-brand-primary">${currentPrice}</span>
              <span className="text-text-secondary ml-2">
                /{isAnnual ? 'year' : 'month'}
              </span>
            </div>
          )}
          
          {isAnnual && originalPrice && currentPrice !== 'Custom' && (
            <div className="text-sm text-text-secondary mt-2">
              <span className="line-through">${originalPrice}/year</span>
              <span className="text-success ml-2 font-medium">Save ${originalPrice - currentPrice}</span>
            </div>
          )}
        </div>

        {plan?.name === 'Enterprise' ? (
          <Button
            variant="outline"
            fullWidth
            className="mb-6"
          >
            Contact Sales
          </Button>
        ) : (
          <Button
            variant={isPopular ? 'default' : 'outline'}
            fullWidth
            className={`mb-6 ${isPopular ? 'bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary' : ''}`}
            asChild
          >
            <Link to="/free-trial">
              {plan?.name === 'Starter' ? 'Start Free Trial' : 'Get Started'}
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-4">
        <h4 className="font-semibold text-brand-primary mb-4">Features included:</h4>
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon 
              name="Check" 
              size={20} 
              className="text-success mt-0.5 flex-shrink-0" 
            />
            <span className="text-text-primary text-sm">{feature}</span>
          </div>
        ))}
      </div>
      {plan?.limitations && plan?.limitations?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold text-text-secondary mb-4 text-sm">Limitations:</h4>
          <div className="space-y-2">
            {plan?.limitations?.map((limitation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon 
                  name="X" 
                  size={16} 
                  className="text-text-secondary mt-0.5 flex-shrink-0" 
                />
                <span className="text-text-secondary text-xs">{limitation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCard;