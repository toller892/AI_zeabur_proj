import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  onClick?: () => void
  hoverable?: boolean
  glowColor?: string
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  onClick,
  hoverable = true,
  glowColor,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hoverable ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 backdrop-blur-sm',
        'transition-all duration-300',
        hoverable && 'hover:border-zinc-700/80 hover:bg-zinc-800/50 cursor-pointer',
        glowColor && `hover:shadow-lg hover:shadow-${glowColor}/10`,
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedList({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="popLayout">
      {children}
    </AnimatePresence>
  )
}

interface AnimatedListItemProps {
  children: React.ReactNode
  id: string
  index?: number
}

export function AnimatedListItem({ children, id, index = 0 }: AnimatedListItemProps) {
  return (
    <motion.div
      key={id}
      layout
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        delay: index * 0.05,
      }}
    >
      {children}
    </motion.div>
  )
}
