import React from 'react'
import { FormStepProps } from '../../types/project'
import { FormInput } from '../ui/FormInput'
import AnimatedButton from '../ui/AnimatedButton'

export const TechnicalRequirementsStep: React.FC<FormStepProps> = ({
  formData,
  handleInputChange,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Technical Requirements</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Do you have an existing domain? *
          </label>
          <select
            name="hasExistingDomain"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.hasExistingDomain}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {formData.hasExistingDomain === 'yes' && (
          <FormInput
            label={<span className="text-gray-900 font-semibold">Domain Name</span>}
            name="domainName"
            required
            value={formData.domainName}
            onChange={handleInputChange}
            placeholder="example.com"
            className="text-base text-gray-900"
          />
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Hosting Preference *
          </label>
          <select
            name="hostingPreference"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.hostingPreference}
            onChange={handleInputChange}
          >
            <option value="">Select a hosting preference</option>
            <option value="shared">Shared Hosting</option>
            <option value="vps">VPS Hosting</option>
            <option value="dedicated">Dedicated Server</option>
            <option value="cloud">Cloud Hosting</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Design Preference *
          </label>
          <select
            name="designPreference"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.designPreference}
            onChange={handleInputChange}
          >
            <option value="">Select a design preference</option>
            <option value="modern">Modern & Minimal</option>
            <option value="traditional">Traditional</option>
            <option value="creative">Creative & Bold</option>
            <option value="corporate">Corporate & Professional</option>
            <option value="not-sure">Not Sure</option>
          </select>
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