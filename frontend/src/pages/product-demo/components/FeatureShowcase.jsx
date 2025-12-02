import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState('takeoff');

  const features = [
    {
      id: 'takeoff',
      title: 'AI-Powered Takeoff',
      description: 'Automatically detect and quantify construction elements from drawings with 98%+ accuracy',
      icon: 'Target',
      color: 'blue',
      stats: [
        { label: 'Time Saved', value: '85%', icon: 'Clock' },
        { label: 'Accuracy Rate', value: '98.7%', icon: 'CheckCircle' },
        { label: 'Elements Detected', value: '50+', icon: 'Layers' }
      ],
      capabilities: [
        'Automatic wall detection and measurement',
        'Door and window identification',
        'Structural element recognition',
        'Material quantity calculations',
        'Real-time measurement validation'
      ]
    },
    {
      id: 'estimating',
      title: 'Smart Estimating',
      description: 'Generate accurate cost estimates with integrated pricing databases and market intelligence',
      icon: 'Calculator',
      color: 'green',
      stats: [
        { label: 'Cost Accuracy', value: '94%', icon: 'DollarSign' },
        { label: 'Estimate Speed', value: '10x', icon: 'Zap' },
        { label: 'Price Updates', value: 'Real-time', icon: 'TrendingUp' }
      ],
      capabilities: [
        'Automated cost calculations',
        'Real-time pricing updates',
        'Labor and material breakdowns',
        'Regional cost adjustments',
        'Historical data analysis'
      ]
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      description: 'Seamless collaboration tools for distributed teams with real-time updates and version control',
      icon: 'Users',
      color: 'purple',
      stats: [
        { label: 'Team Members', value: 'Unlimited', icon: 'Users' },
        { label: 'Real-time Sync', value: '< 1s', icon: 'RefreshCw' },
        { label: 'Version Control', value: 'Automatic', icon: 'GitBranch' }
      ],
      capabilities: [
        'Real-time collaborative editing',
        'Comment and markup tools',
        'Version history tracking',
        'Role-based permissions',
        'Mobile app synchronization'
      ]
    },
    {
      id: 'reporting',
      title: 'Advanced Reporting',
      description: 'Comprehensive reports and analytics with customizable templates and export options',
      icon: 'BarChart3',
      color: 'orange',
      stats: [
        { label: 'Report Types', value: '25+', icon: 'FileText' },
        { label: 'Export Formats', value: '10+', icon: 'Download' },
        { label: 'Custom Templates', value: 'Unlimited', icon: 'Layout' }
      ],
      capabilities: [
        'Detailed quantity reports',
        'Cost breakdown analysis',
        'Progress tracking dashboards',
        'Custom report templates',
        'Automated report generation'
      ]
    }
  ];

  const getColorClasses = (color, variant = 'default') => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        bgLight: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        textDark: 'text-blue-900'
      },
      green: {
        bg: 'bg-green-500',
        bgLight: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        textDark: 'text-green-900'
      },
      purple: {
        bg: 'bg-purple-500',
        bgLight: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        textDark: 'text-purple-900'
      },
      orange: {
        bg: 'bg-orange-500',
        bgLight: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-600',
        textDark: 'text-orange-900'
      }
    };
    return colors?.[color] || colors?.blue;
  };

  const activeFeatureData = features?.find(f => f?.id === activeFeature);
  const colorClasses = getColorClasses(activeFeatureData?.color);

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Construction Intelligence Suite
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our complete platform designed to transform every aspect of your pre-construction workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {features?.map((feature) => {
            const isActive = activeFeature === feature?.id;
            const featureColors = getColorClasses(feature?.color);
            
            return (
              <button
                key={feature?.id}
                onClick={() => setActiveFeature(feature?.id)}
                className={`text-left p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  isActive 
                    ? `${featureColors?.bgLight} ${featureColors?.border} shadow-lg` 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  isActive ? featureColors?.bg : 'bg-slate-100'
                }`}>
                  <Icon 
                    name={feature?.icon} 
                    size={24} 
                    className={isActive ? 'text-white' : 'text-slate-600'} 
                  />
                </div>
                <h3 className={`font-semibold mb-2 ${
                  isActive ? featureColors?.textDark : 'text-slate-900'
                }`}>
                  {feature?.title}
                </h3>
                <p className={`text-sm ${
                  isActive ? featureColors?.text : 'text-slate-600'
                }`}>
                  {feature?.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className={`${colorClasses?.bgLight} ${colorClasses?.border} border rounded-2xl p-8 lg:p-12`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${colorClasses?.bg} rounded-lg flex items-center justify-center`}>
                    <Icon name={activeFeatureData?.icon} size={24} className="text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${colorClasses?.textDark}`}>
                    {activeFeatureData?.title}
                  </h3>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {activeFeatureData?.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {activeFeatureData?.stats?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-10 h-10 ${colorClasses?.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <Icon name={stat?.icon} size={20} className="text-white" />
                    </div>
                    <div className={`text-2xl font-bold ${colorClasses?.textDark} mb-1`}>
                      {stat?.value}
                    </div>
                    <div className="text-sm text-slate-600">{stat?.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 mb-4">Key Capabilities:</h4>
                {activeFeatureData?.capabilities?.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className={colorClasses?.text} />
                    <span className="text-slate-700">{capability}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="default"
                  className={`${colorClasses?.bg} hover:opacity-90 text-white`}
                  iconName="Play"
                  iconPosition="left"
                >
                  Try This Feature
                </Button>
                <Button
                  variant="outline"
                  className={`border-slate-300 text-slate-700 hover:bg-slate-100`}
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg relative overflow-hidden">
                  {/* Feature-specific visualization */}
                  {activeFeature === 'takeoff' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 border-4 border-blue-500 rounded-lg relative">
                          <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full detection-point"></div>
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full detection-point" style={{ animationDelay: '0.5s' }}></div>
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-500 rounded-full detection-point" style={{ animationDelay: '1s' }}></div>
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full detection-point" style={{ animationDelay: '1.5s' }}></div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Icon name="Target" size={32} className="text-blue-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFeature === 'estimating' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">$247,350</div>
                        <div className="text-sm text-slate-600 mb-4">Total Project Cost</div>
                        <div className="flex space-x-2 justify-center">
                          <div className="w-16 h-2 bg-blue-500 rounded"></div>
                          <div className="w-12 h-2 bg-green-500 rounded"></div>
                          <div className="w-8 h-2 bg-orange-500 rounded"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFeature === 'collaboration' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="flex -space-x-2">
                          <div className="w-12 h-12 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Icon name="User" size={20} className="text-white" />
                          </div>
                          <div className="w-12 h-12 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Icon name="User" size={20} className="text-white" />
                          </div>
                          <div className="w-12 h-12 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Icon name="User" size={20} className="text-white" />
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Icon name="MessageCircle" size={12} className="text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFeature === 'reporting' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <div className="w-16 h-3 bg-blue-500 rounded"></div>
                          <div className="w-12 h-3 bg-slate-300 rounded"></div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-20 h-3 bg-green-500 rounded"></div>
                          <div className="w-8 h-3 bg-slate-300 rounded"></div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-14 h-3 bg-orange-500 rounded"></div>
                          <div className="w-10 h-3 bg-slate-300 rounded"></div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-18 h-3 bg-purple-500 rounded"></div>
                          <div className="w-6 h-3 bg-slate-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <span>Live Demo Environment</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className={`absolute -top-4 -right-4 w-16 h-16 ${colorClasses?.bg} opacity-20 rounded-full blur-xl`}></div>
              <div className={`absolute -bottom-4 -left-4 w-20 h-20 ${colorClasses?.bg} opacity-10 rounded-full blur-xl`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;