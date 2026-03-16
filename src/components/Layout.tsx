import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList, CalendarDays, Dices, Users, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: CalendarDays, label: '排期看板' },
  { to: '/signup', icon: ClipboardList, label: '报名' },
  { to: '/admin', icon: Dices, label: '抽签管理' },
  { to: '/members', icon: Users, label: '人员' },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top gradient glow */}
      <div className="fixed top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-transparent pointer-events-none z-0" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl"
      >
        <div className="w-full flex items-center justify-between px-8 h-16">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </motion.div>
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              AI 分享会
            </span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-zinc-800/80 rounded-lg border border-zinc-700/50"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10 hidden sm:inline">{label}</span>
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 w-full px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
