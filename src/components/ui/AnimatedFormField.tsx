import { motion } from 'framer-motion'
import { formFieldAnimation, errorAnimation, transitions } from '@/utils/animations'

interface AnimatedFormFieldProps {
  label: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  placeholder?: string
}

export default function AnimatedFormField({
  label,
  type,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder
}: AnimatedFormFieldProps) {
  return (
    <motion.div
      variants={formFieldAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transitions.quick}
      className="mb-6"
    >
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <motion.input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
        whileFocus={{ scale: 1.01 }}
        transition={transitions.quick}
      />
      {error && (
        <motion.p
          variants={errorAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitions.spring}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
} 