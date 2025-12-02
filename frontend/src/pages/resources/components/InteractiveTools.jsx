import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const InteractiveTools = () => {
  const [activeCalculator, setActiveCalculator] = useState('roi');
  const [roiInputs, setRoiInputs] = useState({
    projectValue: '',
    currentTime: '',
    targetTime: '',
    hourlyRate: ''
  });
  const [roiResult, setRoiResult] = useState(null);

  const tools = [
    {
      id: 'roi',
      name: 'ROI Calculator',
      description: 'Calculate potential return on investment for AI-powered takeoff tools',
      icon: 'Calculator',
      color: 'bg-blue-500'
    },
    {
      id: 'complexity',
      name: 'Project Complexity Assessment',
      description: 'Evaluate your project complexity and recommended technology stack',
      icon: 'BarChart3',
      color: 'bg-green-500'
    },
    {
      id: 'efficiency',
      name: 'Efficiency Benchmark',
      description: 'Compare your current workflows against industry standards',
      icon: 'TrendingUp',
      color: 'bg-purple-500'
    },
    {
      id: 'savings',
      name: 'Time Savings Estimator',
      description: 'Estimate time savings from automated takeoff processes',
      icon: 'Clock',
      color: 'bg-orange-500'
    }
  ];

  const projectTypes = [
    { value: 'residential', label: 'Residential Construction' },
    { value: 'commercial', label: 'Commercial Construction' },
    { value: 'infrastructure', label: 'Infrastructure Projects' },
    { value: 'industrial', label: 'Industrial Construction' }
  ];

  const calculateROI = () => {
    const projectValue = parseFloat(roiInputs?.projectValue) || 0;
    const currentTime = parseFloat(roiInputs?.currentTime) || 0;
    const targetTime = parseFloat(roiInputs?.targetTime) || 0;
    const hourlyRate = parseFloat(roiInputs?.hourlyRate) || 0;

    const timeSaved = currentTime - targetTime;
    const costSavings = timeSaved * hourlyRate;
    const annualSavings = costSavings * 12; // Assuming monthly projects
    const BCBP = 2400; // Example annual cost
    const netSavings = annualSavings - BCBP;
    const roiPercentage = ((netSavings / BCBP) * 100)?.toFixed(1);

    setRoiResult({
      timeSaved,
      costSavings,
      annualSavings,
      netSavings,
      roiPercentage
    });
  };

  const handleInputChange = (field, value) => {
    setRoiInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2">Interactive Tools</h2>
          <p className="text-text-secondary">Powerful calculators and assessments to guide your technology decisions</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {tools?.map((tool) => (
          <button
            key={tool?.id}
            onClick={() => setActiveCalculator(tool?.id)}
            className={`p-6 rounded-lg border-2 transition-all duration-normal text-left ${
              activeCalculator === tool?.id
                ? 'border-accent bg-accent/5' :'border-border bg-white hover:border-accent/50 hover:bg-accent/5'
            }`}
          >
            <div className={`w-12 h-12 ${tool?.color} rounded-lg flex items-center justify-center mb-4`}>
              <Icon name={tool?.icon} size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-brand-primary mb-2">{tool?.name}</h3>
            <p className="text-sm text-text-secondary">{tool?.description}</p>
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-professional p-8">
        {activeCalculator === 'roi' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <Icon name="Calculator" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">ROI Calculator</h3>
                <p className="text-text-secondary">Calculate your potential return on investment with BCBP</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Input
                  label="Average Project Value ($)"
                  type="number"
                  placeholder="500000"
                  value={roiInputs?.projectValue}
                  onChange={(e) => handleInputChange('projectValue', e?.target?.value)}
                  description="Typical value of your construction projects"
                />

                <Input
                  label="Current Takeoff Time (hours)"
                  type="number"
                  placeholder="40"
                  value={roiInputs?.currentTime}
                  onChange={(e) => handleInputChange('currentTime', e?.target?.value)}
                  description="Time currently spent on takeoffs per project"
                />

                <Input
                  label="Target Time with BCBP (hours)"
                  type="number"
                  placeholder="10"
                  value={roiInputs?.targetTime}
                  onChange={(e) => handleInputChange('targetTime', e?.target?.value)}
                  description="Expected time with AI-powered takeoffs"
                />

                <Input
                  label="Hourly Rate ($)"
                  type="number"
                  placeholder="75"
                  value={roiInputs?.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e?.target?.value)}
                  description="Your team's average hourly rate"
                />

                <Button
                  variant="default"
                  onClick={calculateROI}
                  iconName="Calculator"
                  iconPosition="left"
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Calculate ROI
                </Button>
              </div>

              <div className="bg-muted rounded-lg p-6">
                <h4 className="font-semibold text-brand-primary mb-4">ROI Results</h4>
                
                {roiResult ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Time Saved per Project:</span>
                      <span className="font-semibold text-brand-primary">{roiResult?.timeSaved} hours</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Cost Savings per Project:</span>
                      <span className="font-semibold text-green-600">${roiResult?.costSavings?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">Annual Savings (12 projects):</span>
                      <span className="font-semibold text-green-600">${roiResult?.annualSavings?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary">BCBP Annual Cost:</span>
                      <span className="font-semibold text-red-600">$2,400</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-accent/10 px-4 rounded-lg">
                      <span className="font-semibold text-brand-primary">ROI:</span>
                      <span className="text-xl font-bold text-accent">{roiResult?.roiPercentage}%</span>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-start">
                        <Icon name="TrendingUp" size={20} className="text-green-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">Excellent ROI Potential!</p>
                          <p className="text-xs text-green-600 mt-1">
                            You could save ${roiResult?.netSavings?.toLocaleString()} annually with BCBP's AI-powered takeoff tools.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      fullWidth
                      asChild
                      className="mt-4 bg-conversion hover:bg-conversion/90 text-conversion-foreground"
                    >
                      <Link to="/free-trial">Start Your Free Trial</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Calculator" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-text-secondary">Enter your project details to calculate potential ROI</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeCalculator === 'complexity' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <Icon name="BarChart3" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">Project Complexity Assessment</h3>
                <p className="text-text-secondary">Evaluate your project complexity and get personalized recommendations</p>
              </div>
            </div>

            <div className="text-center py-12">
              <Icon name="Construction" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-brand-primary mb-2">Coming Soon</h4>
              <p className="text-text-secondary mb-6">
                Our project complexity assessment tool is currently in development. 
                It will help you evaluate project requirements and recommend the optimal technology stack.
              </p>
              <Button variant="outline" asChild>
                <Link to="/product-demo">View Product Demo Instead</Link>
              </Button>
            </div>
          </div>
        )}

        {activeCalculator === 'efficiency' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <Icon name="TrendingUp" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">Efficiency Benchmark</h3>
                <p className="text-text-secondary">Compare your workflows against industry standards</p>
              </div>
            </div>

            <div className="text-center py-12">
              <Icon name="BarChart" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-brand-primary mb-2">Coming Soon</h4>
              <p className="text-text-secondary mb-6">
                Our efficiency benchmarking tool will help you compare your current workflows 
                against industry standards and identify optimization opportunities.
              </p>
              <Button variant="outline" asChild>
                <Link to="/solutions-hub">Explore Solutions</Link>
              </Button>
            </div>
          </div>
        )}

        {activeCalculator === 'savings' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <Icon name="Clock" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">Time Savings Estimator</h3>
                <p className="text-text-secondary">Estimate time savings from automated takeoff processes</p>
              </div>
            </div>

            <div className="text-center py-12">
              <Icon name="Timer" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-brand-primary mb-2">Coming Soon</h4>
              <p className="text-text-secondary mb-6">
                Our time savings estimator will help you calculate potential time reductions 
                from implementing automated takeoff and estimation processes.
              </p>
              <Button variant="outline" asChild>
                <Link to="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveTools;