import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-professional transition-all duration-normal">
      <div className="flex items-start space-x-4 mb-4">
        <Image
          src={testimonial?.avatar}
          alt={testimonial?.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-brand-primary">{testimonial?.name}</h4>
          <p className="text-sm text-text-secondary">{testimonial?.role}</p>
          <p className="text-sm text-text-secondary">{testimonial?.company}</p>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)]?.map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={16}
              className="text-warning fill-current"
            />
          ))}
        </div>
      </div>
      <blockquote className="text-text-primary leading-relaxed mb-4">
        "{testimonial?.quote}"
      </blockquote>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-success">
            <Icon name="TrendingUp" size={16} />
            <span className="font-medium">{testimonial?.timeSaved}</span>
          </div>
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="Target" size={16} />
            <span className="font-medium">{testimonial?.accuracyImprovement}</span>
          </div>
        </div>
        <span className="text-text-secondary">{testimonial?.plan} Plan</span>
      </div>
    </div>
  );
};

export default TestimonialCard;