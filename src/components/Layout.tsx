import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList, CalendarDays, Dices, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: CalendarDays, label: '排期看板', emoji: '📅' },
  { to: '/signup', icon: ClipboardList, label: '报名', emoji: '✍️' },
  { to: '/admin', icon: Dices, label: '抽签管理', emoji: '🎲' },
  { to: '/members', icon: Users, label: '人员', emoji: '👥' },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - Right */}
      <aside className="fixed right-0 top-0 bottom-0 w-60 bg-[#fbfbfa] flex flex-col border-l border-[#e9e9e7]">
        {/* Logo */}
        <div className="h-14 flex items-center gap-2 px-4 hover:bg-[#efefef] cursor-pointer transition-colors">
          <span className="text-2xl">🤖</span>
          <span className="text-sm font-medium text-[#37352f]">AI 分享会</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-2 px-2">
          <div className="space-y-0.5">
            {navItems.map(({ to, label, emoji }) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {({ isActive }) => (
                  <div
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer',
                      isActive
                        ? 'bg-[#efefef] text-[#37352f]'
                        : 'text-[#787774] hover:bg-[#efefef]'
                    )}
                  >
                    <span className="text-lg">{emoji}</span>
                    <span>{label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 text-xs text-[#9b9a97]">
          每周五 10:15
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 mr-60">
        <main className="max-w-4xl mx-auto px-24 py-20">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
