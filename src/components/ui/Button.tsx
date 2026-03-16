import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
}

export function Button({
  children,
  onClick,
  className,
  disabled,
  variant = 'primary',
  size = 'md',
  type = 'button',
}: ButtonProps) {
  const variants = {
    primary: 'bg-[#2eaadc] hover:bg-[#0b8ec0] text-white',
    secondary: 'bg-[#f7f6f3] hover:bg-[#e9e9e7] text-[#37352f]',
    ghost: 'hover:bg-[#f7f6f3] text-[#787774]',
  }
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-[#2eaadc]/30',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  )
}

// Notion-style tag/badge
export function Tag({
  children,
  color = 'default',
}: {
  children: React.ReactNode
  color?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
}) {
  const colors = {
    default: 'bg-[#e9e9e7] text-[#37352f]',
    blue: 'bg-[#d3e5ef] text-[#183347]',
    green: 'bg-[#dbeddb] text-[#1c3829]',
    red: 'bg-[#ffe2dd] text-[#5d1715]',
    yellow: 'bg-[#fdecc8] text-[#402c1b]',
    purple: 'bg-[#e8deee] text-[#412754]',
    gray: 'bg-[#e3e2e0] text-[#5a5a5a]',
  }

  return (
    <span className={cn('px-1.5 py-0.5 rounded text-xs font-medium', colors[color])}>
      {children}
    </span>
  )
}
