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
    <div className="min-h-screen bg-[#09090b] flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-[#0c0c0f] border-r border-zinc-800/50 flex flex-col z-50"
      >
        {/* Logo */}
        <div className="h-20 flex items-center gap-4 px-8 border-b border-zinc-800/50">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI 分享会
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-8 px-4">
          <div className="space-y-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'relative flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all',
                      isActive
                        ? 'text-white bg-indigo-600/10 border border-indigo-500/20'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                    )}
                  >
                    <Icon className={cn('w-6 h-6', isActive ? 'text-indigo-400' : '')} />
                    <span>{label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-indigo-500 rounded-r-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800/50">
          <div className="text-sm text-zinc-500 text-center">
            每周五 10:15 · 技术分享
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Top gradient glow */}
        <div className="fixed top-0 left-72 right-0 h-[250px] bg-gradient-to-b from-indigo-950/30 via-purple-950/10 to-transparent pointer-events-none z-0" />

        <main className="relative z-10 p-10 min-h-screen">
          <div className="max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
