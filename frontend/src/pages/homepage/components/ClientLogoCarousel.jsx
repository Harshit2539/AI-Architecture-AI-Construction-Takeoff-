import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ClientLogoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const clients = [
    {
      name: "Turner Construction",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center",
      employees: "12,000+",
      industry: "General Contracting",
      testimonial: "BCBP reduced our takeoff time by 75% while improving accuracy significantly."
    },
    {
      name: "Skanska USA",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      employees: "8,500+",
      industry: "Construction & Development",
      testimonial: "The AI-powered estimating has transformed our bidding process completely."
    },
    {
      name: "Bechtel Corporation",
      logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&h=100&fit=crop&crop=center",
      employees: "55,000+",
      industry: "Engineering & Construction",
      testimonial: "BCBP precision and speed have given us a competitive edge in major projects."
    },
    {
      name: "Fluor Corporation",
      logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=100&fit=crop&crop=center",
      employees: "44,000+",
      industry: "Engineering & Construction",
      testimonial: "The collaboration features have streamlined our entire pre-construction workflow."
    },
    {
      name: "Kiewit Corporation",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&crop=center",
      employees: "27,000+",
      industry: "Construction & Mining",
      testimonial: "ROI was evident within the first month of implementation."
    },
    {
      name: "AECOM",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      employees: "50,000+",
      industry: "Infrastructure & Environment",
      testimonial: "BCBP AI capabilities have revolutionized our quantity surveying process."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients?.length / 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [clients?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients?.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(clients?.length / 3)) % Math.ceil(clients?.length / 3));
  };

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
            <Icon name="Award" size={16} className="text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Trusted by Industry Leaders</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-primary mb-4">
            Powering Construction Excellence
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Join thousands of construction professionals who trust BCBP to deliver accurate, 
            efficient takeoffs and estimates for projects worth billions of dollars.
          </p>
        </div>

        {/* Client Logos Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(clients?.length / 3) })?.map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {clients?.slice(slideIndex * 3, slideIndex * 3 + 3)?.map((client, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-professional hover:shadow-professional-lg transition-all duration-300 group"
                      >
                        <div className="space-y-4">
                          {/* Logo and Company Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="w-full h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                                <img 
                                  src={client?.logo} 
                                  alt={`${client?.name} logo`}
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                              </div>
                              <h3 className="font-semibold text-brand-primary text-sm">{client?.name}</h3>
                              <p className="text-xs text-text-secondary">{client?.industry}</p>
                            </div>
                            
                            <div className="text-right">
                              <div className="inline-flex items-center px-2 py-1 bg-accent/10 rounded-full">
                                <Icon name="Users" size={12} className="text-accent mr-1" />
                                <span className="text-xs font-medium text-accent">{client?.employees}</span>
                              </div>
                            </div>
                          </div>

                          {/* Testimonial */}
                          <div className="border-t border-slate-100 pt-4">
                            <p className="text-sm text-text-secondary italic leading-relaxed">
                              "{client?.testimonial}"
                            </p>
                          </div>

                          {/* Trust Indicators */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5]?.map((star) => (
                                <Icon key={star} name="Star" size={12} className="text-warning fill-current" />
                              ))}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Shield" size={12} className="text-success" />
                              <span className="text-xs text-success font-medium">Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-professional flex items-center justify-center hover:shadow-professional-lg transition-all duration-300 touch-target"
            aria-label="Previous clients"
          >
            <Icon name="ChevronLeft" size={20} className="text-brand-primary" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-professional flex items-center justify-center hover:shadow-professional-lg transition-all duration-300 touch-target"
            aria-label="Next clients"
          >
            <Icon name="ChevronRight" size={20} className="text-brand-primary" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(clients?.length / 3) })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-accent scale-125' :'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-slate-200">
          {[
            { value: "500+", label: "Enterprise Clients", icon: "Building2" },
            { value: "$50B+", label: "Projects Managed", icon: "DollarSign" },
            { value: "99.2%", label: "Accuracy Rate", icon: "Target" },
            { value: "10x", label: "Faster Takeoffs", icon: "Zap" }
          ]?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat?.icon} size={24} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-brand-primary">{stat?.value}</div>
              <div className="text-sm text-text-secondary">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogoCarousel;