import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuantifiedResults = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});
  const sectionRef = useRef(null);

  const results = [
    {
      id: "time-savings",
      title: "Time Savings",
      value: 85,
      suffix: "%",
      description: "Average reduction in takeoff time across all project types",
      icon: "Clock",
      color: "#2b7bcd",
      details: [
        "Residential projects: 90% faster",
        "Commercial projects: 82% faster", 
        "Infrastructure: 78% faster"
      ]
    },
    {
      id: "accuracy-improvement",
      title: "Accuracy Rate",
      value: 99.2,
      suffix: "%",
      description: "Measurement accuracy compared to manual takeoffs",
      icon: "Target",
      color: "#10b981",
      details: [
        "±0.1% precision on measurements",
        "99.8% object detection rate",
        "95% cost estimation accuracy"
      ]
    },
    {
      id: "cost-reduction",
      title: "Cost Reduction",
      value: 40,
      suffix: "%",
      description: "Average project cost savings through improved accuracy",
      icon: "DollarSign",
      color: "#f59e0b",
      details: [
        "Reduced material waste",
        "Fewer change orders",
        "Optimized resource allocation"
      ]
    },
    {
      id: "productivity-boost",
      title: "Productivity Increase",
      value: 300,
      suffix: "%",
      description: "Team productivity improvement with AI automation",
      icon: "TrendingUp",
      color: "#8b5cf6",
      details: [
        "10x faster takeoff completion",
        "Real-time collaboration",
        "Automated report generation"
      ]
    }
  ];

  const caseStudies = [
    {
      company: "Turner Construction",
      project: "Downtown Office Complex",
      challenge: "Complex 45-story building with mixed-use requirements needed accurate takeoffs within 48 hours for competitive bidding.",
      solution: "BCBP\'s AI processed architectural drawings and generated comprehensive takeoffs in 4 hours instead of the typical 40 hours.",
      results: [
        { metric: "Time Saved", value: "36 hours", improvement: "90%" },
        { metric: "Accuracy", value: "99.4%", improvement: "15%" },
        { metric: "Cost Savings", value: "$125K", improvement: "35%" }
      ],
      testimonial: "BCBP transformed our bidding process. We can now respond to more opportunities with greater confidence in our estimates.",
      role: "Senior Estimator"
    },
    {
      company: "Skanska USA",
      project: "Highway Infrastructure Upgrade",
      challenge: "Multi-phase highway project required precise material calculations for concrete, steel, and asphalt across 15 miles.",
      solution: "AI-powered quantity surveying provided detailed breakdowns for each phase with real-time cost adjustments.",
      results: [
        { metric: "Material Accuracy", value: "99.1%", improvement: "25%" },
        { metric: "Planning Time", value: "3 days", improvement: "85%" },
        { metric: "Budget Variance", value: "±2%", improvement: "60%" }
      ],
      testimonial: "The precision and speed of BCBP's calculations gave us a significant competitive advantage in this major infrastructure bid.",
      role: "Project Manager"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    results?.forEach((result) => {
      let current = 0;
      const increment = result?.value / 60; // 60 frames for smooth animation
      const timer = setInterval(() => {
        current += increment;
        if (current >= result?.value) {
          current = result?.value;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({
          ...prev,
          [result?.id]: Math.round(current * 10) / 10
        }));
      }, 16); // ~60fps
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-6">
            <Icon name="BarChart3" size={16} className="text-success mr-2" />
            <span className="text-sm font-medium text-success">Proven Results</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
            Measurable Impact on
            <span className="text-conversion block">Your Bottom Line</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here are the quantified results our clients 
            achieve with BCBP's AI-powered construction intelligence.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {results?.map((result, index) => (
            <div
              key={result?.id}
              className="bg-white rounded-2xl p-8 shadow-professional hover:shadow-professional-lg transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${result?.color}15` }}
                >
                  <Icon 
                    name={result?.icon} 
                    size={32} 
                    style={{ color: result?.color }}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-brand-primary mb-2">
                    {isVisible ? (animatedValues?.[result?.id] || 0) : 0}
                    <span style={{ color: result?.color }}>{result?.suffix}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-brand-primary mb-2">
                    {result?.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {result?.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  {result?.details?.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center text-xs text-text-secondary">
                      <Icon name="Check" size={12} className="text-success mr-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-brand-primary mb-4">
              Real-World Success Stories
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              See how leading construction companies achieved these results with BCBP
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {caseStudies?.map((study, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-professional">
                <div className="space-y-6">
                  {/* Company Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-brand-primary">{study?.company}</h4>
                      <p className="text-sm text-text-secondary">{study?.project}</p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Building2" size={24} className="text-accent" />
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-brand-primary mb-2 flex items-center">
                        <Icon name="AlertCircle" size={16} className="text-warning mr-2" />
                        Challenge
                      </h5>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {study?.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-brand-primary mb-2 flex items-center">
                        <Icon name="Lightbulb" size={16} className="text-accent mr-2" />
                        Solution
                      </h5>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {study?.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h5 className="font-semibold text-brand-primary mb-4 flex items-center">
                      <Icon name="TrendingUp" size={16} className="text-success mr-2" />
                      Results Achieved
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      {study?.results?.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-lg font-bold text-success">{result?.value}</div>
                          <div className="text-xs text-text-secondary">{result?.metric}</div>
                          <div className="text-xs text-accent font-medium">↑{result?.improvement}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-accent">
                    <p className="text-sm text-text-secondary italic mb-2">
                      "{study?.testimonial}"
                    </p>
                    <div className="text-xs text-accent font-medium">
                      — {study?.role}, {study?.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-slate-200">
          <div className="bg-brand-primary rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Achieve Similar Results?
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the construction professionals who are already transforming their workflows 
              and achieving measurable improvements with BCBP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                asChild
              >
                <Link to="/free-trial">
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Start Your Success Story
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/resources">
                  <Icon name="FileText" size={20} className="mr-2" />
                  View More Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuantifiedResults;