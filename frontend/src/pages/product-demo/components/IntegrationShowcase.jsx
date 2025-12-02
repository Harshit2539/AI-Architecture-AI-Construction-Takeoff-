import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const IntegrationShowcase = () => {
  const [activeIntegration, setActiveIntegration] = useState('autodesk');

  const integrations = [
    {
      id: 'autodesk',
      name: 'Autodesk Suite',
      description: 'Seamlessly import from AutoCAD, Revit, and other Autodesk products',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      color: 'blue',
      formats: ['DWG', 'DXF', 'RVT', 'IFC'],
      features: [
        'Direct file import from AutoCAD',
        'Revit model integration',
        'Layer preservation',
        'Scale auto-detection'
      ],
      apiEndpoint: 'autodesk-api.BCBP.com',
      status: 'active'
    },
    {
      id: 'procore',
      name: 'Procore',
      description: 'Sync takeoffs and estimates directly with your Procore projects',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      color: 'green',
      formats: ['API', 'CSV', 'PDF'],
      features: [
        'Project synchronization',
        'Cost data integration',
        'Progress tracking',
        'Team collaboration'
      ],
      apiEndpoint: 'procore-sync.BCBP.com',
      status: 'active'
    },
    {
      id: 'planswift',
      name: 'PlanSwift',
      description: 'Import existing PlanSwift takeoffs and enhance with AI capabilities',
      logo: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center',
      color: 'purple',
      formats: ['PSW', 'XML', 'CSV'],
      features: [
        'Legacy data migration',
        'Takeoff enhancement',
        'Measurement validation',
        'Report conversion'
      ],
      apiEndpoint: 'planswift-bridge.BCBP.com',
      status: 'active'
    },
    {
      id: 'sage',
      name: 'Sage Construction',
      description: 'Connect with Sage Estimating and Project Management tools',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
      color: 'orange',
      formats: ['API', 'XML', 'Excel'],
      features: [
        'Estimating integration',
        'Cost database sync',
        'Project workflows',
        'Financial reporting'
      ],
      apiEndpoint: 'sage-connect.BCBP.com',
      status: 'active'
    },
    {
      id: 'bluebeam',
      name: 'Bluebeam Revu',
      description: 'Import marked-up PDFs and enhance with AI-powered measurements',
      logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop&crop=center',
      color: 'blue',
      formats: ['PDF', 'BCF', 'XML'],
      features: [
        'Markup preservation',
        'Annotation import',
        'Measurement enhancement',
        'Collaboration tools'
      ],
      apiEndpoint: 'bluebeam-api.BCBP.com',
      status: 'beta'
    },
    {
      id: 'excel',
      name: 'Microsoft Excel',
      description: 'Export detailed reports and import custom pricing databases',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      color: 'green',
      formats: ['XLSX', 'CSV', 'XML'],
      features: [
        'Custom report templates',
        'Pricing database import',
        'Formula preservation',
        'Chart generation'
      ],
      apiEndpoint: 'excel-export.BCBP.com',
      status: 'active'
    }
  ];

  const getColorClasses = (color) => {
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

  const activeIntegrationData = integrations?.find(i => i?.id === activeIntegration);
  const colorClasses = getColorClasses(activeIntegrationData?.color);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Seamless Integration Ecosystem
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            BCBP connects with your existing construction software stack, ensuring smooth workflows and eliminating data silos across your organization.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {integrations?.map((integration) => {
            const isActive = activeIntegration === integration?.id;
            const integrationColors = getColorClasses(integration?.color);
            
            return (
              <button
                key={integration?.id}
                onClick={() => setActiveIntegration(integration?.id)}
                className={`text-left p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg relative ${
                  isActive 
                    ? `${integrationColors?.bgLight} ${integrationColors?.border} shadow-lg` 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    integration?.status === 'active' ?'bg-green-100 text-green-700' :'bg-yellow-100 text-yellow-700'
                  }`}>
                    {integration?.status === 'active' ? 'Active' : 'Beta'}
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img 
                      src={integration?.logo} 
                      alt={integration?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg mb-1 ${
                      isActive ? integrationColors?.textDark : 'text-slate-900'
                    }`}>
                      {integration?.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {integration?.formats?.map((format, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            isActive 
                              ? `${integrationColors?.bg} text-white` 
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-sm mb-4 ${
                  isActive ? integrationColors?.text : 'text-slate-600'
                }`}>
                  {integration?.description}
                </p>
                <div className="space-y-2">
                  {integration?.features?.slice(0, 2)?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon 
                        name="Check" 
                        size={14} 
                        className={isActive ? integrationColors?.text : 'text-slate-400'} 
                      />
                      <span className={`text-sm ${
                        isActive ? integrationColors?.textDark : 'text-slate-600'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Integration View */}
        <div className={`${colorClasses?.bgLight} ${colorClasses?.border} border rounded-2xl p-8 lg:p-12`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm">
                    <img 
                      src={activeIntegrationData?.logo} 
                      alt={activeIntegrationData?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${colorClasses?.textDark} mb-1`}>
                      {activeIntegrationData?.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        activeIntegrationData?.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm text-slate-600 capitalize">
                        {activeIntegrationData?.status} Integration
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {activeIntegrationData?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Supported Formats</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeIntegrationData?.formats?.map((format, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 ${colorClasses?.bg} text-white rounded-full text-sm font-medium`}
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">API Endpoint</h4>
                  <div className="bg-slate-100 rounded-lg p-3">
                    <code className="text-sm text-slate-700 font-mono">
                      {activeIntegrationData?.apiEndpoint}
                    </code>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 mb-4">Integration Features:</h4>
                {activeIntegrationData?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className={colorClasses?.text} />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="default"
                  className={`${colorClasses?.bg} hover:opacity-90 text-white`}
                  iconName="Link"
                  iconPosition="left"
                >
                  Connect Now
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                  iconName="FileText"
                  iconPosition="left"
                >
                  View Documentation
                </Button>
              </div>
            </div>

            {/* Integration Flow Visualization */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-6 text-center">Integration Flow</h4>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${colorClasses?.bg} rounded-full flex items-center justify-center text-white font-semibold`}>
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Connect Account</div>
                      <div className="text-sm text-slate-600">Authenticate with {activeIntegrationData?.name}</div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-slate-400" />
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${colorClasses?.bg} rounded-full flex items-center justify-center text-white font-semibold`}>
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Import Data</div>
                      <div className="text-sm text-slate-600">Sync files and project information</div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-slate-400" />
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${colorClasses?.bg} rounded-full flex items-center justify-center text-white font-semibold`}>
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">AI Enhancement</div>
                      <div className="text-sm text-slate-600">Apply BCBP's AI analysis and improvements</div>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-slate-400" />
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <Icon name="Check" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">Sync Results</div>
                      <div className="text-sm text-slate-600">Export enhanced data back to your system</div>
                    </div>
                  </div>
                </div>

                {/* Connection Status */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Connection Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">Ready to Connect</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating connection indicators */}
              <div className={`absolute -top-4 -right-4 w-16 h-16 ${colorClasses?.bg} opacity-20 rounded-full blur-xl`}></div>
              <div className={`absolute -bottom-4 -left-4 w-20 h-20 ${colorClasses?.bg} opacity-10 rounded-full blur-xl`}></div>
            </div>
          </div>
        </div>

        {/* Integration Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={32} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Instant Setup</h3>
            <p className="text-slate-600">
              Connect your existing tools in minutes with our one-click integration setup and automated configuration.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure Sync</h3>
            <p className="text-slate-600">
              Enterprise-grade security ensures your data remains protected during transfer and storage across all integrations.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="RefreshCw" size={32} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-time Updates</h3>
            <p className="text-slate-600">
              Automatic synchronization keeps all your tools updated with the latest project data and measurements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationShowcase;