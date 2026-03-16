import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface NumberTickerProps {
  value: number
  direction?: 'up' | 'down'
  className?: string
}

export function NumberTicker({ value, direction = 'up', className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useSpring(direction === 'down' ? value : 0, {
    stiffness: 100,
    damping: 20,
  })

  useEffect(() => {
    motionValue.set(direction === 'down' ? 0 : value)
  }, [motionValue, value, direction])

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('zh-CN').format(Math.round(latest))
      }
    })
    return unsubscribe
  }, [motionValue])

  return <span ref={ref} className={className} />
}

interface ConfettiPieceProps {
  delay: number
  color: string
}

function ConfettiPiece({ delay, color }: ConfettiPieceProps) {
  const x = Math.random() * 400 - 200
  const rotation = Math.random() * 720 - 360

  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
      animate={{
        y: [0, -150, 300],
        x: [0, x / 2, x],
        opacity: [1, 1, 0],
        rotate: [0, rotation / 2, rotation],
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute w-3 h-3 rounded-sm"
      style={{ backgroundColor: color }}
    />
  )
}

const CONFETTI_COLORS = ['#6366f1', '#a855f7', '#ec4899', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4']

export function Confetti({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 40 }).map((_, i) => (
        <ConfettiPiece
          key={i}
          delay={i * 0.03}
          color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
        />
      ))}
    </div>
  )
}

export function PulsingDot({ color = 'bg-emerald-500' }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
  )
}

export function SlotMachine({ names, isSpinning, result }: {
  names: string[]
  isSpinning: boolean
  result: string | null
}) {
  const [displayName, setDisplayName] = useState(names[0] || '')

  useEffect(() => {
    if (!isSpinning) {
      if (result) setDisplayName(result)
      return
    }

    let i = 0
    const interval = setInterval(() => {
      setDisplayName(names[i % names.length])
      i++
    }, 60)

    return () => clearInterval(interval)
  }, [isSpinning, names, result])

  return (
    <div className="relative overflow-hidden h-12 flex items-center justify-center">
      <motion.div
        key={displayName}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.08 }}
        className="text-2xl font-bold text-white"
      >
        {displayName}
      </motion.div>
    </div>
  )
}
