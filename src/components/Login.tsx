'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedFormField from './ui/AnimatedFormField'
import AnimatedButton from './ui/AnimatedButton'
import AnimatedCard from './ui/AnimatedCard'
import { transitions } from '@/utils/animations'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)
    setLoading(true)
    try {
      const response = await fetch(`/api/users?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Login failed')
        return
      }

      const data = await response.json()
      if (data.success) {
        setMessage(`Welcome, ${data.user.fullName}!`)
        setFormData({ email: '', password: '' })
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.spring}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitions.spring, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <AnimatedCard>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatedFormField
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <AnimatedFormField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <div className="text-red-600 text-sm font-medium text-center">{error}</div>}
            {message && <div className="text-green-600 text-sm font-medium text-center">{message}</div>}

            <div>
              <AnimatedButton
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </AnimatedButton>
            </div>
          </form>
        </AnimatedCard>
      </motion.div>
    </div>
  )
} 