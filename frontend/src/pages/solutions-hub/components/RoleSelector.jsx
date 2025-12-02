import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: 'quantity-surveyor',
      title: 'Quantity Surveyor',
      icon: 'Calculator',
      description: 'Accurate takeoffs and material quantification',
      painPoints: ['Manual measurement errors', 'Time-consuming calculations', 'Version control issues'],
      benefits: ['95% accuracy improvement', '70% time reduction', 'Real-time collaboration']
    },
    {
      id: 'cost-estimator',
      title: 'Cost Estimator',
      icon: 'DollarSign',
      description: 'Precise cost analysis and budget planning',
      painPoints: ['Pricing database management', 'Market rate fluctuations', 'Bid preparation time'],
      benefits: ['Automated pricing updates', 'Historical cost analysis', '60% faster estimates']
    },
    {
      id: 'contractor',
      title: 'General Contractor',
      icon: 'HardHat',
      description: 'Project coordination and workflow optimization',
      painPoints: ['Subcontractor coordination', 'Change order management', 'Progress tracking'],
      benefits: ['Unified project dashboard', 'Automated reporting', '40% efficiency gain']
    },
    {
      id: 'project-manager',
      title: 'Project Manager',
      icon: 'Users',
      description: 'Team collaboration and project oversight',
      painPoints: ['Communication gaps', 'Document version control', 'Progress visibility'],
      benefits: ['Real-time updates', 'Centralized communication', '50% faster decisions']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-professional p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-primary mb-3">
          Choose Your Role
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Discover how BCBP transforms your specific workflow with AI-powered solutions tailored to your construction role
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles?.map((role) => (
          <div
            key={role?.id}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-normal hover:shadow-lg ${
              selectedRole === role?.id
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-border hover:border-accent/50'
            }`}
            onClick={() => onRoleChange(role?.id)}
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                selectedRole === role?.id ? 'bg-accent text-white' : 'bg-muted text-brand-primary'
              }`}>
                <Icon name={role?.icon} size={28} />
              </div>
              <h3 className="font-semibold text-brand-primary mb-2">{role?.title}</h3>
              <p className="text-sm text-text-secondary">{role?.description}</p>
            </div>

            {selectedRole === role?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-brand-primary mb-2 uppercase tracking-wide">
                    Key Benefits
                  </h4>
                  <ul className="space-y-1">
                    {role?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-center text-xs text-text-secondary">
                        <Icon name="Check" size={12} className="text-success mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedRole === role?.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;