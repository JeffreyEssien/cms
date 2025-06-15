'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Initialize Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700')
      observerRef.current?.observe(section)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200 transition-all duration-300 hover:bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-300">DevCraft Pro</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#expertise" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Expertise</a>
              <a href="#process" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Process</a>
              <a href="#team" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Team</a>
              <Link href="/project-inquiry" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Start a Project</Link>
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-300">Client Portal</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fade-in-up">
              Enterprise-Grade Software
              <span className="text-indigo-600"> Delivered Fast</span>
            </h1>
            <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto font-medium animate-fade-in-up animation-delay-200">
              We deliver high-quality, industry-standard software solutions in record time. Our team of expert developers brings a minimum of 3 years of specialized experience to every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href="/project-inquiry" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Start Your Project
              </Link>
              <a href="#process" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Our Process
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Leading Expertise
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
              Our team specializes in delivering enterprise-grade solutions across multiple domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                color: "indigo",
                title: "Rapid Development",
                description: "Industry-standard projects delivered in record time without compromising quality."
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "green",
                title: "Expert Team",
                description: "Minimum 3 years of specialized experience in each development field."
              },
              {
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h4a2 2 0 012 2v2m0 0a2 2 0 012 2v2a2 2 0 01-2 2h-2m0 0h2a2 2 0 012 2v2a2 2 0 01-2 2h-4",
                color: "purple",
                title: "Quality First",
                description: "Enterprise-grade solutions built with best practices and industry standards."
              }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 hover:rotate-12`}>
                  <svg className={`w-8 h-8 text-${item.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
              A streamlined approach to delivering high-quality software efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: 1, title: "Discovery", description: "Deep dive into requirements and project scope" },
              { number: 2, title: "Planning", description: "Detailed architecture and sprint planning" },
              { number: 3, title: "Development", description: "Agile development with daily updates" },
              { number: 4, title: "Delivery", description: "Thorough testing and seamless deployment" }
            ].map((step, index) => (
              <div 
                key={step.number}
                className="text-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold transform transition-all duration-300 hover:rotate-12 hover:bg-indigo-700">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Development Team
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto font-medium">
              Our team brings a minimum of 3 years of specialized experience in each field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Experts",
                description: "Specialized in React, Vue, Angular, and modern JavaScript frameworks"
              },
              {
                title: "Backend Specialists",
                description: "Proficient in Node.js, Python, Java, and cloud architecture"
              },
              {
                title: "DevOps Engineers",
                description: "Experts in CI/CD, cloud platforms, and infrastructure automation"
              }
            ].map((team, index) => (
              <div 
                key={team.title}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{team.title}</h3>
                <p className="text-gray-700">{team.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto font-medium">
            Let's discuss how we can deliver your project with our industry-leading expertise and efficiency.
          </p>
          <Link 
            href="/project-inquiry" 
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DevCraft Pro</h3>
              <p className="text-gray-400">Delivering enterprise-grade software solutions with speed and precision.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Custom Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Enterprise Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Cloud Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Our Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DevCraft Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        section {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }

        section.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
} 