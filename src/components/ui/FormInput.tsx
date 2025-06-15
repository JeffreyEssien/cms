import React from 'react'

interface FormInputProps {
  label: React.ReactNode
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder?: string
  className?: string
  onFocus?: () => void
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  className = '',
  onFocus
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white text-gray-900 placeholder-gray-500 ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
      />
    </div>
  )
} 