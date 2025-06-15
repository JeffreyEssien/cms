import React from 'react'
import { FormStepProps } from '../../types/project'
import { featureOptions, integrationOptions } from '../../constants/projectOptions'
import AnimatedButton from '../ui/AnimatedButton'

export const FeaturesAndScopeStep: React.FC<FormStepProps> = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Features & Project Scope</h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Required Features *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featureOptions.map(feature => (
              <label key={feature.value} className="flex items-center space-x-2 text-base text-gray-900">
                <input
                  type="checkbox"
                  value={feature.value}
                  checked={formData.features.includes(feature.value)}
                  onChange={(e) => handleCheckboxChange(e, 'features')}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-base text-gray-900">{feature.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Required Integrations
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {integrationOptions.map(integration => (
              <label key={integration.value} className="flex items-center space-x-2 text-base text-gray-900">
                <input
                  type="checkbox"
                  value={integration.value}
                  checked={formData.integrations.includes(integration.value)}
                  onChange={(e) => handleCheckboxChange(e, 'integrations')}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-base text-gray-900">{integration.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Content Management Preference *
          </label>
          <select
            name="contentManagement"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.contentManagement}
            onChange={handleInputChange}
          >
            <option value="">Select a preference</option>
            <option value="custom">Custom CMS</option>
            <option value="wordpress">WordPress</option>
            <option value="shopify">Shopify</option>
            <option value="wix">Wix</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Budget Range *
          </label>
          <select
            name="budgetRange"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.budgetRange}
            onChange={handleInputChange}
          >
            <option value="">Select a budget range</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-plus">$50,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Timeline *
          </label>
          <select
            name="timeline"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.timeline}
            onChange={handleInputChange}
          >
            <option value="">Select a timeline</option>
            <option value="asap">As Soon as Possible</option>
            <option value="1-3-months">1-3 Months</option>
            <option value="3-6-months">3-6 Months</option>
            <option value="6-plus-months">6+ Months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Target Audience *
          </label>
          <textarea
            name="targetAudience"
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.targetAudience}
            onChange={handleInputChange}
            placeholder="Describe your target audience..."
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <AnimatedButton
          onClick={onBack}
          variant="secondary"
        >
          Back
        </AnimatedButton>
        <AnimatedButton
          onClick={onNext}
          variant="primary"
        >
          Next
        </AnimatedButton>
      </div>
    </div>
  )
} 