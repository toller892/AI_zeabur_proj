import { NavLink, Outlet } from 'react-router-dom'
import { CalendarDays, ClipboardList, Dices, Users, Sparkles, PanelLeftClose } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: '排期看板', icon: CalendarDays },
  { to: '/signup', label: '报名', icon: ClipboardList },
  { to: '/admin', label: '抽签管理', icon: Dices },
  { to: '/members', label: '人员', icon: Users },
]

export default function Layout() {
  return (
    <div className="grid min-h-screen grid-cols-[288px_minmax(0,1fr)] bg-[#f8fafc] text-slate-900">
      <aside className="sticky top-0 h-screen border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">AI 分享会</div>
            <div className="truncate text-xs text-slate-500">报名与排期管理</div>
          </div>
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        <div className="flex h-[calc(100vh-4rem)] flex-col justify-between px-4 py-5">
          <div>
            <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">导航</div>
            <nav className="space-y-1.5">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} end={to === '/'}>
                  {({ isActive }) => (
                    <div
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all',
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <Icon className={cn('h-4.5 w-4.5 shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700')} />
                      <span className="truncate">{label}</span>
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">会议时间</div>
            <div className="mt-2 text-sm font-medium text-slate-900">每周五 10:15</div>
            <p className="mt-1 text-xs leading-5 text-slate-500">建议周四前完成报名与排期，现场只做确认。</p>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-10">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900">分享会后台</div>
              <div className="text-xs text-slate-500">Tremor 风格静态样板</div>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
              当前节奏：每轮 4 人
            </div>
          </div>
        </header>

        <main className="min-w-0 px-10 py-10">
          <div className="mx-auto max-w-7xl min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
