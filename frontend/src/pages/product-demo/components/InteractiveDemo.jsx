import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InteractiveDemo = ({ isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [detectedElements, setDetectedElements] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [measurements, setMeasurements] = useState({});

  const demoSteps = [
    {
      id: 'upload',
      title: 'Upload Construction Drawing',
      description: 'Start by uploading your architectural plans or construction drawings',
      icon: 'Upload',
      duration: 2000
    },
    {
      id: 'analyze',
      title: 'AI Analysis in Progress',
      description: 'Our AI engine analyzes the drawing and identifies construction elements',
      icon: 'Brain',
      duration: 3000
    },
    {
      id: 'detect',
      title: 'Element Detection',
      description: 'AI automatically detects walls, doors, windows, and other components',
      icon: 'Target',
      duration: 2500
    },
    {
      id: 'measure',
      title: 'Precise Measurements',
      description: 'Calculate accurate dimensions and quantities for each detected element',
      icon: 'Ruler',
      duration: 2000
    },
    {
      id: 'results',
      title: 'Takeoff Complete',
      description: 'Review comprehensive results with detailed measurements and quantities',
      icon: 'CheckCircle',
      duration: 1000
    }
  ];

  const mockElements = [
    { id: 1, type: 'Wall', count: 24, totalLength: '342.5 ft', color: 'bg-blue-500' },
    { id: 2, type: 'Door', count: 12, totalArea: '96 sq ft', color: 'bg-green-500' },
    { id: 3, type: 'Window', count: 18, totalArea: '144 sq ft', color: 'bg-yellow-500' },
    { id: 4, type: 'Column', count: 8, totalVolume: '64 cu ft', color: 'bg-purple-500' },
    { id: 5, type: 'Beam', count: 16, totalLength: '256 ft', color: 'bg-red-500' }
  ];

  useEffect(() => {
    if (!isActive) return;

    const runDemo = async () => {
      for (let i = 0; i < demoSteps?.length; i++) {
        setCurrentStep(i);
        setIsProcessing(i === 1 || i === 2);
        
        if (i === 2) {
          // Simulate element detection
          for (let j = 0; j < mockElements?.length; j++) {
            setTimeout(() => {
              setDetectedElements(prev => [...prev, mockElements?.[j]]);
            }, j * 500);
          }
        }
        
        if (i === 3) {
          // Simulate measurements
          setTimeout(() => {
            setMeasurements({
              totalWalls: '342.5 ft',
              totalDoors: '12 units',
              totalWindows: '18 units',
              totalArea: '2,450 sq ft'
            });
          }, 1000);
        }
        
        await new Promise(resolve => setTimeout(resolve, demoSteps[i].duration));
      }
    };

    runDemo();
  }, [isActive]);

  const resetDemo = () => {
    setCurrentStep(0);
    setDetectedElements([]);
    setIsProcessing(false);
    setMeasurements({});
  };

  if (!isActive) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Interactive AI Takeoff Demo
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience how BCBP's AI technology transforms construction drawings into accurate takeoffs in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Visualization */}
          <div className="space-y-6">
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 min-h-[400px] relative overflow-hidden">
              {currentStep === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Upload" size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Upload</h3>
                  <p className="text-slate-600">Click to upload your construction drawing</p>
                </div>
              )}

              {currentStep >= 1 && (
                <div className="relative">
                  {/* Simulated Drawing */}
                  <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded relative overflow-hidden">
                      {/* Drawing elements */}
                      <svg className="w-full h-full" viewBox="0 0 400 300">
                        {/* Walls */}
                        <rect x="50" y="50" width="300" height="4" fill="#1e293b" />
                        <rect x="50" y="246" width="300" height="4" fill="#1e293b" />
                        <rect x="50" y="50" width="4" height="200" fill="#1e293b" />
                        <rect x="346" y="50" width="4" height="200" fill="#1e293b" />
                        
                        {/* Doors */}
                        <rect x="150" y="246" width="30" height="4" fill="#10b981" />
                        <rect x="220" y="246" width="30" height="4" fill="#10b981" />
                        
                        {/* Windows */}
                        <rect x="100" y="50" width="40" height="4" fill="#f59e0b" />
                        <rect x="260" y="50" width="40" height="4" fill="#f59e0b" />
                        <rect x="50" y="100" width="4" height="30" fill="#f59e0b" />
                        <rect x="346" y="120" width="4" height="30" fill="#f59e0b" />
                      </svg>

                      {/* AI Detection Overlay */}
                      {currentStep >= 2 && (
                        <div className="absolute inset-0">
                          {detectedElements?.map((element, index) => (
                            <div
                              key={element?.id}
                              className={`absolute w-3 h-3 ${element?.color} rounded-full detection-point`}
                              style={{
                                top: `${20 + index * 15}%`,
                                left: `${30 + index * 20}%`,
                                animationDelay: `${index * 0.2}s`
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Processing Overlay */}
                      {isProcessing && (
                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-blue-600 font-medium">AI Processing...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detection Results */}
                  {currentStep >= 3 && detectedElements?.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {detectedElements?.map((element) => (
                        <div key={element?.id} className="bg-white border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 ${element?.color} rounded-full`}></div>
                            <span className="text-sm font-medium text-slate-900">{element?.type}</span>
                          </div>
                          <div className="mt-1 text-xs text-slate-600">
                            {element?.count} units • {element?.totalLength || element?.totalArea || element?.totalVolume}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / demoSteps?.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Demo Steps */}
          <div className="space-y-6">
            <div className="space-y-4">
              {demoSteps?.map((step, index) => (
                <div 
                  key={step?.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : index < currentStep 
                        ? 'bg-green-50 border border-green-200' :'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    index === currentStep 
                      ? 'bg-blue-500 text-white' 
                      : index < currentStep 
                        ? 'bg-green-500 text-white' :'bg-slate-300 text-slate-600'
                  }`}>
                    {index < currentStep ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{step?.title}</h3>
                    <p className="text-sm text-slate-600">{step?.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Summary */}
            {currentStep === demoSteps?.length - 1 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Takeoff Complete!</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Elements Detected:</span>
                    <span className="ml-2 font-semibold text-slate-900">78</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Processing Time:</span>
                    <span className="ml-2 font-semibold text-slate-900">12.3s</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Accuracy Rate:</span>
                    <span className="ml-2 font-semibold text-green-600">98.7%</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Time Saved:</span>
                    <span className="ml-2 font-semibold text-blue-600">4.2 hours</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={resetDemo}
                iconName="RotateCcw"
                iconPosition="left"
                className="flex-1"
              >
                Restart Demo
              </Button>
              <Button
                variant="default"
                className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Try Full Version
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;