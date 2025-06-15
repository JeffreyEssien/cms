import { Option } from '../types/project'

export const projectTypes: Option[] = [
  { value: 'website', label: 'Business Website' },
  { value: 'ecommerce', label: 'E-commerce Store' },
  { value: 'webapp', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'desktop', label: 'Desktop Application' },
  { value: 'api', label: 'API Development' },
  { value: 'other', label: 'Other' }
]

export const platformOptions: Option[] = [
  { value: 'web', label: 'Web (Browser)' },
  { value: 'ios', label: 'iOS (iPhone/iPad)' },
  { value: 'android', label: 'Android' },
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'macOS' },
  { value: 'linux', label: 'Linux' }
]

export const featureOptions: Option[] = [
  { value: 'user-auth', label: 'User Authentication' },
  { value: 'payment', label: 'Payment Processing' },
  { value: 'chat', label: 'Live Chat/Messaging' },
  { value: 'notifications', label: 'Push Notifications' },
  { value: 'analytics', label: 'Analytics & Reporting' },
  { value: 'social-login', label: 'Social Media Login' },
  { value: 'file-upload', label: 'File Upload/Storage' },
  { value: 'booking', label: 'Booking/Scheduling' },
  { value: 'inventory', label: 'Inventory Management' },
  { value: 'multi-language', label: 'Multi-language Support' },
  { value: 'api-integration', label: 'Third-party Integrations' },
  { value: 'admin-panel', label: 'Admin Dashboard' }
]

export const integrationOptions: Option[] = [
  { value: 'google-analytics', label: 'Google Analytics' },
  { value: 'mailchimp', label: 'Mailchimp' },
  { value: 'stripe', label: 'Stripe Payments' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'social-media', label: 'Social Media APIs' },
  { value: 'crm', label: 'CRM Systems' },
  { value: 'inventory', label: 'Inventory Systems' },
  { value: 'shipping', label: 'Shipping Services' },
  { value: 'calendar', label: 'Calendar Systems' },
  { value: 'email', label: 'Email Services' }
] 