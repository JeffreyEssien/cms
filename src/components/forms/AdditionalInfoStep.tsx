import React from 'react'
import { FormStepProps } from '../../types/project'
import AnimatedButton from '../ui/AnimatedButton'

export const AdditionalInfoStep: React.FC<FormStepProps> = ({
  formData,
  handleInputChange,
  onBack,
  onSubmit
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Additional Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Branding Assets
          </label>
          <textarea
            name="brandingAssets"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.brandingAssets}
            onChange={handleInputChange}
            placeholder="Describe any existing branding assets (logos, color schemes, etc.)..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Additional Requirements
          </label>
          <textarea
            name="additionalRequirements"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.additionalRequirements}
            onChange={handleInputChange}
            placeholder="Any other requirements or specifications..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            How did you hear about us? *
          </label>
          <select
            name="referralSource"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.referralSource}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="search">Search Engine</option>
            <option value="social">Social Media</option>
            <option value="referral">Referral</option>
            <option value="advertisement">Advertisement</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <AnimatedButton
          type="button"
          onClick={onBack}
          variant="secondary"
        >
          Back
        </AnimatedButton>
        <AnimatedButton
          type="submit"
          variant="primary"
        >
          Submit
        </AnimatedButton>
      </div>
    </form>
  )
} 