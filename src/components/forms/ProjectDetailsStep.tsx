import React from 'react'
import { FormStepProps } from '../../types/project'
import { FormInput } from '../ui/FormInput'
import { projectTypes, platformOptions } from '../../constants/projectOptions'
import AnimatedButton from '../ui/AnimatedButton'

export const ProjectDetailsStep: React.FC<FormStepProps> = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Project Details</h2>
      
      <div className="space-y-6">
        <FormInput
          label={<span className="text-gray-900 font-semibold">Project Title</span>}
          name="projectTitle"
          required
          value={formData.projectTitle}
          onChange={handleInputChange}
          placeholder="My Awesome Project"
          className="text-base text-gray-900"
        />

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Project Description *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your project in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Project Type *
          </label>
          <select
            name="projectType"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900"
            value={formData.projectType}
            onChange={handleInputChange}
          >
            <option value="">Select a project type</option>
            {projectTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Target Platforms *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {platformOptions.map(platform => (
              <label key={platform.value} className="flex items-center space-x-2 text-base text-gray-900">
                <input
                  type="checkbox"
                  value={platform.value}
                  checked={formData.platforms.includes(platform.value)}
                  onChange={(e) => handleCheckboxChange(e, 'platforms')}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-base text-gray-900">{platform.label}</span>
              </label>
            ))}
          </div>
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