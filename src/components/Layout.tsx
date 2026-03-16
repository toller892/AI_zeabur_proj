import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, CalendarDays, ClipboardList, Dices, LayoutGrid, PanelLeftClose, Search, Settings, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutGrid },
  { to: '/signup', label: 'Signups', icon: ClipboardList },
  { to: '/admin', label: 'Lottery', icon: Dices },
  { to: '/members', label: 'Members', icon: Users },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-r border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <BarChart3 className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-slate-900">AI Share Admin</div>
              <div className="truncate text-xs text-slate-500">Tremor-style dashboard</div>
            </div>
            <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          <div className="px-4 py-5">
            <div className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</div>
            <nav className="space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} end={to === '/'}>
                  {({ isActive }) => (
                    <div
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                        isActive
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <Icon className={cn('h-4 w-4', isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700')} />
                      <span>{label}</span>
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="px-4">
            <div className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Meta</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                每周五 10:15
              </div>
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100">
                <Settings className="h-4 w-4 text-slate-400" />
                Settings
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between gap-6 px-8">
              <div>
                <div className="text-sm font-semibold text-slate-900">Dashboard</div>
                <div className="text-xs text-slate-500">AI 分享会排期与运营总览</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
                  <Search className="h-4 w-4" />
                  Search
                </div>
                <div className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">4 speakers / round</div>
              </div>
            </div>
          </header>

          <main className="p-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
