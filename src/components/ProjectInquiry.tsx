'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'
import AnimatedCard from './ui/AnimatedCard'
import AnimatedModal from './ui/AnimatedModal'
import { transitions } from '@/utils/animations'
import { ProjectFormData } from '../types/project'
import { ProgressBar } from './ui/ProgressBar'
import { PersonalInfoStep } from './forms/PersonalInfoStep'
import { ProjectDetailsStep } from './forms/ProjectDetailsStep'
import { TechnicalRequirementsStep } from './forms/TechnicalRequirementsStep'
import { FeaturesAndScopeStep } from './forms/FeaturesAndScopeStep'
import { AdditionalInfoStep } from './forms/AdditionalInfoStep'

export default function ProjectInquiry() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    description: '',
    projectType: '',
    platforms: [],
    hasExistingDomain: '',
    domainName: '',
    hostingPreference: '',
    designPreference: '',
    features: [],
    integrations: [],
    contentManagement: '',
    budgetRange: '',
    timeline: '',
    targetAudience: '',
    brandingAssets: '',
    additionalRequirements: '',
    referralSource: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ProjectFormData) => {
    const { value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || 'Failed to submit inquiry')
        return
      }

      setMessage('Your inquiry has been submitted successfully!')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectTitle: '',
        description: '',
        projectType: '',
        platforms: [],
        hasExistingDomain: '',
        domainName: '',
        hostingPreference: '',
        designPreference: '',
        features: [],
        integrations: [],
        contentManagement: '',
        budgetRange: '',
        timeline: '',
        targetAudience: '',
        brandingAssets: '',
        additionalRequirements: '',
        referralSource: ''
      })
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch {
      setError('An error occurred while submitting your inquiry')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.spring}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Inquiry</h1>
          <p className="text-gray-600">Tell us about your project and we&apos;ll get back to you shortly.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <AnimatedCard className="mb-8">
          <ProgressBar currentStep={currentStep} totalSteps={5} />
        </AnimatedCard>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={transitions.spring}
          >
            <AnimatedCard>
              {currentStep === 1 && (
                <PersonalInfoStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                  onNext={() => setCurrentStep(2)}
                />
              )}
              {currentStep === 2 && (
                <ProjectDetailsStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                  onBack={() => setCurrentStep(1)}
                  onNext={() => setCurrentStep(3)}
                />
              )}
              {currentStep === 3 && (
                <TechnicalRequirementsStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                  onBack={() => setCurrentStep(2)}
                  onNext={() => setCurrentStep(4)}
                />
              )}
              {currentStep === 4 && (
                <FeaturesAndScopeStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                  onBack={() => setCurrentStep(3)}
                  onNext={() => setCurrentStep(5)}
                />
              )}
              {currentStep === 5 && (
                <AdditionalInfoStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                  onBack={() => setCurrentStep(4)}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatedCard>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thank You!"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={transitions.spring}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Submission Successful</h3>
          <p className="text-gray-600 mb-4">
            {message || 'We&apos;ve received your project inquiry and will get back to you within 24 hours.'}
          </p>
          <AnimatedButton
            onClick={() => setIsModalOpen(false)}
            variant="primary"
          >
            Close
          </AnimatedButton>
        </div>
      </AnimatedModal>
    </div>
  )
} 