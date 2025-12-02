import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [currentVisualization, setCurrentVisualization] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const visualizations = [
    {
      title: "AI-Powered Takeoff Detection",
      description: "Watch as our AI identifies and measures construction elements in real-time",
      elements: [
        { type: "wall", count: 24, color: "#2b7bcd" },
        { type: "door", count: 8, color: "#10b981" },
        { type: "window", count: 16, color: "#f59e0b" }
      ]
    },
    {
      title: "Intelligent Material Estimation",
      description: "Automated calculations with 99.2% accuracy for precise project planning",
      elements: [
        { type: "concrete", count: 450, color: "#64748b" },
        { type: "steel", count: 120, color: "#ef4444" },
        { type: "lumber", count: 280, color: "#8b5cf6" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentVisualization((prev) => (prev + 1) % visualizations?.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentViz = visualizations?.[currentVisualization];

  return (
    <section className="relative min-h-screen bg-brand-primary overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-20"></div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-conversion/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-success/10 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                <Icon name="Zap" size={16} className="text-accent mr-2" />
                <span className="text-sm font-medium text-accent">AI-Powered Construction Intelligence</span>
              </div>
              
              <h1 className="text-responsive-xl font-bold text-white leading-tight">
                Transform Construction 
                <span className="text-accent block">Takeoffs with AI</span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                Revolutionize your pre-construction workflows with intelligent automation that delivers 
                <span className="text-conversion font-semibold"> 10x faster takeoffs</span> and 
                <span className="text-success font-semibold"> 99.2% accuracy</span>.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "Clock", value: "10x", label: "Faster Takeoffs" },
                { icon: "Target", value: "99.2%", label: "Accuracy Rate" },
                { icon: "TrendingUp", value: "40%", label: "Cost Savings" }
              ]?.map((benefit, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Icon name={benefit?.icon} size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{benefit?.value}</div>
                      <div className="text-sm text-slate-300">{benefit?.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
                asChild
              >
                <Link to="/free-trial">
                  <Icon name="Play" size={20} className="mr-2" />
                  Try BCBP Free
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/product-demo">
                  <Icon name="Eye" size={20} className="mr-2" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4]?.map((i) => (
                    <div key={i} className="w-8 h-8 bg-accent rounded-full border-2 border-brand-primary"></div>
                  ))}
                </div>
                <span className="text-sm text-slate-300">Trusted by 10,000+ professionals</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon key={star} name="Star" size={16} className="text-warning fill-current" />
                ))}
                <span className="text-sm text-slate-300 ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right Visualization */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {currentViz?.title}
                  </h3>
                  <p className="text-slate-300 text-sm">
                    {currentViz?.description}
                  </p>
                </div>

                {/* 3D Construction Visualization */}
                <div className="relative h-64 bg-slate-900/50 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`grid grid-cols-3 gap-4 transition-all duration-500 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
                      {currentViz?.elements?.map((element, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="w-16 h-16 rounded-lg mx-auto mb-2 flex items-center justify-center animate-pulse-detect"
                            style={{ backgroundColor: `${element?.color}20`, border: `2px solid ${element?.color}` }}
                          >
                            <span className="text-2xl font-bold" style={{ color: element?.color }}>
                              {element?.count}
                            </span>
                          </div>
                          <div className="text-xs text-slate-300 capitalize">{element?.type}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Detection Overlay */}
                  <svg className="absolute inset-0 w-full h-full">
                    <rect 
                      x="20" y="20" width="60" height="40" 
                      fill="none" 
                      stroke="#2b7bcd" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      className="ai-detection-overlay"
                    />
                    <rect 
                      x="100" y="80" width="80" height="60" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      className="ai-detection-overlay"
                      style={{ animationDelay: '0.5s' }}
                    />
                    <rect 
                      x="200" y="40" width="50" height="80" 
                      fill="none" 
                      stroke="#f59e0b" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      className="ai-detection-overlay"
                      style={{ animationDelay: '1s' }}
                    />
                  </svg>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center space-x-2">
                  {visualizations?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVisualization(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentVisualization 
                          ? 'bg-accent scale-125' :'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-success/90 backdrop-blur-sm rounded-lg p-3 border border-success/20">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-white" />
                <span className="text-sm font-medium text-white">Live Processing</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-conversion/90 backdrop-blur-sm rounded-lg p-3 border border-conversion/20">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-white" />
                <span className="text-sm font-medium text-white">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;