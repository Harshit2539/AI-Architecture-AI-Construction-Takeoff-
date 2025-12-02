import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const TrialForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    companySize: '',
    projectType: '',
    agreeToTerms: false,
    subscribeToUpdates: true
  });

  const [errors, setErrors] = useState({});

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const projectTypeOptions = [
    { value: 'residential', label: 'Residential Construction' },
    { value: 'commercial', label: 'Commercial Construction' },
    { value: 'industrial', label: 'Industrial Construction' },
    { value: 'infrastructure', label: 'Infrastructure Projects' },
    { value: 'renovation', label: 'Renovation & Remodeling' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.company?.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData?.jobTitle?.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData?.companySize) {
      newErrors.companySize = 'Please select company size';
    }

    if (!formData?.projectType) {
      newErrors.projectType = 'Please select primary project type';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-professional-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-primary mb-2">
          Create Your Account
        </h2>
        <p className="text-text-secondary">
          Get started with your 14-day free trial in less than 2 minutes
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Work Email"
          type="email"
          placeholder="Enter your work email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll send your trial access details to this email"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            type="text"
            placeholder="Enter your company name"
            value={formData?.company}
            onChange={(e) => handleInputChange('company', e?.target?.value)}
            error={errors?.company}
            required
          />

          <Input
            label="Job Title"
            type="text"
            placeholder="e.g. Quantity Surveyor"
            value={formData?.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
            error={errors?.jobTitle}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Company Size"
            placeholder="Select company size"
            options={companySizeOptions}
            value={formData?.companySize}
            onChange={(value) => handleInputChange('companySize', value)}
            error={errors?.companySize}
            required
          />

          <Select
            label="Primary Project Type"
            placeholder="Select project type"
            options={projectTypeOptions}
            value={formData?.projectType}
            onChange={(value) => handleInputChange('projectType', value)}
            error={errors?.projectType}
            required
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label="Send me product updates and construction industry insights"
            description="You can unsubscribe at any time"
            checked={formData?.subscribeToUpdates}
            onChange={(e) => handleInputChange('subscribeToUpdates', e?.target?.checked)}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          className="bg-conversion hover:bg-conversion/90 text-conversion-foreground cta-primary mt-8"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Start My Free Trial
        </Button>

        <p className="text-sm text-text-secondary text-center">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default TrialForm;