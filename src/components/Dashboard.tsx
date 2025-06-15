'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  _id: string
  fullName: string
  email: string
  referralCode: string
  createdAt: string
  socialHandle?: string
  selectedSocial?: string
  whatsappNumber?: string
}

interface Inquiry {
  _id: string
  fullName: string
  email: string
  phone: string
  company: string
  projectTitle: string
  description: string
  projectType: string
  platforms: string[]
  hasExistingDomain: string
  domainName: string
  hostingPreference: string
  designPreference: string
  features: string[]
  integrations: string[]
  contentManagement: string
  budgetRange: string
  timeline: string
  targetAudience: string
  brandingAssets: string
  additionalRequirements: string
  referralSource: string
  createdAt: string
}

interface DashboardData {
  stats: Array<{
    name: string
    value: string
    change: string
  }>
  recentActivity: Array<{
    action: string
    page: string
    time: string
  }>
  users: {
    total: number
    recent: User[]
  }
  inquiries: {
    total: number
    recent: Inquiry[]
  }
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard')
      if (!res.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      const data = await res.json()
      if (data.success) {
        setDashboardData(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch dashboard data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (inquiry: Inquiry, idx: number) => {
    const text = `Project Title: ${inquiry.projectTitle}\nFull Name: ${inquiry.fullName}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nCompany: ${inquiry.company}\nProject Type: ${inquiry.projectType}\nPlatforms: ${inquiry.platforms.join(', ')}\nBudget Range: ${inquiry.budgetRange}\nTimeline: ${inquiry.timeline}\nDescription: ${inquiry.description}\nFeatures: ${inquiry.features.join(', ')}\nIntegrations: ${inquiry.integrations.join(', ')}\nContent Management: ${inquiry.contentManagement}\nReferral Source: ${inquiry.referralSource}\nHas Existing Domain: ${inquiry.hasExistingDomain}\nDomain Name: ${inquiry.domainName}\nHosting Preference: ${inquiry.hostingPreference}\nDesign Preference: ${inquiry.designPreference}\nTarget Audience: ${inquiry.targetAudience}\nBranding Assets: ${inquiry.brandingAssets}\nAdditional Requirements: ${inquiry.additionalRequirements}`
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return (
          <svg className="h-5 w-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        )
      case 'facebook':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      case 'twitter':
        return (
          <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        )
      case 'linkedin':
        return (
          <svg className="h-5 w-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      default:
        return null
    }
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'addUser':
        router.push('/signup')
        break
      case 'addInquiry':
        router.push('/inquiry')
        break
      case 'viewUsers':
        router.push('/users')
        break
      case 'viewInquiries':
        router.push('/inquiries')
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
          <h1 className="text-xl font-bold text-white">CMS Pro</h1>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            <a href="#" className="bg-indigo-100 text-indigo-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <svg className="text-indigo-500 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v6h8V1" />
              </svg>
              Dashboard
            </a>
            <Link href="/project-inquiry" className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <svg className="text-gray-400 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Project Inquiry
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1"></div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className="relative">
                  <button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 lg:p-2 lg:hover:bg-gray-50">
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">Admin</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center">Loading dashboard data...</div>
            ) : error ? (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error loading dashboard data
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : dashboardData ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                  <p className="mt-1 text-sm text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your CMS.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  {dashboardData.stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg p-5">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                        <div className="mt-1 text-sm text-gray-500">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Project Inquiries Summary */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-indigo-700 mb-4">Project Inquiries</h2>
                  {dashboardData.inquiries.recent.length === 0 ? (
                    <p className="text-gray-500">No project inquiries yet.</p>
                  ) : (
                    <div className="space-y-8">
                      {dashboardData.inquiries.recent.map((inquiry, idx) => (
                        <div key={inquiry._id} className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6 relative border border-gray-200">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                            <div className="text-2xl font-bold text-indigo-800">{inquiry.projectTitle}</div>
                            <div className="text-sm text-gray-600">Submitted by: <span className="font-semibold text-indigo-700">{inquiry.fullName}</span> ({inquiry.email})</div>
                            <button
                              className={`ml-0 md:ml-4 px-4 py-2 rounded-md text-sm font-medium border border-indigo-600 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition ${copiedIdx === idx ? 'bg-green-100 border-green-600 text-green-700' : ''}`}
                              onClick={() => handleCopy(inquiry, idx)}
                            >
                              {copiedIdx === idx ? 'Copied!' : 'Copy All'}
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="mb-4">
                                <div className="font-semibold text-gray-900 mb-1">Contact & Company</div>
                                <div className="text-gray-700"><span className="font-medium">Name:</span> {inquiry.fullName}</div>
                                <div className="text-gray-700"><span className="font-medium">Email:</span> {inquiry.email}</div>
                                <div className="text-gray-700"><span className="font-medium">Phone:</span> {inquiry.phone}</div>
                                <div className="text-gray-700"><span className="font-medium">Company:</span> {inquiry.company || 'N/A'}</div>
                              </div>
                              <div className="mb-4">
                                <div className="font-semibold text-gray-900 mb-1">Project Overview</div>
                                <div className="text-gray-700"><span className="font-medium">Type:</span> {inquiry.projectType}</div>
                                <div className="text-gray-700"><span className="font-medium">Platforms:</span> {inquiry.platforms.join(', ')}</div>
                                <div className="text-gray-700"><span className="font-medium">Budget:</span> {inquiry.budgetRange}</div>
                                <div className="text-gray-700"><span className="font-medium">Timeline:</span> {inquiry.timeline}</div>
                              </div>
                              <div className="mb-4">
                                <div className="font-semibold text-gray-900 mb-1">Technical</div>
                                <div className="text-gray-700"><span className="font-medium">Domain:</span> {inquiry.hasExistingDomain} {inquiry.hasExistingDomain === 'yes' && (<span>({inquiry.domainName})</span>)}</div>
                                <div className="text-gray-700"><span className="font-medium">Hosting:</span> {inquiry.hostingPreference}</div>
                                <div className="text-gray-700"><span className="font-medium">Design:</span> {inquiry.designPreference}</div>
                              </div>
                            </div>
                            <div>
                              <div className="mb-4">
                                <div className="font-semibold text-gray-900 mb-1">Description</div>
                                <div className="text-gray-700 whitespace-pre-line">{inquiry.description}</div>
                              </div>
                              <div className="mb-4">
                                <div className="font-semibold text-gray-900 mb-1">Features & Integrations</div>
                                <div className="text-gray-700"><span className="font-medium">Features:</span> {inquiry.features.join(', ')}</div>
                                <div className="text-gray-700"><span className="font-medium">Integrations:</span> {inquiry.integrations.join(', ')}</div>
                                <div className="text-gray-700"><span className="font-medium">Content Management:</span> {inquiry.contentManagement}</div>
                              </div>
                              <div className="mb-4">
                                <div className="font-semibold text-gray-900 mb-1">Other</div>
                                <div className="text-gray-700"><span className="font-medium">Referral Source:</span> {inquiry.referralSource}</div>
                                <div className="text-gray-700"><span className="font-medium">Target Audience:</span> {inquiry.targetAudience}</div>
                                <div className="text-gray-700"><span className="font-medium">Branding Assets:</span> {inquiry.brandingAssets || 'N/A'}</div>
                                <div className="text-gray-700"><span className="font-medium">Additional Requirements:</span> {inquiry.additionalRequirements || 'N/A'}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                  <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <button
                      onClick={() => handleQuickAction('addUser')}
                      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      <span className="mt-2 block text-sm font-medium text-gray-900">Add New User</span>
                    </button>

                    <button
                      onClick={() => handleQuickAction('addInquiry')}
                      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="mt-2 block text-sm font-medium text-gray-900">Add New Inquiry</span>
                    </button>

                    <button
                      onClick={() => handleQuickAction('viewUsers')}
                      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span className="mt-2 block text-sm font-medium text-gray-900">View All Users</span>
                    </button>

                    <button
                      onClick={() => handleQuickAction('viewInquiries')}
                      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <span className="mt-2 block text-sm font-medium text-gray-900">View All Inquiries</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
                      <div className="flow-root">
                        <ul className="-mb-8">
                          {dashboardData.recentActivity.map((item, index) => (
                            <li key={index}>
                              <div className="relative pb-8">
                                {index !== dashboardData.recentActivity.length - 1 && (
                                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                                )}
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        {item.action} <span className="font-medium text-gray-900">{item.page}</span>
                                      </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                      {item.time}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Users */}
                <div className="mt-8">
                  <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
                  <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {dashboardData.users.recent.map((user) => (
                        <li key={user._id}>
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                  {user.whatsappNumber && (
                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                      <svg className="h-4 w-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                      </svg>
                                      {user.whatsappNumber}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {user.selectedSocial && user.socialHandle && (
                                  <a
                                    href={`https://${user.selectedSocial.toLowerCase()}.com/${user.socialHandle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-500"
                                  >
                                    {getSocialIcon(user.selectedSocial)}
                                  </a>
                                )}
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {user.referralCode}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  Joined {formatDate(user.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
} 