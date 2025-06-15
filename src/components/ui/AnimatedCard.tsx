import { motion } from 'framer-motion'
import { transitions } from '@/utils/animations'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverEffect?: boolean
}

export default function AnimatedCard({
  children,
  className = '',
  onClick,
  hoverEffect = true
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}
      whileHover={hoverEffect ? { 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      transition={transitions.spring}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  )
} 