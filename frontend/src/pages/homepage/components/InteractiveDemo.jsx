import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedElements, setDetectedElements] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  const demoSteps = [
    {
      id: "upload",
      title: "Upload Blueprint",
      description: "Drag and drop your construction drawings or photos",
      icon: "Upload",
      status: "completed"
    },
    {
      id: "analyze",
      title: "AI Analysis",
      description: "Our AI identifies and categorizes all construction elements",
      icon: "Brain",
      status: "processing"
    },
    {
      id: "measure",
      title: "Precise Measurements",
      description: "Automatic calculation of dimensions, areas, and quantities",
      icon: "Ruler",
      status: "pending"
    },
    {
      id: "estimate",
      title: "Cost Estimation",
      description: "Real-time material and labor cost calculations",
      icon: "Calculator",
      status: "pending"
    }
  ];

  const mockElements = [
    { type: "Walls", count: 24, area: "2,450 sq ft", detected: false, color: "#2b7bcd" },
    { type: "Doors", count: 8, area: "64 sq ft", detected: false, color: "#10b981" },
    { type: "Windows", count: 16, area: "320 sq ft", detected: false, color: "#f59e0b" },
    { type: "Columns", count: 12, area: "48 sq ft", detected: false, color: "#8b5cf6" }
  ];

  const mockMeasurements = [
    { item: "Total Floor Area", value: "2,450 sq ft", calculated: false },
    { item: "Perimeter Length", value: "240 ft", calculated: false },
    { item: "Wall Height", value: "10 ft", calculated: false },
    { item: "Volume", value: "24,500 cu ft", calculated: false }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < demoSteps?.length - 1) {
        setCurrentStep(prev => prev + 1);
        
        if (currentStep === 1) {
          // Simulate AI detection
          simulateDetection();
        } else if (currentStep === 2) {
          // Simulate measurements
          simulateMeasurements();
        }
      } else {
        setCurrentStep(0);
        setDetectedElements([]);
        setMeasurements([]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const simulateDetection = () => {
    setIsProcessing(true);
    mockElements?.forEach((element, index) => {
      setTimeout(() => {
        setDetectedElements(prev => [...prev, { ...element, detected: true }]);
        if (index === mockElements?.length - 1) {
          setIsProcessing(false);
        }
      }, (index + 1) * 500);
    });
  };

  const simulateMeasurements = () => {
    mockMeasurements?.forEach((measurement, index) => {
      setTimeout(() => {
        setMeasurements(prev => [...prev, { ...measurement, calculated: true }]);
      }, (index + 1) * 400);
    });
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
    if (stepIndex === 1) {
      setDetectedElements([]);
      simulateDetection();
    } else if (stepIndex === 2) {
      setMeasurements([]);
      simulateMeasurements();
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Icon name="Play" size={16} className="text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Interactive Experience</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-6">
            See BCBP in Action
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Experience how our AI transforms construction drawings into accurate takeoffs 
            and estimates in minutes, not hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Process Steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-primary mb-8">
              AI-Powered Workflow
            </h3>
            
            {demoSteps?.map((step, index) => (
              <div
                key={step?.id}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-white shadow-professional border-2 border-accent/20'
                    : 'bg-muted hover:bg-white hover:shadow-professional border border-transparent'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-accent text-white scale-110' :'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {index < currentStep ? (
                      <Icon name="Check" size={24} />
                    ) : index === currentStep && isProcessing ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Icon name={step?.icon} size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-1 ${
                      index <= currentStep ? 'text-brand-primary' : 'text-text-secondary'
                    }`}>
                      {step?.title}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {step?.description}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center">
                    {index < currentStep && (
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span className="text-xs text-success font-medium">Complete</span>
                      </div>
                    )}
                    {index === currentStep && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-xs text-accent font-medium">Processing</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Line */}
                {index < demoSteps?.length - 1 && (
                  <div className="absolute left-12 top-20 w-0.5 h-6 bg-slate-200">
                    <div 
                      className={`w-full transition-all duration-500 ${
                        index < currentStep ? 'h-full bg-accent' : 'h-0 bg-accent'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Demo CTA */}
            <div className="pt-8">
              <Button
                variant="default"
                size="lg"
                className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary w-full"
                asChild
              >
                <Link to="/product-demo">
                  <Icon name="Zap" size={20} className="mr-2" />
                  Try Full Interactive Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Live Demo Display */}
          <div className="relative">
            <div className="bg-slate-900 rounded-2xl p-8 min-h-[600px]">
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon name="FileImage" size={16} className="text-accent" />
                  </div>
                  <span className="text-white font-medium">Construction_Plan_v2.pdf</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-slate-300">AI Processing</span>
                </div>
              </div>

              {/* Blueprint Mockup */}
              <div className="relative bg-slate-800 rounded-xl h-64 mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
                
                {/* Simulated Blueprint Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#475569" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Blueprint Elements */}
                  <rect x="40" y="40" width="120" height="80" fill="none" stroke="#2b7bcd" strokeWidth="2" />
                  <rect x="180" y="60" width="60" height="40" fill="none" stroke="#10b981" strokeWidth="2" />
                  <rect x="60" y="140" width="80" height="60" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="280" cy="80" r="15" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                </svg>

                {/* AI Detection Overlays */}
                {detectedElements?.map((element, index) => (
                  <div
                    key={index}
                    className="absolute animate-pulse-detect"
                    style={{
                      left: `${20 + index * 60}px`,
                      top: `${40 + (index % 2) * 100}px`,
                      width: '60px',
                      height: '40px',
                      border: `2px solid ${element?.color}`,
                      borderRadius: '4px',
                      backgroundColor: `${element?.color}10`
                    }}
                  >
                    <div 
                      className="absolute -top-6 left-0 text-xs font-medium px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: element?.color,
                        color: 'white'
                      }}
                    >
                      {element?.type}
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Display */}
              <div className="space-y-4">
                {currentStep >= 1 && (
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Icon name="Eye" size={16} className="text-accent mr-2" />
                      Detected Elements
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {detectedElements?.map((element, index) => (
                        <div key={index} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: element?.color }}
                            />
                            <span className="text-white text-sm">{element?.type}</span>
                          </div>
                          <span className="text-slate-300 text-sm">{element?.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep >= 2 && (
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Icon name="Ruler" size={16} className="text-success mr-2" />
                      Measurements
                    </h4>
                    <div className="space-y-2">
                      {measurements?.map((measurement, index) => (
                        <div key={index} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                          <span className="text-white text-sm">{measurement?.item}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-success font-mono text-sm">{measurement?.value}</span>
                            <Icon name="Check" size={14} className="text-success" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep >= 3 && (
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Icon name="Calculator" size={16} className="text-warning mr-2" />
                      Cost Estimation
                    </h4>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-success">$125,400</div>
                          <div className="text-xs text-slate-300">Materials</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-warning">$89,200</div>
                          <div className="text-xs text-slate-300">Labor</div>
                        </div>
                      </div>
                      <div className="border-t border-slate-700 mt-4 pt-4 text-center">
                        <div className="text-3xl font-bold text-white">$214,600</div>
                        <div className="text-sm text-slate-300">Total Estimated Cost</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-success/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-white" />
                <span className="text-sm font-medium text-white">10x Faster</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-accent/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-white" />
                <span className="text-sm font-medium text-white">99.2% Accurate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-brand-primary mb-4">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Experience the full power of BCBP AI with our comprehensive product demo and free trial.
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
              <Link to="/product-demo">
                Full Product Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;