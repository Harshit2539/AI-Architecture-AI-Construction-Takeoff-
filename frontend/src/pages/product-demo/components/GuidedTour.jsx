import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuidedTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const tourSteps = [
    {
      id: 'upload',
      title: 'Upload Your Drawing',
      description: 'Start by uploading your construction drawings, blueprints, or CAD files. BCBP supports all major file formats including PDF, DWG, and image files.',
      position: { top: '20%', left: '15%' },
      callout: 'Click here to upload your files',
      tips: [
        'Supports PDF, DWG, DXF, and image formats',
        'Drag and drop multiple files at once',
        'Files are processed securely in the cloud'
      ],
      duration: 3000
    },
    {
      id: 'ai-analysis',
      title: 'AI Analysis Begins',
      description: 'Our advanced AI engine analyzes your drawing, identifying construction elements, understanding scale, and preparing for accurate measurements.',
      position: { top: '15%', right: '20%' },
      callout: 'AI processing happens here',
      tips: [
        'Automatic scale detection and calibration',
        'Element classification and recognition',
        'Quality assessment and optimization'
      ],
      duration: 4000
    },
    {
      id: 'element-detection',
      title: 'Smart Element Detection',
      description: 'Watch as BCBP automatically identifies walls, doors, windows, and other construction elements with precision highlighting and categorization.',
      position: { top: '40%', left: '25%' },
      callout: 'Elements are highlighted as detected',
      tips: [
        'Real-time element highlighting',
        'Automatic categorization by type',
        'Confidence scoring for each detection'
      ],
      duration: 3500
    },
    {
      id: 'measurements',
      title: 'Precise Measurements',
      description: 'BCBP calculates exact dimensions, areas, and quantities for each detected element, providing detailed measurement data with industry-standard accuracy.',
      position: { bottom: '30%', right: '15%' },
      callout: 'Measurements appear in real-time',
      tips: [
        'Automatic dimension calculations',
        'Area and volume computations',
        'Quantity takeoffs by element type'
      ],
      duration: 3000
    },
    {
      id: 'review-edit',
      title: 'Review & Edit',
      description: 'Review all detected elements and measurements. Make adjustments, add annotations, or modify quantities as needed with intuitive editing tools.',
      position: { bottom: '20%', left: '20%' },
      callout: 'Edit and refine your takeoff here',
      tips: [
        'Click to edit any measurement',
        'Add custom annotations and notes',
        'Adjust quantities and dimensions'
      ],
      duration: 2500
    },
    {
      id: 'export-share',
      title: 'Export & Share',
      description: 'Generate comprehensive reports, export to your preferred format, and share with team members or clients for collaboration and approval.',
      position: { top: '25%', right: '15%' },
      callout: 'Export options available here',
      tips: [
        'Multiple export formats available',
        'Customizable report templates',
        'Real-time collaboration features'
      ],
      duration: 2000
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % tourSteps?.length;
          setCompletedSteps(prevCompleted => new Set([...prevCompleted, prev]));
          return nextStep;
        });
      }, tourSteps?.[currentStep]?.duration || 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const startTour = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const pauseTour = () => {
    setIsPlaying(false);
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    setIsPlaying(false);
  };

  const resetTour = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCompletedSteps(new Set());
  };

  const currentStepData = tourSteps?.[currentStep];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Guided Product Tour
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Take a step-by-step journey through BCBP's intelligent takeoff process. See exactly how our AI transforms your construction drawings into accurate quantity takeoffs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Tour Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Tour Controls</h3>
              
              <div className="flex space-x-3 mb-6">
                <Button
                  variant={isPlaying ? "outline" : "default"}
                  size="sm"
                  onClick={isPlaying ? pauseTour : startTour}
                  className={isPlaying ? "border-slate-600 text-slate-300" : "bg-orange-500 hover:bg-orange-600 text-white"}
                  iconName={isPlaying ? "Pause" : "Play"}
                  iconPosition="left"
                >
                  {isPlaying ? 'Pause' : 'Start Tour'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetTour}
                  className="border-slate-600 text-slate-300"
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-3">
                {tourSteps?.map((step, index) => (
                  <button
                    key={step?.id}
                    onClick={() => goToStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      index === currentStep
                        ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
                        : completedSteps?.has(index)
                          ? 'bg-green-500/10 border border-green-400/20 text-green-300' :'bg-slate-700/30 border border-slate-600/30 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        index === currentStep
                          ? 'bg-blue-500 text-white'
                          : completedSteps?.has(index)
                            ? 'bg-green-500 text-white' :'bg-slate-600 text-slate-300'
                      }`}>
                        {completedSteps?.has(index) ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step?.title}</div>
                        <div className="text-xs opacity-75 mt-1">
                          Step {index + 1} of {tourSteps?.length}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((currentStep + 1) / tourSteps?.length) * 100)}%</span>
                </div>
                <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / tourSteps?.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Current Step Details */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">{currentStep + 1}</span>
                </div>
                <h3 className="text-lg font-semibold">{currentStepData?.title}</h3>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                {currentStepData?.description}
              </p>

              <div className="space-y-3">
                <h4 className="font-medium text-slate-200">Key Features:</h4>
                {currentStepData?.tips?.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Demo Area */}
          <div className="lg:col-span-2">
            <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
              {/* Demo Interface */}
              <div className="aspect-[16/10] relative">
                {/* Simulated Interface Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
                  {/* Interface Elements */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-slate-400">BCBP Construction AI</div>
                  </div>

                  {/* Main Content Area */}
                  <div className="absolute top-16 left-4 right-4 bottom-4 bg-slate-100 rounded-lg overflow-hidden">
                    {/* Simulated Drawing Area */}
                    <div className="relative w-full h-full bg-white">
                      {/* Drawing Content */}
                      <svg className="w-full h-full" viewBox="0 0 800 500">
                        {/* Building outline */}
                        <rect x="100" y="100" width="600" height="300" fill="none" stroke="#1e293b" strokeWidth="3" />
                        
                        {/* Walls */}
                        <line x1="100" y1="250" x2="700" y2="250" stroke="#1e293b" strokeWidth="2" />
                        <line x1="400" y1="100" x2="400" y2="400" stroke="#1e293b" strokeWidth="2" />
                        
                        {/* Doors */}
                        <rect x="180" y="395" width="40" height="5" fill="#10b981" />
                        <rect x="580" y="395" width="40" height="5" fill="#10b981" />
                        
                        {/* Windows */}
                        <rect x="200" y="95" width="80" height="5" fill="#f59e0b" />
                        <rect x="520" y="95" width="80" height="5" fill="#f59e0b" />
                        <rect x="95" y="180" width="5" height="60" fill="#f59e0b" />
                        <rect x="700" y="180" width="5" height="60" fill="#f59e0b" />

                        {/* AI Detection Highlights */}
                        {currentStep >= 2 && (
                          <>
                            <circle cx="200" cy="200" r="8" fill="#3b82f6" className="detection-point" />
                            <circle cx="600" cy="300" r="8" fill="#10b981" className="detection-point" style={{ animationDelay: '0.5s' }} />
                            <circle cx="400" cy="150" r="8" fill="#f59e0b" className="detection-point" style={{ animationDelay: '1s' }} />
                            <circle cx="500" cy="350" r="8" fill="#8b5cf6" className="detection-point" style={{ animationDelay: '1.5s' }} />
                          </>
                        )}

                        {/* Measurements */}
                        {currentStep >= 3 && (
                          <>
                            <text x="400" y="85" textAnchor="middle" className="text-xs fill-slate-600">600 ft</text>
                            <text x="85" y="250" textAnchor="middle" className="text-xs fill-slate-600" transform="rotate(-90 85 250)">300 ft</text>
                          </>
                        )}
                      </svg>

                      {/* Floating Callout */}
                      {currentStepData?.callout && (
                        <div 
                          className="absolute bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg animate-pulse"
                          style={currentStepData?.position}
                        >
                          {currentStepData?.callout}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="absolute bottom-6 left-6 flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-300">AI Active</span>
                    </div>
                    {currentStep >= 2 && (
                      <div className="flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Icon name="Target" size={12} className="text-blue-400" />
                        <span className="text-xs text-slate-300">Elements: {Math.min((currentStep - 1) * 12, 47)}</span>
                      </div>
                    )}
                    {currentStep >= 3 && (
                      <div className="flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Icon name="Ruler" size={12} className="text-green-400" />
                        <span className="text-xs text-slate-300">98.7% Accuracy</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tour Navigation */}
              <div className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="border-slate-600 text-slate-300 disabled:opacity-50"
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToStep(Math.min(tourSteps?.length - 1, currentStep + 1))}
                      disabled={currentStep === tourSteps?.length - 1}
                      className="border-slate-600 text-slate-300 disabled:opacity-50"
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next
                    </Button>
                  </div>

                  <div className="text-sm text-slate-400">
                    Step {currentStep + 1} of {tourSteps?.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Completion CTA */}
            {currentStep === tourSteps?.length - 1 && (
              <div className="mt-6 bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-400/30 rounded-xl p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Ready to Experience BCBP?</h3>
                <p className="text-slate-300 mb-4">
                  You've seen how BCBP transforms construction takeoffs. Start your free trial and experience the power of AI-driven precision.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    iconName="Zap"
                    iconPosition="left"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-400 text-slate-300 hover:bg-slate-800"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidedTour;