'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { transitions } from '@/utils/animations'

interface AnimatedTooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function AnimatedTooltip({
  content,
  children,
  position = 'top'
}: AnimatedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-gray-900',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-gray-900',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-gray-900',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-gray-900'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={transitions.quick}
            className={`absolute ${positionClasses[position]} z-50`}
          >
            <div className="relative">
              <div className="bg-gray-900 text-white text-sm py-1 px-2 rounded">
                {content}
              </div>
              <div
                className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 