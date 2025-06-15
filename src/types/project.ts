export interface ProjectFormData {
  // Personal Information
  fullName: string
  email: string
  phone: string
  company: string
  
  // Project Details
  projectTitle: string
  description: string
  projectType: string
  platforms: string[]
  
  // Technical Requirements
  hasExistingDomain: string
  domainName: string
  hostingPreference: string
  designPreference: string
  
  // Features & Functionality
  features: string[]
  integrations: string[]
  contentManagement: string
  
  // Project Scope
  budgetRange: string
  timeline: string
  targetAudience: string
  
  // Additional Information
  brandingAssets: string
  additionalRequirements: string
  referralSource: string
}

export interface Option {
  value: string
  label: string
}

export interface FormStepProps {
  formData: ProjectFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof ProjectFormData) => void
  onNext?: () => void
  onBack?: () => void
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
} 