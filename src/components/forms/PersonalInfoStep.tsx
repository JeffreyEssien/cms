import React, { useState } from 'react'
import { FormStepProps } from '../../types/project'
import { FormInput } from '../ui/FormInput'
import AnimatedButton from '../ui/AnimatedButton'
import AnimatedModal from '../ui/AnimatedModal'

const socialPlatforms = [
  'Instagram',
  'Twitter',
  'LinkedIn',
  'Facebook',
  'WhatsApp',
  'Other',
]

export const PersonalInfoStep: React.FC<FormStepProps> = ({
  formData,
  handleInputChange,
  onNext
}) => {
  const [isWhatsapp, setIsWhatsapp] = useState<'yes' | 'no' | null>(null)
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [showWhatsappPrompt, setShowWhatsappPrompt] = useState(false)
  const [selectedSocial, setSelectedSocial] = useState('')
  const [socialHandle, setSocialHandle] = useState('')
  const [showSocialModal, setShowSocialModal] = useState(false)

  // Show prompt when user types in phone field
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleInputChange(e)
    if (!showWhatsappPrompt && e.target.value.length > 0) {
      setShowWhatsappPrompt(true)
    }
  }

  // Handle WhatsApp prompt answer
  const handleWhatsappAnswer = (answer: 'yes' | 'no') => {
    setIsWhatsapp(answer)
    setShowWhatsappPrompt(false)
  }

  // Handle social platform selection
  const handleSocialSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSocial(e.target.value)
    setSocialHandle('')
  }

  // Handle social handle input
  const handleSocialHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSocialHandle(e.target.value)
    if (e.target.value.length > 0) {
      setShowSocialModal(true)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label={<span className="text-gray-900 font-semibold">Full Name</span>}
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
          className="text-base text-gray-900"
        />

        <FormInput
          label={<span className="text-gray-900 font-semibold">Company (Optional)</span>}
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Your Company"
          className="text-base text-gray-900"
        />

        <FormInput
          label={<span className="text-gray-900 font-semibold">Email Address</span>}
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          className="text-base text-gray-900"
        />

        <div className="relative">
          <FormInput
            label={<span className="text-gray-900 font-semibold">Phone Number</span>}
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+1 (555) 000-0000"
            className="text-base text-gray-900"
          />
          {showWhatsappPrompt && isWhatsapp === null && (
            <div className="absolute left-0 mt-2 w-full bg-indigo-50 border border-indigo-200 rounded-lg p-3 shadow transition-opacity duration-300 animate-fade-in text-sm text-gray-800 z-10">
              <span>Is this number on WhatsApp?</span>
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  className="px-4 py-1 rounded bg-green-600 text-white font-medium hover:bg-green-700 text-xs"
                  onClick={() => handleWhatsappAnswer('yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="px-4 py-1 rounded bg-gray-300 text-gray-900 font-medium hover:bg-gray-400 text-xs"
                  onClick={() => handleWhatsappAnswer('no')}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>

        {isWhatsapp === 'no' && (
          <FormInput
            label={<span className="text-gray-900 font-semibold">WhatsApp Number</span>}
            name="whatsappNumber"
            type="tel"
            value={whatsappNumber}
            onChange={e => setWhatsappNumber(e.target.value)}
            placeholder="Enter WhatsApp number"
            className="text-base text-gray-900"
          />
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Social Media</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-base text-gray-900 bg-white"
            value={selectedSocial}
            onChange={handleSocialSelect}
          >
            <option value="">Select a platform</option>
            {socialPlatforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
          {selectedSocial && (
            <FormInput
              label={<span className="text-gray-900 font-semibold">Your {selectedSocial} Handle</span>}
              name="socialHandle"
              value={socialHandle}
              onChange={handleSocialHandle}
              placeholder={`Enter your ${selectedSocial} handle`}
              className="text-base text-gray-900 mt-3"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <AnimatedButton
          onClick={onNext}
          variant="primary"
        >
          Next
        </AnimatedButton>
      </div>
      <AnimatedModal
        isOpen={showSocialModal}
        onClose={() => setShowSocialModal(false)}
        title="Social Media Contact"
      >
        <div className="text-center">
          <p className="mb-4 text-gray-800 text-lg">
            You will be contacted by the admin's social handle on <span className="font-semibold text-indigo-700">{selectedSocial}</span>.
          </p>
          <p className="text-sm text-gray-500">
            We&apos;ll use this information to contact you about your project.
          </p>
          <AnimatedButton
            onClick={() => setShowSocialModal(false)}
            variant="primary"
          >
            OK
          </AnimatedButton>
        </div>
      </AnimatedModal>
    </div>
  )
} 