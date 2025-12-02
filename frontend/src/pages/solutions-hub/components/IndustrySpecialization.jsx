import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IndustrySpecialization = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('electrical');

  const industries = [
    {
      id: 'electrical',
      name: 'Electrical',
      icon: 'Zap',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Specialized tools for electrical contractors and estimators',
      features: [
        'Automated conduit and cable calculations',
        'Electrical symbol recognition',
        'Panel schedule integration',
        'Code compliance checking'
      ],
      caseStudy: {
        company: 'PowerTech Solutions',
        result: '85% reduction in takeoff time',
        project: 'Commercial office complex'
      },
      metrics: {
        timeReduction: '85%',
        accuracyImprovement: '92%',
        costSavings: '$45K'
      }
    },
    {
      id: 'concrete',
      name: 'Concrete',
      icon: 'Building',
      image: 'https://images.pixabay.com/photos/2016/11/29/12/30/concrete-1869623_1280.jpg?auto=compress&cs=tinysrgb&w=800',
      description: 'Advanced concrete quantity and reinforcement calculations',
      features: [
        'Rebar detailing and scheduling',
        'Concrete volume calculations',
        'Formwork area estimation',
        'Mix design optimization'
      ],
      caseStudy: {
        company: 'Concrete Masters Inc',
        result: '78% faster estimates',
        project: 'High-rise residential tower'
      },
      metrics: {
        timeReduction: '78%',
        accuracyImprovement: '89%',
        costSavings: '$62K'
      }
    },
    {
      id: 'framing',
      name: 'Framing',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=compress&cs=tinysrgb&w=800',
      description: 'Comprehensive framing and structural solutions',
      features: [
        'Lumber takeoff automation',
        'Structural member sizing',
        'Connection detail recognition',
        'Material optimization'
      ],
      caseStudy: {
        company: 'Framework Builders',
        result: '90% accuracy improvement',
        project: 'Multi-family housing development'
      },
      metrics: {
        timeReduction: '72%',
        accuracyImprovement: '90%',
        costSavings: '$38K'
      }
    },
    {
      id: 'hvac',
      name: 'HVAC',
      icon: 'Wind',
      image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Mechanical systems and ductwork estimation',
      features: [
        'Ductwork measurement and sizing',
        'Equipment scheduling',
        'Load calculation integration',
        'Energy efficiency analysis'
      ],
      caseStudy: {
        company: 'Climate Control Pro',
        result: '80% time savings',
        project: 'Healthcare facility renovation'
      },
      metrics: {
        timeReduction: '80%',
        accuracyImprovement: '87%',
        costSavings: '$52K'
      }
    },
    {
      id: 'plumbing',
      name: 'Plumbing',
      icon: 'Droplets',
      image: 'https://images.pixabay.com/photos/2017/09/12/13/21/plumber-2742618_1280.jpg?auto=compress&cs=tinysrgb&w=800',
      description: 'Plumbing systems and fixture calculations',
      features: [
        'Pipe sizing and routing',
        'Fixture count automation',
        'Water pressure calculations',
        'Code compliance verification'
      ],
      caseStudy: {
        company: 'AquaFlow Systems',
        result: '75% estimate accuracy',
        project: 'Mixed-use development'
      },
      metrics: {
        timeReduction: '75%',
        accuracyImprovement: '88%',
        costSavings: '$41K'
      }
    },
    {
      id: 'roofing',
      name: 'Roofing',
      icon: 'Triangle',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=compress&cs=tinysrgb&w=800',
      description: 'Roofing materials and installation planning',
      features: [
        'Roof area calculations',
        'Material waste optimization',
        'Slope and pitch analysis',
        'Weather barrier planning'
      ],
      caseStudy: {
        company: 'Summit Roofing',
        result: '82% material accuracy',
        project: 'Industrial warehouse complex'
      },
      metrics: {
        timeReduction: '77%',
        accuracyImprovement: '82%',
        costSavings: '$35K'
      }
    }
  ];

  const currentIndustry = industries?.find(ind => ind?.id === selectedIndustry);

  return (
    <div className="bg-muted py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary mb-4">
            Industry Specializations
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            BCBP's AI adapts to your specific trade with specialized tools, workflows, and industry knowledge built for construction professionals
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries?.map((industry) => (
            <button
              key={industry?.id}
              onClick={() => setSelectedIndustry(industry?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-normal ${
                selectedIndustry === industry?.id
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-brand-primary hover:bg-accent/10 hover:text-accent'
              }`}
            >
              <Icon name={industry?.icon} size={20} />
              <span>{industry?.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Industry Content */}
        {currentIndustry && (
          <div className="bg-white rounded-xl shadow-professional overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <Image
                  src={currentIndustry?.image}
                  alt={`${currentIndustry?.name} construction work`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={currentIndustry?.icon} size={32} />
                    <h3 className="text-2xl font-bold">{currentIndustry?.name}</h3>
                  </div>
                  <p className="text-white/90">{currentIndustry?.description}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-brand-primary mb-4">
                    Specialized Features
                  </h4>
                  <ul className="space-y-3">
                    {currentIndustry?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Icon name="CheckCircle" size={20} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">
                      {currentIndustry?.metrics?.timeReduction}
                    </div>
                    <div className="text-xs text-text-secondary">Time Reduction</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">
                      {currentIndustry?.metrics?.accuracyImprovement}
                    </div>
                    <div className="text-xs text-text-secondary">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-conversion mb-1">
                      {currentIndustry?.metrics?.costSavings}
                    </div>
                    <div className="text-xs text-text-secondary">Cost Savings</div>
                  </div>
                </div>

                {/* Case Study */}
                <div className="bg-accent/5 rounded-lg p-6 mb-6">
                  <h5 className="font-semibold text-brand-primary mb-2">Success Story</h5>
                  <p className="text-text-secondary mb-2">
                    <strong>{currentIndustry?.caseStudy?.company}</strong> achieved{' '}
                    <strong className="text-accent">{currentIndustry?.caseStudy?.result}</strong>{' '}
                    on their {currentIndustry?.caseStudy?.project} project using BCBP's {currentIndustry?.name?.toLowerCase()} solutions.
                  </p>
                </div>

                <Button
                  variant="default"
                  className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary w-full"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Get {currentIndustry?.name} Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustrySpecialization;