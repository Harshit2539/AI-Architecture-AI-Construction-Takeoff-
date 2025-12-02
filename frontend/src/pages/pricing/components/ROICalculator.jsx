import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    projectsPerMonth: '',
    avgProjectValue: '',
    currentTakeoffTime: '',
    teamSize: '',
    hourlyRate: ''
  });
  
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const projectSizeOptions = [
    { value: '50000', label: 'Small ($50K - $200K)' },
    { value: '500000', label: 'Medium ($200K - $1M)' },
    { value: '2000000', label: 'Large ($1M - $5M)' },
    { value: '10000000', label: 'Enterprise ($5M+)' }
  ];

  const teamSizeOptions = [
    { value: '1', label: '1-2 people' },
    { value: '5', label: '3-10 people' },
    { value: '15', label: '11-25 people' },
    { value: '35', label: '25+ people' }
  ];

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateROI = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const projectsPerMonth = parseInt(inputs?.projectsPerMonth) || 0;
      const avgProjectValue = parseInt(inputs?.avgProjectValue) || 0;
      const currentTakeoffTime = parseInt(inputs?.currentTakeoffTime) || 0;
      const teamSize = parseInt(inputs?.teamSize) || 0;
      const hourlyRate = parseInt(inputs?.hourlyRate) || 0;

      // Calculate time savings (BCBP reduces takeoff time by 75%)
      const timeSavingsPerProject = currentTakeoffTime * 0.75;
      const monthlyTimeSavings = projectsPerMonth * timeSavingsPerProject;
      const annualTimeSavings = monthlyTimeSavings * 12;

      // Calculate cost savings
      const monthlyCostSavings = monthlyTimeSavings * hourlyRate;
      const annualCostSavings = monthlyCostSavings * 12;

      // Calculate accuracy improvements (5% bid accuracy improvement)
      const accuracyImprovement = avgProjectValue * 0.05;
      const monthlyAccuracyValue = projectsPerMonth * accuracyImprovement;
      const annualAccuracyValue = monthlyAccuracyValue * 12;

      // BCBP subscription cost (estimate based on team size)
      const monthlySubscriptionCost = teamSize * 99; // $99 per user per month
      const annualSubscriptionCost = monthlySubscriptionCost * 12;

      // Calculate ROI
      const totalAnnualBenefit = annualCostSavings + annualAccuracyValue;
      const netAnnualBenefit = totalAnnualBenefit - annualSubscriptionCost;
      const roiPercentage = ((netAnnualBenefit / annualSubscriptionCost) * 100)?.toFixed(0);

      setResults({
        monthlyTimeSavings: Math.round(monthlyTimeSavings),
        annualTimeSavings: Math.round(annualTimeSavings),
        monthlyCostSavings: Math.round(monthlyCostSavings),
        annualCostSavings: Math.round(annualCostSavings),
        annualAccuracyValue: Math.round(annualAccuracyValue),
        annualSubscriptionCost: Math.round(annualSubscriptionCost),
        netAnnualBenefit: Math.round(netAnnualBenefit),
        roiPercentage: roiPercentage,
        paybackMonths: Math.round(annualSubscriptionCost / (monthlyCostSavings + monthlyAccuracyValue))
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const resetCalculator = () => {
    setInputs({
      projectsPerMonth: '',
      avgProjectValue: '',
      currentTakeoffTime: '',
      teamSize: '',
      hourlyRate: ''
    });
    setResults(null);
  };

  const isFormValid = Object.values(inputs)?.every(value => value !== '');

  return (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="text-center mb-8">
        <Icon name="Calculator" size={48} className="text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-brand-primary mb-2">ROI Calculator</h3>
        <p className="text-text-secondary">
          Calculate your potential return on investment with BCBP's AI-powered takeoff solution
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-semibold text-brand-primary mb-4">Your Current Workflow</h4>
          
          <Input
            label="Projects per month"
            type="number"
            placeholder="e.g., 15"
            value={inputs?.projectsPerMonth}
            onChange={(e) => handleInputChange('projectsPerMonth', e?.target?.value)}
            description="Average number of projects you estimate monthly"
          />

          <Select
            label="Average project value"
            options={projectSizeOptions}
            value={inputs?.avgProjectValue}
            onChange={(value) => handleInputChange('avgProjectValue', value)}
            placeholder="Select project size range"
          />

          <Input
            label="Current takeoff time (hours)"
            type="number"
            placeholder="e.g., 8"
            value={inputs?.currentTakeoffTime}
            onChange={(e) => handleInputChange('currentTakeoffTime', e?.target?.value)}
            description="Hours spent on takeoff per project"
          />

          <Select
            label="Team size"
            options={teamSizeOptions}
            value={inputs?.teamSize}
            onChange={(value) => handleInputChange('teamSize', value)}
            placeholder="Select your team size"
          />

          <Input
            label="Average hourly rate ($)"
            type="number"
            placeholder="e.g., 75"
            value={inputs?.hourlyRate}
            onChange={(e) => handleInputChange('hourlyRate', e?.target?.value)}
            description="Blended hourly rate for takeoff work"
          />

          <div className="flex space-x-4">
            <Button
              variant="default"
              onClick={calculateROI}
              disabled={!isFormValid}
              loading={isCalculating}
              className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary"
              iconName="Calculator"
              iconPosition="left"
            >
              Calculate ROI
            </Button>
            
            {results && (
              <Button
                variant="outline"
                onClick={resetCalculator}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {results ? (
            <div className="bg-muted rounded-lg p-6">
              <h4 className="font-semibold text-brand-primary mb-6">Your ROI Results</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                  <div>
                    <div className="text-sm text-text-secondary">Annual Time Savings</div>
                    <div className="text-2xl font-bold text-success">{results?.annualTimeSavings} hours</div>
                  </div>
                  <Icon name="Clock" size={32} className="text-success" />
                </div>

                <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                  <div>
                    <div className="text-sm text-text-secondary">Annual Cost Savings</div>
                    <div className="text-2xl font-bold text-success">${results?.annualCostSavings?.toLocaleString()}</div>
                  </div>
                  <Icon name="DollarSign" size={32} className="text-success" />
                </div>

                <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                  <div>
                    <div className="text-sm text-text-secondary">Accuracy Value</div>
                    <div className="text-2xl font-bold text-success">${results?.annualAccuracyValue?.toLocaleString()}</div>
                  </div>
                  <Icon name="Target" size={32} className="text-success" />
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg">
                    <div>
                      <div className="text-sm text-text-secondary">Total ROI</div>
                      <div className="text-3xl font-bold text-accent">{results?.roiPercentage}%</div>
                    </div>
                    <Icon name="TrendingUp" size={32} className="text-accent" />
                  </div>
                </div>

                <div className="text-center pt-4">
                  <div className="text-sm text-text-secondary mb-2">Payback Period</div>
                  <div className="text-xl font-bold text-brand-primary">{results?.paybackMonths} months</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-muted rounded-lg p-6 flex flex-col items-center justify-center h-full min-h-[400px]">
              <Icon name="BarChart3" size={64} className="text-text-secondary mb-4" />
              <h4 className="font-semibold text-brand-primary mb-2">Ready to Calculate?</h4>
              <p className="text-text-secondary text-center">
                Fill in your current workflow details to see your potential ROI with BCBP's AI-powered takeoff solution.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;