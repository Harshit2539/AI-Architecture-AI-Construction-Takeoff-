import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e) => {
    if (sliderRef?.current) {
      const rect = sliderRef?.current?.getBoundingClientRect();
      const x = e?.clientX - rect?.left;
      const percentage = Math.max(0, Math.min(100, (x / rect?.width) * 100));
      setSliderPosition(percentage);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const beforeData = {
    title: 'Traditional Manual Takeoff',
    timeSpent: '8-12 hours',
    accuracy: '85-90%',
    errors: 'High risk',
    collaboration: 'Email & phone',
    updates: 'Manual revision',
    cost: 'High labor cost'
  };

  const afterData = {
    title: 'BCBP AI-Powered Takeoff',
    timeSpent: '30-45 minutes',
    accuracy: '98.7%',
    errors: 'Minimal risk',
    collaboration: 'Real-time sync',
    updates: 'Automatic',
    cost: '85% cost reduction'
  };

  const comparisonMetrics = [
    { label: 'Time Required', before: beforeData?.timeSpent, after: afterData?.timeSpent, icon: 'Clock' },
    { label: 'Accuracy Rate', before: beforeData?.accuracy, after: afterData?.accuracy, icon: 'Target' },
    { label: 'Error Risk', before: beforeData?.errors, after: afterData?.errors, icon: 'AlertTriangle' },
    { label: 'Collaboration', before: beforeData?.collaboration, after: afterData?.collaboration, icon: 'Users' },
    { label: 'Updates', before: beforeData?.updates, after: afterData?.updates, icon: 'RefreshCw' },
    { label: 'Cost Impact', before: beforeData?.cost, after: afterData?.cost, icon: 'DollarSign' }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Before vs After: The BCBP Transformation
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See the dramatic difference BCBP makes in construction takeoff workflows. Drag the slider to compare traditional methods with AI-powered precision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Interactive Comparison Slider */}
          <div className="relative">
            <div 
              ref={sliderRef}
              className="relative bg-slate-100 rounded-xl overflow-hidden cursor-crosshair select-none"
              style={{ aspectRatio: '4/3' }}
              onMouseDown={handleMouseDown}
            >
              {/* Before Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="FileText" size={32} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Manual Process</h3>
                    <p className="text-red-700 text-sm">Time-consuming, error-prone traditional takeoffs</p>
                    
                    {/* Simulated manual elements */}
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between text-xs text-red-800">
                        <span>Wall measurements</span>
                        <span className="bg-red-200 px-2 py-1 rounded">Manual</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-red-800">
                        <span>Door counting</span>
                        <span className="bg-red-200 px-2 py-1 rounded">Manual</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-red-800">
                        <span>Area calculations</span>
                        <span className="bg-red-200 px-2 py-1 rounded">Manual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* After Image */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Brain" size={32} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 mb-2">AI-Powered</h3>
                    <p className="text-green-700 text-sm">Automated, accurate, intelligent takeoffs</p>
                    
                    {/* Simulated AI elements */}
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between text-xs text-green-800">
                        <span>Wall measurements</span>
                        <span className="bg-green-200 px-2 py-1 rounded">AI Auto</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-green-800">
                        <span>Door counting</span>
                        <span className="bg-green-200 px-2 py-1 rounded">AI Auto</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-green-800">
                        <span>Area calculations</span>
                        <span className="bg-green-200 px-2 py-1 rounded">AI Auto</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Icon name="Move" size={16} className="text-slate-600" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                Before
              </div>
              <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                After
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">
                <Icon name="MousePointer" size={16} className="inline mr-1" />
                Drag the slider to compare
              </p>
            </div>
          </div>

          {/* Comparison Metrics */}
          <div className="space-y-6">
            <div className="grid gap-4">
              {comparisonMetrics?.map((metric, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name={metric?.icon} size={16} className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">{metric?.label}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-xs text-red-600 font-medium mb-1">Before</div>
                      <div className="text-sm font-semibold text-red-800">{metric?.before}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-xs text-green-600 font-medium mb-1">After</div>
                      <div className="text-sm font-semibold text-green-800">{metric?.after}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="TrendingUp" size={24} className="text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">ROI Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-blue-800">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">$50K+</div>
                  <div className="text-sm text-blue-800">Annual Savings</div>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Experience the Transformation
            </Button>
          </div>
        </div>

        {/* Success Stories Preview */}
        <div className="bg-slate-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Real Customer Transformations</h3>
            <p className="text-slate-600">See how construction professionals achieved these results with BCBP</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="Building" size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Metro Construction</h4>
                  <p className="text-sm text-slate-600">General Contractor</p>
                </div>
              </div>
              <blockquote className="text-slate-700 text-sm italic mb-4">
                "BCBP reduced our takeoff time from 2 days to 2 hours. The accuracy improvement has eliminated costly estimation errors."
              </blockquote>
              <div className="flex space-x-4 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-green-600">90%</div>
                  <div className="text-slate-600">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">99.2%</div>
                  <div className="text-slate-600">Accuracy</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="Calculator" size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Precision Estimating</h4>
                  <p className="text-sm text-slate-600">Cost Consulting</p>
                </div>
              </div>
              <blockquote className="text-slate-700 text-sm italic mb-4">
                "Our team can now handle 3x more projects with the same resources. Client satisfaction has never been higher."
              </blockquote>
              <div className="flex space-x-4 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-green-600">300%</div>
                  <div className="text-slate-600">Capacity</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">$75K</div>
                  <div className="text-slate-600">Annual Savings</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">BuildTech Solutions</h4>
                  <p className="text-sm text-slate-600">Project Management</p>
                </div>
              </div>
              <blockquote className="text-slate-700 text-sm italic mb-4">
                "The collaboration features transformed how our distributed team works. Everyone stays in sync effortlessly."
              </blockquote>
              <div className="flex space-x-4 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-green-600">50%</div>
                  <div className="text-slate-600">Faster Reviews</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">Zero</div>
                  <div className="text-slate-600">Version Conflicts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSlider;