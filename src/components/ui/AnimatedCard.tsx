import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export function Card({ children, className, onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-md transition-colors',
        hoverable && 'hover:bg-[#f7f6f3] cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  onClick,
  hoverable = false,
}: CardProps & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay }}
      onClick={onClick}
      className={cn(
        'rounded-md transition-colors',
        hoverable && 'hover:bg-[#f7f6f3] cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedList({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="popLayout">{children}</AnimatePresence>
}

export function AnimatedListItem({
  children,
  id,
  index = 0,
}: {
  children: React.ReactNode
  id: string
  index?: number
}) {
  return (
    <motion.div
      key={id}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      {children}
    </motion.div>
  )
}
