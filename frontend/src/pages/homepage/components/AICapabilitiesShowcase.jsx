import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AICapabilitiesShowcase = () => {
  const [activeCapability, setActiveCapability] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const capabilities = [
    {
      id: "detection",
      title: "Intelligent Object Detection",
      description: "AI automatically identifies and categorizes construction elements from blueprints and photos with 99.2% accuracy.",
      icon: "Eye",
      color: "#2b7bcd",
      metrics: [
        { label: "Detection Speed", value: "< 2 seconds", icon: "Clock" },
        { label: "Accuracy Rate", value: "99.2%", icon: "Target" },
        { label: "Object Types", value: "500+", icon: "Layers" }
      ],
      demo: {
        elements: [
          { type: "Wall", count: 24, detected: true },
          { type: "Door", count: 8, detected: true },
          { type: "Window", count: 16, detected: true },
          { type: "Column", count: 12, detected: false }
        ]
      }
    },
    {
      id: "measurement",
      title: "Precision Measurement",
      description: "Advanced algorithms calculate exact dimensions, areas, and volumes automatically from any scale drawing.",
      icon: "Ruler",
      color: "#10b981",
      metrics: [
        { label: "Measurement Precision", value: "±0.1%", icon: "Crosshair" },
        { label: "Scale Recognition", value: "Auto", icon: "Maximize" },
        { label: "Unit Conversion", value: "Global", icon: "Globe" }
      ],
      demo: {
        measurements: [
          { item: "Total Floor Area", value: "2,450 sq ft", status: "calculated" },
          { item: "Wall Length", value: "1,240 ft", status: "calculated" },
          { item: "Volume", value: "24,500 cu ft", status: "processing" }
        ]
      }
    },
    {
      id: "estimation",
      title: "Smart Cost Estimation",
      description: "Real-time material and labor cost calculations based on current market prices and project specifications.",
      icon: "Calculator",
      color: "#f59e0b",
      metrics: [
        { label: "Cost Accuracy", value: "95%+", icon: "DollarSign" },
        { label: "Market Data", value: "Live", icon: "TrendingUp" },
        { label: "Update Frequency", value: "Daily", icon: "RefreshCw" }
      ],
      demo: {
        estimates: [
          { category: "Materials", amount: "$125,400", variance: "+2.1%" },
          { category: "Labor", amount: "$89,200", variance: "-1.5%" },
          { category: "Equipment", amount: "$34,800", variance: "+0.8%" }
        ]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCapability((prev) => (prev + 1) % capabilities?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleCapabilityChange = (index) => {
    setIsProcessing(true);
    setTimeout(() => {
      setActiveCapability(index);
      setIsProcessing(false);
    }, 300);
  };

  const currentCapability = capabilities?.[activeCapability];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Icon name="Brain" size={16} className="text-accent mr-2" />
            <span className="text-sm font-medium text-accent">AI-Powered Intelligence</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
            Construction AI That
            <span className="text-accent block">Actually Works</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Experience the future of construction technology with AI capabilities that understand 
            your projects as well as you do, but work 10x faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Capability Selector */}
          <div className="space-y-8">
            {capabilities?.map((capability, index) => (
              <div
                key={capability?.id}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  index === activeCapability
                    ? 'bg-white shadow-professional-lg border-2 border-accent/20'
                    : 'bg-muted hover:bg-white hover:shadow-professional border border-transparent'
                }`}
                onClick={() => handleCapabilityChange(index)}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      index === activeCapability
                        ? 'scale-110' :'scale-100'
                    }`}
                    style={{ 
                      backgroundColor: index === activeCapability ? `${capability?.color}20` : '#f8fafc',
                      border: `2px solid ${index === activeCapability ? capability?.color : 'transparent'}`
                    }}
                  >
                    <Icon 
                      name={capability?.icon} 
                      size={24} 
                      style={{ color: index === activeCapability ? capability?.color : '#64748b' }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                      index === activeCapability ? 'text-brand-primary' : 'text-text-primary'
                    }`}>
                      {capability?.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {capability?.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {capability?.metrics?.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Icon name={metric?.icon} size={14} className="text-accent mr-1" />
                            <span className="text-sm font-semibold text-brand-primary">
                              {metric?.value}
                            </span>
                          </div>
                          <div className="text-xs text-text-secondary">{metric?.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active Indicator */}
                {index === activeCapability && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    style={{ backgroundColor: capability?.color }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right: Interactive Demo */}
          <div className="relative">
            <div className="bg-slate-900 rounded-2xl p-8 overflow-hidden">
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${currentCapability?.color}20` }}
                  >
                    <Icon 
                      name={currentCapability?.icon} 
                      size={16} 
                      style={{ color: currentCapability?.color }}
                    />
                  </div>
                  <span className="text-white font-medium">{currentCapability?.title}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-300">Live Processing</span>
                </div>
              </div>

              {/* Demo Content */}
              <div className={`transition-all duration-500 ${isProcessing ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                {currentCapability?.id === 'detection' && (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-300 mb-4">Detected Elements:</div>
                    {currentCapability?.demo?.elements?.map((element, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${element?.detected ? 'bg-success' : 'bg-warning animate-pulse'}`} />
                          <span className="text-white">{element?.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-300">{element?.count}</span>
                          {element?.detected && <Icon name="Check" size={16} className="text-success" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {currentCapability?.id === 'measurement' && (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-300 mb-4">Calculated Measurements:</div>
                    {currentCapability?.demo?.measurements?.map((measurement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="text-white">{measurement?.item}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-success font-mono">{measurement?.value}</span>
                          {measurement?.status === 'calculated' ? (
                            <Icon name="Check" size={16} className="text-success" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-warning border-t-transparent rounded-full animate-spin" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {currentCapability?.id === 'estimation' && (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-300 mb-4">Cost Breakdown:</div>
                    {currentCapability?.demo?.estimates?.map((estimate, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <span className="text-white">{estimate?.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-success font-mono">{estimate?.amount}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            estimate?.variance?.startsWith('+') ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                          }`}>
                            {estimate?.variance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span className="text-sm text-slate-300">Processing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Action Button */}
            <div className="absolute -bottom-6 -right-6">
              <Button
                variant="default"
                size="lg"
                className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary rounded-full shadow-professional-lg"
                asChild
              >
                <Link to="/product-demo">
                  <Icon name="Play" size={20} className="mr-2" />
                  Try Interactive Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-brand-primary mb-4">
            Ready to Experience AI-Powered Construction?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of construction professionals who have transformed their workflows with BCBP intelligent automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
              asChild
            >
              <Link to="/free-trial">
                Start Free Trial
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <Link to="/solutions-hub">
                Explore Solutions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICapabilitiesShowcase;